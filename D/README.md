# Task D: Pub-Sub Messaging

This task is completed with a 3-node Apache Kafka cluster using Docker, together with a Zookeeper ensemble used to manage the cluster.

## Instructions for setup:
1. Ensure Docker and Docker Compose is installed in your workstation
2. Clone this repository
  
        git clone https://github.com/jerrenss/CS3219-OTOT-Assignment.git

3. Navigate to the root folder of Task D

        cd D
    
4. Launch the containers with Docker Compose

        docker-compose up

5. Once development work is complete, tear down containers with Docker Compose

        docker-compose down -v