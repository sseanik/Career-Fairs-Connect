

# Career Fairs Connect

[![Django CI](https://github.com/af-af/Online-Careers-Fair/actions/workflows/django.yml/badge.svg)](https://github.com/af-af/Online-Careers-Fair/actions/workflows/django.yml)

***The following steps will introduce how to run the project in 2 different ways.*** 

___
## Option 1. Run the project with Docker

#### 1. Install Docker 

Visit https://docs.docker.com/get-docker/ and download Docker for your operating system

#### 2. Open terminal, change directory to the project folder
    cd /your_path_to_this_folder/Online-Career-Fairs

#### 3. Run the following command in the terminal

    docker-compose run --service-ports frontend

###### The first time running this command might need a few minutes to create a docker image with all the dependencies, start the Django development server locally (port 80), and install react app and run it locally. It will use a local SQLite database and set it up on the first run.

#### 4. Open in Browser

Open the browser and navigate to http://localhost:3000/ to see the project.

___

## Option 2. Run the project in your local environment
Requirements: Python version 3.7 or above

### Backend Setup

#### 1. Start by installing virtualenv if you don't have it
    pip install virtualenv

#### 2. Change directory to the project backend folder
    cd /your_path_to_this_folder/Online-Career-Fairs/backend

#### 3. Set up the virtual environment by running
    virtualenv env

#### 4. start the virtual environment
    
    source bin/activate
    
#### 5. Install required packages

###### While the virtual environment is active, install required packages into your virtual environment. It may take several minutes to install
    
    pip install -r ../requirements.txt

#### 6. Go to src directory
    cd src/
###### Now when you run ```ls``` , you should be able to see a ```manage.py``` file

#### 7. Use makemigrations on the app
    python3 manage.py makemigrations

#### 8. Migrate the app
    python3 manage.py migrate

#### 9. You are now good to run the backend server with
    python3 manage.py runserver

### Frontend Setup 

#### 10. Open another terminal and change directory to the frontend folder

    cd /your_path_to_this_folder/Online-Career-Fairs/frontend

#### 11. Install the requirements

    yarn install

#### 12. Start the project

    yarn start

##### (http://localhost:3000) will be run in the browser.

##### Press 'CTRL' + 'C' to Exit

## API documentation

While the project backend is running, visit http://127.0.0.1:8000/swagger/ in the browser to see Swagger API documentation.

## Step by Step Instructions (Happy Path)

#### 1. Navigate to http://localhost:3000. Scroll through page for brief overview of project. 

#### 2. Press "Sign Up" on top of the page.

#### 3. Press I am an University

#### 4. Fill in details and register
Please note down details
Note: Website URL should include protocol (e.g https://www.google.com)

#### 5. Sign in with University details

#### 6. Press "Create Event" and submit after filling in details. 

#### 7. Browse to http://localhost:3000 on incognito window 

#### 8. Sign up as Employer
Please note down details
Note: Website URL should include protocol (e.g https://www.google.com)

#### 9. Login with Employer details

#### 10. As Employer, click on the event you made as University.

#### 11. Click on "Apply Company Stall"

#### 12. As University click on the event you created.

#### 13. Click "Approve". "Set pending" allows us to change their approval status later.

#### 14. As Employer click on our stall that has now been approved.

#### 15. Click "Add Opportunity"

#### 16. Fill and submit opportunity. 	
Note: protocol required for "Application Link" (e.g https://) 

#### 17. Click "Presentation Calendar" tab.

#### 18. Click "Week" sub tab.

#### 19. Click and drag time you want presentation to be.
Note: We purposefully disallowed presentations spanning over multiple days.

#### 20. Fill out details and submit.

#### 21. Open a separate Browser and visit http://localhost:3000 again

#### 22. Sign up and login as a student.


#### 23.
#### 24.
#### 25.
#### 26.
#### 27.
#### 28.
#### 29.
#### 30.
#### 31.
#### 32.
#### 33.
#### 34.
#### 35.
#### 36.
#### 37.
