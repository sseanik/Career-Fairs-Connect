# Career Fairs Connect

[![Django CI](https://github.com/af-af/Online-Careers-Fair/actions/workflows/django.yml/badge.svg)](https://github.com/af-af/Online-Careers-Fair/actions/workflows/django.yml)

***The following instructions will introduce how to operate project Career Fairs Connect on the your computer.*** 

Requirements: (fill in requirements if any)
___

## Docker Setup

#### 1. Install Docker 

Visit https://docs.docker.com/get-docker/ and downlowd the Docker version of your computer

#### 2. Open terminal, change directory to Online-Career-Fairs folder

#### 3. Run command

    docker-compose run --service-ports frontend

This might take a few minuts, and will create a docker image with all the dependencies, start the Django development server locally (port 80),
install react app and run it locally as well.
It will use local sqlite database and set it up on the first run.

#### 4. Open in Browser

Open browser and navigate to http://localhost:3000/ to see our project


#### Swagger API documentation

Navigate to http://localhost:8000/swagger/ to see API documentation.

___
(Might not need this part below when using Docker)
## Frontend Setup 

#### Open another terminal and please make sure you are under the folder 'Online-Careers-Fair'

#### 7. Move to the frontend folder

    cd frontend

#### 8. Install the requirements

    yarn install

#### 9. Start the environment

    yarn start

##### (http://localhost:3000) will be runned in the browser.

##### Press 'CTRL' + 'C' to Exit