# Online-Careers-Fair

[![Django CI](https://github.com/af-af/Online-Careers-Fair/actions/workflows/django.yml/badge.svg)](https://github.com/af-af/Online-Careers-Fair/actions/workflows/django.yml)


## To run the backend
- install Docker https://docs.docker.com/get-docker/
- run command "docker-compose run --service-ports backend"

It will create a docker image with all the dependencies and start the Django development server locally (port 80).
It will use local sqlite database and set it up on the first run.

Just navigate to http://localhost/swagger/ to see all the endpoints