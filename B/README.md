# Task B: CRUD Application Task

Student: Seow Wei Xiang Gerren

Matriculation Number: A0189437M

GitHub Repository: https://github.com/jerrenss/CS3219-OTOT-Assignment/

Description: A full-stack application developed with ReactJS, NodeJS and PostgreSQL. Orchestration is done with Docker-Compose. Google App Engine is the platform used for backend deployment.

## Instructions for setup:
1. Ensure Docker, Docker Compose, Yarn and PSQL are installed in your workstation
2. Clone this repository
  
        git clone https://github.com/jerrenss/CS3219-OTOT-Assignment.git

3. Navigate to the root folder of Task B

        cd B
    
4. Launch all containers with Docker Compose

        docker-compose up

5. Access the backend server at http://localhost:4000, and frontend client at http://localhost:3000
6. Once development work is complete, tear down containers with Docker Compose

        docker-compose down -v


## Local API Usage:
The following 4 API routes are supported:
  - GET /api/movies
  - POST /api/movie
  - PUT /api/movie/:id
  - DELETE /api/movie/:id

### GET /api/movies
http://localhost:4000/api/movies

### POST /api/movie
http://localhost:4000/api/movie

Example JSON Body
```javascript
{
    "movie_name": "Spiderman: Far From Home",
    "director_name": "Jon Watts",
    "year_released": 2019,
    "duration": 130,
    "imdb_rating": 7.5
}
```

Edge cases:
- Add multiple movies with same name
- Missing field in JSON body

### PUT /api/movie/:id
http://localhost:4000/api/movie/1

Example JSON Body
```javascript
{
    "movie_name": "Spiderman: No Way Home",
    "director_name": "Jon Watts",
    "year_released": 2021,
    "duration": 130,
    "imdb_rating": 8.0
}
```

Edge cases:
- Having multiple movies with same name
- Missing field in JSON body

### DELETE /api/movie/:id
http://localhost:4000/api/movie/1

## Production API Usage:
The deployed application URL is https://cs3219-otot-324906.as.r.appspot.com/. Simply replace localhost with the deployed URL and proceed with testing.

## Running Tests Locally:
1. Ensure you have navigated to the folder B/server.
2. Run test cases with Yarn
  
        yarn test

## Running Tests in CI:
Tests are ran automatically by GitHub Actions whenever a Pull Request is made to master branch, and when new commits are merged into master branch. Here are the relevant screenshots:

[Insert images here]

## Continuous Deployment
Deployment of NodeJS application is done with the help of GitHub Actions as well. Upon merging of commits into master and passing of the **Task B Test** workflow, the **Task B Deploy** workflow will be triggered. The application is then deployed to Google App Engine automatically. Here are the relevant screenshots:

[Insert images here]

## Frontend
Docker Compose is used to orchestrate containers in this task. Hence, frontend and backend applications would have been launched concurrently. Access the frontend SPA 
at http://localhost:3000, and interact with the UI, which have been configured to make requests to the backend APIs.