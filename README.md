# Online-Careers-Fair

[![Django CI](https://github.com/af-af/Online-Careers-Fair/actions/workflows/django.yml/badge.svg)](https://github.com/af-af/Online-Careers-Fair/actions/workflows/django.yml)


## To run the app
- install Docker https://docs.docker.com/get-docker/
- run command "docker-compose run --service-ports frontend"

It will create a docker image with all the dependencies, start the Django development server locally (port 80),
install react app and run it locally as well.
It will use local sqlite database and set it up on the first run.

Just navigate to http://localhost:3000/ to see our app

To see our backend endpoints via Swagger - navigate to  http://localhost:3000/swagger/
