#!/usr/bin/env bash
#
# Delete a leaderboard entry from the cookie-counter DynamoDB table.
#
# Prerequisites:
#   - AWS CLI v2 installed  (https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html)
#   - Credentials configured (aws configure, or SSO, or env vars)
#   - Your IAM user/role needs dynamodb:DeleteItem on the cookie-counter table
#
# Usage:
#   ./admin-delete.sh <username>        Delete a single user entry
#   ./admin-delete.sh --list            List all user entries (top 25)
#   ./admin-delete.sh --reset-global    Reset the global counter to 0
#
# Examples:
#   ./admin-delete.sh baduser           Deletes USER#baduser
#   ./admin-delete.sh --list            Shows who is in the table
#
# You can also do all of this from the AWS Console:
#   1. Go to https://console.aws.amazon.com/dynamodbv2
#   2. Click "Tables" -> "cookie-counter" -> "Explore table items"
#   3. User entries have id = "USER#<username>", global counter has id = "GLOBAL"
#   4. Select the row(s) and click "Delete items"

set -euo pipefail

TABLE="cookie-counter"
REGION="${AWS_DEFAULT_REGION:-us-east-1}"

if [ $# -lt 1 ]; then
  echo "Usage: $0 <username | --list | --reset-global>"
  exit 1
fi

case "$1" in
  --list)
    echo "Scanning user entries in $TABLE..."
    aws dynamodb scan \
      --table-name "$TABLE" \
      --region "$REGION" \
      --filter-expression "#t = :userType" \
      --expression-attribute-names '{"#t": "type"}' \
      --expression-attribute-values '{":userType": {"S": "USER"}}' \
      --projection-expression "id, displayName, #c" \
      --expression-attribute-names '{"#t": "type", "#c": "count"}' \
      --query "Items[*].{id: id.S, displayName: displayName.S, count: count.N}" \
      --output table
    ;;

  --reset-global)
    echo "Resetting global counter to 0..."
    aws dynamodb update-item \
      --table-name "$TABLE" \
      --region "$REGION" \
      --key '{"id": {"S": "GLOBAL"}}' \
      --update-expression "SET #c = :zero" \
      --expression-attribute-names '{"#c": "count"}' \
      --expression-attribute-values '{":zero": {"N": "0"}}'
    echo "Done. Global counter is now 0."
    ;;

  *)
    USERNAME=$(echo "$1" | tr '[:upper:]' '[:lower:]')
    echo "Deleting USER#$USERNAME from $TABLE..."
    aws dynamodb delete-item \
      --table-name "$TABLE" \
      --region "$REGION" \
      --key "{\"id\": {\"S\": \"USER#$USERNAME\"}}"
    echo "Done. USER#$USERNAME deleted."
    ;;
esac
