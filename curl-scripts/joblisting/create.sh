#!/bin/bash

API="http://localhost:4741"
URL_PATH="/joblisting"

curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${TOKEN}" \
  --data '{
  "joblisting": {
    "companyName": "'"${COMPANYNAME}"'",
    "companyPosition": "'"${COMPANYPOSITION}"'",
    "companyPerson": "'"${COMPANYPERSON}"'",
    "companyInfo": "'"${COMPANYINFO}"'",
    "companyDate": "'"${COMPANYDATE}"'",
    "companyReplied": "'"${COMPANYREPLIED}"'"
    }
  }'

echo