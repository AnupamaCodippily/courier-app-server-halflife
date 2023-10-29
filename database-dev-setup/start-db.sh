#!/bin/bash

# Build the Docker image
docker build -t courierdb .

# Run the Docker container
docker run -d --name courierdb-container -p 5432:5432 courierdb
