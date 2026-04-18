**How to Run**

**Prerequisites**
- Python 3.8+
- Node.js 16+ (via nvm recommended)

```bash
cd backend
python3 -m venv pathcredit
source pathcredit/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

**Frontend** (open a new terminal)

```bash
cd frontend
npm install
npm start
```
App runs at `http://localhost:3000` · Backend at `http://127.0.0.1:8000`

**What I Built**

i started off with the core functionality
* i set up the basic structure of the app with two views - the activity feed and the form and added simple navigation between them using buttons in App.jsx. App.jsx keeps track of which page you're on and the list of all activities
* then i built ActivityForm.jsx to take name, category and date inputs and handle form submission without a page reload. when the form is submitted, if everything is valid it calls the addActivity function it receives from App.jsx
* after that i built ActivityFeed.jsx to display the activities on the screen. it receives the activities list as a prop from App.jsx and renders them, and also allows filtering by category
* finally i connected everything using state in App.jsx so that when a new activity is added it immediately shows up in the feed. App.jsx also fetches existing activities from the backend when the app loads and stores them in state

then i handled edge cases
* in ActivityForm.jsx before submitting it checks if the name field is empty and shows an error if it is
* in ActivityFeed.jsx if there are no activities yet, it shows a message telling the user to log one, and if a filter is selected but no activities match it shows a no results message. i also defaulted the date to today in the form

after that i added the backend for persistent storage
* i used django for the backend and sqlite for the database. initially i thought of using localStorage for persistence, but later switched to a backend approach so that data is stored more reliably and can scale better.  each activity that gets logged in gets stored in a database using a model with fields like name, category and date
* there are two api endpoints that i used

 GET /api/activities/ → fetch all activities
 
 POST /api/activities/ → add a new activity
 
* i used fetch API in the frontend to send GET requests when the app loads to retrieve existing activities and POST requests when a new activity is added so that the data is stored in the backend and persists across sessions

**What I’d Change/ Add**

if given another hour i would focus on implementing a couple of high impact improvements first
* Auth - currently anyone can see and add activities which isnt realistic for a real system. i would add authentication so that each user has their own account and only sees their own activities
* Edit/Delete - activities logged by mistake should be correctable. i would implement this by adding PATCH/PUT and DELETE api endpoints so existing activities can be updated or removed from the database

**if more time was available beyond that i would then consider**
* Pagination - right now all activities are loaded at once which is fine for small data but wouldn’t scale. if the number of activities grows large it would slow down rendering and affect performance. i would implement pagination or lazy loading so that only a limited number of activities are fetched and displayed at a time improving performance and making the UI smoother
* Search Bar - once the list gets long, filtering by category alone isn't enough. i would add a search input to filter activities by name so users can quickly find specific entries
* Responsive design - make the ui fully responsive so it works well across different screen sizes and devices
