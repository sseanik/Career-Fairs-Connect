# Career Fairs Connect

[![Netlify Status](https://api.netlify.com/api/v1/badges/c7578632-270b-422b-ab87-98cdce484a44/deploy-status)](https://app.netlify.com/sites/elastic-lichterman-7198a0/deploys)

## Background

Blah

## [Live Demo](https://elastic-lichterman-7198a0.netlify.app/)

## [Backend Swagger](http://ec2-13-55-22-199.ap-southeast-2.compute.amazonaws.com/swagger/)

While the project backend is running, visit http://127.0.0.1:8000/swagger/ in the browser to see Swagger API documentation.

### Running the project locally

#### Backend Setup

1. Change directory to the project backend folder
2. Create a virtual environment, e.g. `virtualenv venv`
3. Start the virtual environment, e.g. `source venv/bin/activate`
4. Install required python packages, e.g. `pip3 install -r requirements.txt`
5. Navigate to src directory
6. Use makemigrations on the app, i.e. `python3 manage.py makemigrations`
7. Migrate the app, i.e. `python3 manage.py migrate --run-syncdb`
8. Start the backend server, e.g. `python3 manage.py runserver`

#### Frontend Setup 

1. Open another terminal and change directory to the frontend folder
2. Install the node packages, e.g. `yarn install`
4. Start the project, e.g. `yarn start`
