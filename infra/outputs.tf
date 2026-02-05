output "api_url" {
  description = "Base URL of the cookie counter API"
  value       = aws_apigatewayv2_stage.default.invoke_url
}
