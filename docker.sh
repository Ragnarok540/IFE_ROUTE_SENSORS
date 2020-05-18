# !/bin/bash

# exec docker for the frontend tests

docker build -t edgar/testang .

docker run -u $(id -u) --rm -v "$PWD":/app -p 9876:9876 edgar/testang:latest
