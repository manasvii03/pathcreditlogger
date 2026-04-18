import { useState } from 'react';

const CATEGORIES = ['Academic', 'Technical', 'Cultural', 'Sports'];

function ActivityForm({ addActivity, onSuccess }) {
  const today = new Date().toISOString().split('T')[0];
  
  // using state to manage inputs
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Academic');
  const [date, setDate] = useState(today);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); // this stops the form from refreshing the page on submit

    
    if (!name.trim()) {
      setError('Activity name cannot be empty.');
      return;
    }

    // on submit the form sends the activity data to the parent component using the addActivity function
    addActivity({ id: Date.now(), name: name.trim(), category, date });

    // the form fields are set to null/ defualt values after submission and the error message is cleared
    setName('');
    setCategory('Academic');
    setDate(today);
    setError('');
    onSuccess();
  };

  return (
    <div className="form-container">
      <h2>Log an Activity</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>Activity Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Hackathon, Cricket match"
        />

        <label>Category</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <label>Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <button type="submit">Log Activity</button>
      </form>
    </div>
  );
}

export default ActivityForm;