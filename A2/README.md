# Task A2: Introduction to Kubernetes

This task is completed with a local Kubernetes cluster running on Docker Desktop for Mac. A custom nginx image is built, deployed and accessed though a service.

## Instructions for setup:
1. Ensure Docker Desktop is installed in your workstation, with Kubernetes enabled in Settings
2. Clone this repository
  
        git clone https://github.com/jerrenss/CS3219-OTOT-Assignment.git

3. Navigate to the folder containing the custom image

        cd A2/nginx

4. Build the image

        docker build -t a2-custom-nginx .

5. Administer the deployment and service with kubectl CLI

        kubectl apply -f configuration.yml

6. Access the web application via http://localhost:31000
6. Once development work is complete, tear down configuration with kubectl

        kubectl delete -f configuration.yml
