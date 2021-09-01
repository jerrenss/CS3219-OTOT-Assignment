# Task C: Authentication and Authorisation Task

This task is completed with a local Go and PostgreSQL server. Production use cases of Authentication and Authorisation are demonstrated through APIs.

## Instructions for setup:
1. Ensure Docker and Docker Compose is installed in your workstation
2. Clone this repository
  
        git clone https://github.com/jerrenss/CS3219-OTOT-Assignment.git

3. Navigate to the root folder of Task C

        cd C
    
4. Launch the containers with Docker Compose

        docker-compose up

5. Access the API endpoints documented in main.go
6. Once development work is complete, tear down containers with Docker Compose

        docker-compose down -v