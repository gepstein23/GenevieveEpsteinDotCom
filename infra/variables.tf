variable "aws_region" {
  description = "AWS region to deploy into"
  type        = string
  default     = "us-east-1"
}

variable "allowed_origin" {
  description = "Origin allowed to call the API (CORS + Lambda check)"
  type        = string
  default     = "https://genevieveepstein.com"
}
