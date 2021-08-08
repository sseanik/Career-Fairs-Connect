# Career Fairs Connect

[![Django CI](https://github.com/af-af/Online-Careers-Fair/actions/workflows/django.yml/badge.svg)](https://github.com/af-af/Online-Careers-Fair/actions/workflows/django.yml)

***The following steps will introduce how to run project Career Fairs Connect with Docker.*** 

___

#### 1. Install Docker 

Visit https://docs.docker.com/get-docker/ and downlowd the Docker version of your computer

#### 2. Open terminal, change directory to Online-Career-Fairs folder

#### 3. Run the following command in the terminal

    $ docker-compose run --service-ports frontend

The first time running this command might need a few minuts to create a docker image with all the dependencies, start the Django development server locally (port 80), and install react app and run it locally.
It will use local sqlite database and set it up on the first run.

#### 4. Open in Browser

Open browser and navigate to http://localhost:3000/ to see our project


#### Swagger API documentation

Navigate to http://localhost:8000/swagger/ to see API documentation.
