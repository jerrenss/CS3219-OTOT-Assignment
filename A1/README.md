# Task A1: Introduction to Docker

Student: Seow Wei Xiang Gerren

Matriculation Number: A0189437M

GitHub Repository: [https://github.com/jerrenss/CS3219-OTOT-Assignment/](https://github.com/jerrenss/CS3219-OTOT-Assignment/)

Description: This task is completed with Nginx serving as the reverse proxy for a Go application. Dockerfiles are written for both Nginx and Go application, and the containers are orchestrated by Docker Compose.

## Instructions for setup:
1. Ensure Docker and Docker Compose is installed in your workstation
2. Clone this repository
  
        git clone https://github.com/jerrenss/CS3219-OTOT-Assignment.git

3. Navigate to the root folder of Task A1

        cd A1
    
4. Launch the containers with Docker Compose

        docker-compose up

5. Access the web application via http://localhost and http://localhost/api 
6. Once development work is complete, tear down containers with Docker Compose

        docker-compose down

