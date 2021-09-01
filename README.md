# Career Fairs Connect

[![Netlify Status](https://api.netlify.com/api/v1/badges/c7578632-270b-422b-ab87-98cdce484a44/deploy-status)](https://app.netlify.com/sites/elastic-lichterman-7198a0/deploys)

## Background

Career Fairs Connect is a web platform that allows universities to create an interactive online careers fair that connects employers who are advertising their graduate and internship roles with students. 

### Goals

* Provide a platform where universities can organize a virtual careers fair space foremployers and students.
* Allow employers to provide information about themselves and list their available graduate and internship roles for students to apply.
* Allow employers to schedule and host live event presentations.
* Connect students with employers via Q&A functionality.
* Allow students to maintain profiles with contactable details, work experience, project experience, academic achievements and technical competencies.


## [Live Demo](https://elastic-lichterman-7198a0.netlify.app/)

## [Backend Demo](http://ec2-13-55-22-199.ap-southeast-2.compute.amazonaws.com/swagger/)

The Backend Swagger API documentation is available to view the endpoints and models used. The Django REST framework was used for the backend API.

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

## Credit

This application was collaborated in a CS9323 course with myself, [Max](https://github.com/Youps22), [Wanchen](https://github.com/WanchenZhao), [Arthur](https://github.com/af-af), [Thornton](https://github.com/ThorntonChan) and [Yulia](https://github.com/YuliaRodionov). Our tech stack primarily consists of React for frontend and Django for backend. I primarily contributed towards the Frontend component of this application, focusing on library integration (data tables, calendars, dynamic colourisation), design and responsiveness.
