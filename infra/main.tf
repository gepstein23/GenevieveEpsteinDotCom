provider "aws" {
  region = var.aws_region
}

# ── DynamoDB: cookie counter with leaderboard ──

resource "aws_dynamodb_table" "cookies" {
  name         = "cookie-counter"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "id"

  attribute {
    name = "id"
    type = "S"
  }

  attribute {
    name = "type"
    type = "S"
  }

  attribute {
    name = "count"
    type = "N"
  }

  global_secondary_index {
    name            = "LeaderboardIndex"
    hash_key        = "type"
    range_key       = "count"
    projection_type = "ALL"
  }
}

# ── Lambda IAM ──

resource "aws_iam_role" "lambda" {
  name = "cookie-counter-lambda"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect    = "Allow"
      Action    = "sts:AssumeRole"
      Principal = { Service = "lambda.amazonaws.com" }
    }]
  })
}

resource "aws_iam_role_policy" "lambda_dynamo" {
  name = "cookie-counter-dynamo"
  role = aws_iam_role.lambda.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect   = "Allow"
      Action   = ["dynamodb:GetItem", "dynamodb:UpdateItem", "dynamodb:DeleteItem", "dynamodb:Query"]
      Resource = [
        aws_dynamodb_table.cookies.arn,
        "${aws_dynamodb_table.cookies.arn}/index/LeaderboardIndex"
      ]
    }]
  })
}

resource "aws_iam_role_policy_attachment" "lambda_logs" {
  role       = aws_iam_role.lambda.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

# ── Lambda function ──

data "archive_file" "lambda" {
  type        = "zip"
  source_file = "${path.module}/lambda/index.mjs"
  output_path = "${path.module}/lambda/function.zip"
}

resource "aws_lambda_function" "cookie" {
  function_name    = "cookie-counter"
  role             = aws_iam_role.lambda.arn
  handler          = "index.handler"
  runtime          = "nodejs20.x"
  filename         = data.archive_file.lambda.output_path
  source_code_hash = data.archive_file.lambda.output_base64sha256
  timeout          = 10

  environment {
    variables = {
      TABLE_NAME          = aws_dynamodb_table.cookies.name
      VISITORS_TABLE_NAME = aws_dynamodb_table.visitors_v2.name
      ALLOWED_ORIGIN      = var.allowed_origin
      VISITOR_SNS_TOPIC   = aws_sns_topic.visitor_alerts.arn
    }
  }
}

# ── API Gateway HTTP API ──

resource "aws_apigatewayv2_api" "cookie" {
  name          = "cookie-counter"
  protocol_type = "HTTP"

  cors_configuration {
    allow_origins = [var.allowed_origin]
    allow_methods = ["GET", "POST", "OPTIONS"]
    allow_headers = ["Content-Type"]
    max_age       = 86400
  }
}

resource "aws_apigatewayv2_stage" "default" {
  api_id      = aws_apigatewayv2_api.cookie.id
  name        = "$default"
  auto_deploy = true

  default_route_settings {
    throttling_burst_limit = 10
    throttling_rate_limit  = 5
  }
}

resource "aws_apigatewayv2_integration" "lambda" {
  api_id                 = aws_apigatewayv2_api.cookie.id
  integration_type       = "AWS_PROXY"
  integration_uri        = aws_lambda_function.cookie.invoke_arn
  payload_format_version = "2.0"
}

resource "aws_apigatewayv2_route" "get_count" {
  api_id    = aws_apigatewayv2_api.cookie.id
  route_key = "GET /cookie/count"
  target    = "integrations/${aws_apigatewayv2_integration.lambda.id}"
}

resource "aws_apigatewayv2_route" "post_cookie" {
  api_id    = aws_apigatewayv2_api.cookie.id
  route_key = "POST /cookie"
  target    = "integrations/${aws_apigatewayv2_integration.lambda.id}"
}

resource "aws_apigatewayv2_route" "get_leaderboard" {
  api_id    = aws_apigatewayv2_api.cookie.id
  route_key = "GET /cookie/leaderboard"
  target    = "integrations/${aws_apigatewayv2_integration.lambda.id}"
}

resource "aws_lambda_permission" "apigw" {
  statement_id  = "AllowAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.cookie.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.cookie.execution_arn}/*/*"
}

# ── DynamoDB: visitor tracking ──

resource "aws_dynamodb_table" "visitors" {
  name         = "site-visitors"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "id"

  attribute {
    name = "id"
    type = "S"
  }

  attribute {
    name = "pk"
    type = "S"
  }

  attribute {
    name = "timestamp"
    type = "S"
  }

  attribute {
    name = "ip"
    type = "S"
  }

  global_secondary_index {
    name            = "ByTimestamp"
    hash_key        = "pk"
    range_key       = "timestamp"
    projection_type = "ALL"
  }

  global_secondary_index {
    name            = "ByIp"
    hash_key        = "ip"
    range_key       = "timestamp"
    projection_type = "KEYS_ONLY"
  }
}

# ── DynamoDB: visitor tracking v2 (consolidated columns) ──

resource "aws_dynamodb_table" "visitors_v2" {
  name         = "site-visitors-v2"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "id"

  attribute {
    name = "id"
    type = "S"
  }

  attribute {
    name = "pk"
    type = "S"
  }

  attribute {
    name = "timestamp"
    type = "S"
  }

  attribute {
    name = "ip"
    type = "S"
  }

  global_secondary_index {
    name            = "ByTimestamp"
    hash_key        = "pk"
    range_key       = "timestamp"
    projection_type = "ALL"
  }

  global_secondary_index {
    name            = "ByIp"
    hash_key        = "ip"
    range_key       = "timestamp"
    projection_type = "KEYS_ONLY"
  }
}

# ── Visitor tracking: Lambda permissions + routes ──

resource "aws_iam_role_policy" "lambda_visitors_dynamo" {
  name = "visitor-tracker-dynamo"
  role = aws_iam_role.lambda.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect   = "Allow"
      Action   = ["dynamodb:PutItem", "dynamodb:Query"]
      Resource = [
        aws_dynamodb_table.visitors_v2.arn,
        "${aws_dynamodb_table.visitors_v2.arn}/index/ByTimestamp",
        "${aws_dynamodb_table.visitors_v2.arn}/index/ByIp"
      ]
    }]
  })
}

resource "aws_apigatewayv2_route" "post_visit" {
  api_id    = aws_apigatewayv2_api.cookie.id
  route_key = "POST /visit"
  target    = "integrations/${aws_apigatewayv2_integration.lambda.id}"
}

resource "aws_apigatewayv2_route" "post_click" {
  api_id    = aws_apigatewayv2_api.cookie.id
  route_key = "POST /click"
  target    = "integrations/${aws_apigatewayv2_integration.lambda.id}"
}

# ── SNS: visitor notifications ──

resource "aws_sns_topic" "visitor_alerts" {
  name = "site-visitor-alerts"
}

resource "aws_sns_topic_subscription" "visitor_email" {
  topic_arn = aws_sns_topic.visitor_alerts.arn
  protocol  = "email"
  endpoint  = var.visitor_alert_email
}

resource "aws_iam_role_policy" "lambda_sns" {
  name = "visitor-tracker-sns"
  role = aws_iam_role.lambda.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect   = "Allow"
      Action   = "sns:Publish"
      Resource = aws_sns_topic.visitor_alerts.arn
    }]
  })
}

