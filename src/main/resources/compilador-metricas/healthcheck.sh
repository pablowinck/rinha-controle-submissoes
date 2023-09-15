#!/bin/bash

# Initialize a variable to store the HTTP status code
http_status=""

# Initialize a variable to store the number of attempts
attempt=1

echo "Starting to check the HTTP status of 'http://localhost:9999/contagem-pessoas'"
echo "Applying initial delay (60 seconds)"
sleep 60
# Loop until the HTTP status code is 200
while [ "$http_status" != "200" ]; do
  # Make a curl request and store only the HTTP status code
  http_status=$(curl -o /dev/null -s -w "%{http_code}\n" --location 'http://localhost:9999/contagem-pessoas')

  if [ "$attempt" -gt 60 ]; then
    # Log failure and exit the script with a status of 1
    echo "Did not receive HTTP 200 status code after 60 attempts. Exiting."
    exit 1
  fi
  # Log the HTTP status code received
  echo "Attempt #$attempt: Received HTTP status code $http_status"

  # Check the HTTP status code
  if [ "$http_status" = "200" ]; then
    # Log success and exit the script with a status of 0
    echo "Received HTTP 200 status code. Exiting."
    exit 0
  else
    # Log failure and sleep for 1 second before retrying
    echo "Did not receive HTTP 200 status code. Retrying in 1 second."
    sleep 1
  fi

  # Increment the attempt counter
  ((attempt++))
done
