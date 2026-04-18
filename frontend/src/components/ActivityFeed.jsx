import { useState } from 'react';

const CATEGORIES = ['All', 'Academic', 'Technical', 'Cultural', 'Sports'];

function ActivityFeed({ activities }) {
  // using state to store the selected filter category, with "All" as the default
  const [filter, setFilter] = useState('All');

  // filtering based on sleected category 
  const filtered = filter === 'All'
    ? activities
    : activities.filter((a) => a.category === filter);

  return (
    <div className="feed-container">
      <h2>Activity Feed</h2>

      {/* selecting the category updates the state */}
      <div className="filter-bar">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={filter === cat ? 'active' : ''}
          >
            {cat}
          </button>
        ))}
      </div>
      
      {/* here im handling edge cases */}
      {activities.length === 0 && (
        <p className="empty">No activities logged yet. Go log one!</p>
      )}

      {activities.length > 0 && filtered.length === 0 && (
        <p className="empty">No activities found for "{filter}".</p>
      )}

      <ul className="activity-list">
        {filtered.map((a) => (
          <li key={a.id} className={`activity-item ${a.category}`}>
          <span className="activity-name">{a.name}</span>
          <span className={`activity-category ${a.category}`}>{a.category}</span>
          <span className="activity-date">{a.date}</span>
        </li>
        ))}
      </ul>
    </div>
  );
}

export default ActivityFeed;