# Task F: Caching Task

This task is completed with a local Go and Redis server. A GET request is sent to JSONPlaceholder for mock data, and cached for significantly faster queries.

## Instructions for setup:
1. Ensure Docker and Docker Compose is installed in your workstation
2. Clone this repository
  
        git clone https://github.com/jerrenss/CS3219-OTOT-Assignment.git

3. Navigate to the root folder of Task F

        cd F
    
4. Launch the containers with Docker Compose

        docker-compose up

5. Access the APIs via http://localhost:4000/api/posts and http://localhost/api/posts-reset 
6. Once development work is complete, tear down containers with Docker Compose

        docker-compose down -v