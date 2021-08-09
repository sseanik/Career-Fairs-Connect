
# Career Fairs Connect

[![Django CI](https://github.com/af-af/Online-Careers-Fair/actions/workflows/django.yml/badge.svg)](https://github.com/af-af/Online-Careers-Fair/actions/workflows/django.yml)

***The following steps will introduce how to run the project in 2 different ways.*** 

___
## Option 1. Run the project with Docker

#### 1. Install Docker 

Visit https://docs.docker.com/get-docker/ and download Docker for your operating system

#### 2. Open terminal, change directory to the project folder
    $ cd /your_path_to_this_folder/Online-Career-Fairs

#### 3. Run the following command in the terminal

    $ docker-compose run --service-ports frontend

###### The first time running this command might need a few minutes to create a docker image with all the dependencies, start the Django development server locally (port 80), and install react app and run it locally. It will use a local SQLite database and set it up on the first run.

#### 4. Open in Browser

Open the browser and navigate to http://localhost:3000/ to see the project.

___

## Option 2. Run the project in your local environment
Requirements: Python version 3.7 or above

### Backend Setup

#### 1. Change directory to the project backend folder
    $ cd /your_path_to_this_folder/Online-Career-Fairs/backend

#### 2. Set up the virtual environment by running
    $ virtualenv env

#### 3. start the virtual environment
    
    $ source bin/activate
    
#### 4. Install required packages

###### While the virtual environment is active, install required packages into your virtual environment. It may take several minutes to install
    
    $ pip install -r ../requirements.txt

#### 5. Go to src directory
    $ cd src/
###### Now when you run ```ls``` , you should be able to see a ```manage.py``` file

#### 6. Use makemigrations on the app
    $ python3 manage.py makemigrations

#### 7. Migrate the app
    $ python3 manage.py migrate

#### 8. You are now good to run the backend server with
    $ python3 manage.py runserver

### Frontend Setup 

#### 9. Open another terminal and change directory to the frontend folder

    $ cd /your_path_to_this_folder/Online-Career-Fairs/frontend

#### 10. Install the requirements

    $ yarn install

#### 11. Start the project

    $ yarn start

##### (http://localhost:3000) will be run in the browser.

##### Press 'CTRL' + 'C' to Exit

## API documentation

While the project backend is running, visit http://127.0.0.1:8000/swagger/ in the browser to see Swagger API documentation.
