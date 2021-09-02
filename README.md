# Career Fairs Connect

[![Netlify Status](https://api.netlify.com/api/v1/badges/c7578632-270b-422b-ab87-98cdce484a44/deploy-status)](https://app.netlify.com/sites/career-fairs-connect/deploys)

[![Deploy with Vercel](https://vercel.com/button)](https://github.com/sseanik/Career-Fairs-Connect)
[![Deploy with Heroku](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

## Background

Career Fairs Connect is a web platform that allows universities to create an interactive online careers fair that connects employers who are advertising their graduate and internship roles with students. 

### Goals

* Provide a platform where universities can organize a virtual careers fair space for employers and students.
* Allow employers to provide information about themselves and list their available graduate and internship roles for students to apply.
* Allow employers to schedule and host live event presentations.
* Connect students with employers via Q&A functionality.
* Allow students to maintain profiles with contactable details, work experience, project experience, academic achievements and technical competencies.

## [Live Demo](https://career-fairs-connect.netlify.app/landing)

The Frontend was built ontop of React with create-react-app and Redux Toolkit. A [happy path](https://github.com/sseanik/Career-Fairs-Connect/blob/main/HAPPY_PATH.md) set of steps is provided to help explore the entire functionality of the application.

#### Demo Accounts
```
email: demo@employer.com
password: demodemo

email: demo@university.com
password: demomdemo

email: demo@student.com
password: demomdemo
```

### Frontend Features:

* Landing Page with feature previews, testimonials and an overall introduction into the application
* Full responsiveness through the entire application
* Light/Dark mode toggle that works throughout the entire application
* Management of three different types of users (i.e. University, Employer, Student) and management of their perspectives and restrictions using Redux Toolkit
* Dynamic colourisation of sections, i.e. Taking the logo of a university or employer, the most dominant colour is extracted, and then applied to their respective stall interface
* A useable calendar interface built ontop of the FullCalendar API that allows for viewing, creating, editing and deleting of scheduled presentations
* A data table built ontop of the Elementz table library that allows for displaying, filtering and searching for information over the table

## [Backend Demo](https://career-fairs-connect.herokuapp.com/)

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

## Screenshots

![Landing Page](https://github.com/sseanik/Career-Fairs-Connect/blob/main/screenshots/landing.png)
![Dark Mode Landing Page](https://github.com/sseanik/Career-Fairs-Connect/blob/main/screenshots/darkmode.png)
![Fair Events Page](https://github.com/sseanik/Career-Fairs-Connect/blob/main/screenshots/fairs.png)
![Fair Page](https://github.com/sseanik/Career-Fairs-Connect/blob/main/screenshots/stall.png)
![Presentation Calendar](https://github.com/sseanik/Career-Fairs-Connect/blob/main/screenshots/calendar.png)
![Opportunities Table](https://github.com/sseanik/Career-Fairs-Connect/blob/main/screenshots/opportunities.png)

## Credit

This application was collaborated in a CS9323 course with myself, [Max](https://github.com/Youps22), [Wanchen](https://github.com/WanchenZhao), [Arthur](https://github.com/af-af), [Thornton](https://github.com/ThorntonChan) and [Yulia](https://github.com/YuliaRodionov). Our tech stack primarily consists of React for frontend and Django for backend. I primarily contributed towards the Frontend component of this application, focusing on library integration (data tables, calendars, dynamic colourisation), design and responsiveness.
