# Career Fairs Connect

[![Netlify Status](https://api.netlify.com/api/v1/badges/c7578632-270b-422b-ab87-98cdce484a44/deploy-status)](https://app.netlify.com/sites/elastic-lichterman-7198a0/deploys)

## [Live Demo](https://elastic-lichterman-7198a0.netlify.app/)

## [Backend Swagger](http://ec2-13-55-22-199.ap-southeast-2.compute.amazonaws.com/swagger/)

While the project backend is running, visit http://127.0.0.1:8000/swagger/ in the browser to see Swagger API documentation.

## Running the project locally

### Backend Setup

1. Change directory to the project backend folder
2. Create a virtual environment, e.g. `virtualenv venv`
3. Start the virtual environment, e.g. `source venv/bin/activate`
4. Install required python packages, e.g. `pip3 install -r requirements.txt`
5. Navigate to src directory
6. Use makemigrations on the app, i.e. `python3 manage.py makemigrations`
7. Migrate the app, i.e. `python3 manage.py migrate --run-syncdb`
8. Start the backend server, e.g. `python3 manage.py runserver`

### Frontend Setup 

1. Open another terminal and change directory to the frontend folder
2. Install the node packages, e.g. `yarn install`
4. Start the project, e.g. `yarn start`

## Happy Path Instructions

1. Navigate to http://localhost:3000. Scroll through page for brief overview of project. 
2. Press "Sign Up" on top of the page.
3. Press I am an University.
4. Fill in details and register. Please note down details. Especially University. Note: Website URL should include protocol (e.g https://www.google.com)
5. Sign in with University details.
6. Press "Create Event" and submit after filling in details. 
7. Browse to http://localhost:3000 on incognito window .
8. Sign up as Employer. Please note down details. Note: Website URL should include protocol (e.g https://www.google.com)
9. Login with Employer details.
10. As Employer, click on the event you made as University.
11. Click on "Apply Company Stall".
12. As University click on the event you created.
13. Click "Approve". "Set pending" allows us to change their approval status later.
14. As Employer click on our stall that has now been approved.
15. Click "Add Opportunity".
16. Fill and submit opportunity. Note: protocol required for "Application Link" (e.g https://).
17. Click "Presentation Calendar" tab.
18. Click "Week" sub tab.
19. Click and drag time you want presentation to be. Note: protocol required for Presentation Link (e.g https://). Note: We purposefully disallowed presentations spanning over multiple days.
20. Fill out details and submit.
21. Open a separate Browser and visit http://localhost:3000 again
22. Sign up and login as a student. Note: University must be same as university, when your signed up as University
23. Click on event we created.
24. Click on stall we created.
25. View opportunity we added (no action required).
26. Press Presentation Calendar
27. View sub-tabs Month, Week and List	
28. Click the "Questions and Answers" tab
29. Type question and submit it.
30. As Employer refresh page then click on "Questions and Answers" tab.
31. Press the question to bring up answer panel.
32. Answer question and press submit.
33. As Student refresh page, and then click on "Questions and Answers" tab.
34. Click question to confirm answer has appeared.
