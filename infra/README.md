# Cookie Counter Infrastructure

Deploys a serverless cookie counter on AWS:

- **DynamoDB** table with an atomic counter (pay-per-request, practically free)
- **Lambda** function (Node.js 20.x) handling GET and POST
- **API Gateway HTTP API** with CORS locked to `genevieveepstein.com`

## Prerequisites

- [Terraform >= 1.5](https://developer.hashicorp.com/terraform/install)
- AWS CLI configured (`aws configure`) with an IAM user/role that can create DynamoDB, Lambda, API Gateway, and IAM resources

## Deploy

```bash
cd infra
terraform init
terraform plan      # review what will be created
terraform apply     # type "yes" to confirm
```

After apply, Terraform prints the API URL:

```
api_url = "https://xxxxxxxx.execute-api.us-east-1.amazonaws.com"
```

## Wire to the front end

Create a `.env` file in the project root (or set the var in your hosting platform):

```
VITE_COOKIE_API_URL=https://xxxxxxxx.execute-api.us-east-1.amazonaws.com
```

Then rebuild the site (`npm run build`). The cookie clicker will call:

- `GET  {VITE_COOKIE_API_URL}/cookie/count` — fetch current count
- `POST {VITE_COOKIE_API_URL}/cookie` — increment counter

## Tear down

```bash
cd infra
terraform destroy   # type "yes" to confirm
```

## Notes

- CORS restricts browser-based requests to the allowed origin only. Direct curl/API calls bypass CORS (this is normal — the Lambda also checks the `Origin` header as a second layer).
- To allow `www.genevieveepstein.com` as well, change `allowed_origin` or pass both via the variable.
- DynamoDB PAY_PER_REQUEST has no minimum cost — you only pay for actual reads/writes.
- API Gateway throttling is set to 5 req/s sustained, burst to 10. Adjust in `main.tf` under `default_route_settings` if needed.
