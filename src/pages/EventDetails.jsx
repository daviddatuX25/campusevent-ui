import { useParams, Link } from 'react-router-dom';
import { useEvents } from '../context/EventContext';

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

  return (
    <div className="page event-details">
      <Link to="/events" className="back-link">← Back to Events</Link>
      <h1>{event.title}</h1>
      <div className="event-info">
        <p><strong>Event ID:</strong> {event.id}</p>
        <p><strong>Description:</strong></p>
        <p className="event-body">{event.body}</p>
      </div>
    </div>
  );
}
