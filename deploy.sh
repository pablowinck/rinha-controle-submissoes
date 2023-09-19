#!/bin/bash

IAM_USER_KEY="/home/pablo/Documents/rinhabackend-ec2-keypair.pem"
SERVER="ubuntu@ec2-54-89-252-232.compute-1.amazonaws.com"

mvn clean package -Dmaven.test.skip=true

echo "Deleting jar & logs from server"
ssh -i $IAM_USER_KEY $SERVER "rm -rf app.jar && rm -rf logs.txt" || echo "failed to delete jar & logs"

echo "Copying jar to server"
scp -i $IAM_USER_KEY target/app.jar $SERVER:/home/ubuntu || echo "failed to copy jar"

echo "Stopping running app"
ssh -i $IAM_USER_KEY $SERVER "fuser -k 8080/tcp" || echo "failed to stop running app"

echo "Starting app"
ssh -i $IAM_USER_KEY $SERVER "java -jar app.jar > logs.txt 2>&1 &" || echo "failed to start app"
echo "Done"
