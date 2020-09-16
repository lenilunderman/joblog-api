#!/bin/bash

API="http://localhost:4741"
URL_PATH="/joblisting"

curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request PATCH \
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