# Career Fairs Connect

[![Netlify Status](https://api.netlify.com/api/v1/badges/c7578632-270b-422b-ab87-98cdce484a44/deploy-status)](https://app.netlify.com/sites/elastic-lichterman-7198a0/deploys)

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

### Happy Path Instructions

1. Navigate to http://localhost:3000. Scroll through page for brief overview of project. 
2. Press "Sign Up" on top of the page.
3. Press I am an University.
4. Fill in details and register. Please note down details. Especially University. 
    * Note: Website URL should include protocol (e.g https://www.google.com)
6. Sign in with University details.
7. Press "Create Event" and submit after filling in details. 
8. Browse to http://localhost:3000 on incognito window .
9. Sign up as Employer. Please note down details. Note: Website URL should include protocol (e.g https://www.google.com)
10. Login with Employer details.
11. As Employer, click on the event you made as University.
12. Click on "Apply Company Stall".
13. As University click on the event you created.
14. Click "Approve". "Set pending" allows us to change their approval status later.
15. As Employer click on our stall that has now been approved.
16. Click "Add Opportunity".
17. Fill and submit opportunity. Note: protocol required for "Application Link" (e.g https://).
18. Click "Presentation Calendar" tab.
19. Click "Week" sub tab.
20. Click and drag time you want presentation to be. Note: protocol required for Presentation Link (e.g https://). Note: We purposefully disallowed presentations spanning over multiple days.
21. Fill out details and submit.
22. Open a separate Browser and visit http://localhost:3000 again
23. Sign up and login as a student. Note: University must be same as university, when your signed up as University
24. Click on event we created.
25. Click on stall we created.
26. View opportunity we added (no action required).
27. Press Presentation Calendar
28. View sub-tabs Month, Week and List	
29. Click the "Questions and Answers" tab
30. Type question and submit it.
31. As Employer refresh page then click on "Questions and Answers" tab.
32. Press the question to bring up answer panel.
33. Answer question and press submit.
34. As Student refresh page, and then click on "Questions and Answers" tab.
35. Click question to confirm answer has appeared.
