import { useState, useEffect } from 'react';
import ActivityForm from './components/ActivityForm';
import ActivityFeed from './components/ActivityFeed';
import './App.css';

const API = 'http://127.0.0.1:8000/api/activities/';

function App() {
  const [page, setPage] = useState('feed');
  const [activities, setActivities] = useState([]);

  // here every time the app loads a GET request is made to the backend to fetch all the activities and display them in the feed
  useEffect(() => {
    fetch(API)
      .then(res => res.json())
      .then(data => setActivities(data));
  }, []);

  // this func sends a POST request to the backend with the new activity data and upon success it updates the activities state to include the newly added activity
  const addActivity = (activity) => {
    fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(activity),
    })
      .then(res => res.json())
      .then(newActivity => setActivities([newActivity, ...activities]));
  };

  return (
    <div className="app">
      <h1>PathCredit Logger</h1>
      <nav>
        <button onClick={() => setPage('feed')}>Activity Feed</button>
        <button onClick={() => setPage('log')}>Log Activity</button>
      </nav>

      {page === 'log' ? (
        // i passed the addActivity function to the form so it can send new activity data back to the parent component
        <ActivityForm addActivity={addActivity} onSuccess={() => setPage('feed')} />
      ) : (
        <ActivityFeed activities={activities} /> // activities is sent to the feed component as a prop to display the list of activities
      )}
    </div>
  );
}

export default App;