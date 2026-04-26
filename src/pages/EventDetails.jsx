import { useParams, Link } from 'react-router-dom';
import { useEvents } from '../context/EventContext';

const CATEGORIES = ['Academic', 'Social', 'Sports', 'Workshop', 'Seminar', 'Cultural'];

const CATEGORY_COLORS = {
  Academic: '#6366f1',
  Social: '#ec4899',
  Sports: '#22c55e',
  Workshop: '#f59e0b',
  Seminar: '#3b82f6',
  Cultural: '#8b5cf6',
};

function getCategory(id) {
  return CATEGORIES[id % CATEGORIES.length];
}

export default function EventDetails() {
  const { id } = useParams();
  const { state } = useEvents();
  const event = state.events.find(e => e.id === parseInt(id));

  if (!event) {
    return (
      <div className="page">
        <h1>Event Not Found</h1>
        <Link to="/events" className="btn">Back to Events</Link>
      </div>
    );
  }

  const cat = getCategory(event.id);

  return (
    <div className="page event-details">
      <Link to="/events" className="back-link">&larr; Back to Events</Link>
      <span
        className="badge"
        style={{ 
          margin: '0 10px',
          background: CATEGORY_COLORS[cat] 
        }}
      >
        {cat}
      </span>
      <h1>{event.title}</h1>
      <div className="event-info">
        <p><strong>Event ID:</strong> {event.id}</p>
        <p><strong>Category:</strong> {cat}</p>
        <p><strong>Description:</strong></p>
        <p className="event-body">{event.body}</p>
      </div>
    </div>
  );
}