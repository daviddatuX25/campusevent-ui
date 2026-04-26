import { useAuth } from '../context/AuthContext';
import { useEvents } from '../context/EventContext';

export default function Dashboard() {
  const { isLoggedIn } = useAuth();
  const { state, dispatch } = useEvents();

  const handleAddEvent = () => {
    const newEvent = {
      id: Date.now(),
      title: 'New Campus Event',
      body: 'Event description here',
      completed: false,
    };
    dispatch({ type: 'ADD_EVENT', payload: newEvent });
  };

  const handleToggle = (id) => {
    dispatch({ type: 'TOGGLE_EVENT_STATUS', payload: id });
  };

  const completedCount = state.events.filter(e => e.completed).length;

  return (
    <div className="page dashboard">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <span className="status-badge">Authenticated</span>
      </div>

      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>Total Events</h3>
          <p className="stat-number">{state.events.length}</p>
        </div>
        <div className="stat-card">
          <h3>Completed</h3>
          <p className="stat-number">{completedCount}</p>
        </div>
        <div className="stat-card">
          <h3>Pending</h3>
          <p className="stat-number">{state.events.length - completedCount}</p>
        </div>
      </div>

      <div className="dashboard-actions">
        <button onClick={handleAddEvent} className="btn">+ Add Event</button>
      </div>

      <div className="event-list">
        {state.events.length === 0 && <p className="no-events">No events yet. Add one above!</p>}
        {state.events.slice(0, 10).map((event) => (
          <div key={event.id} className="event-item">
            <span className={event.completed ? 'completed' : ''}>{event.title}</span>
            <button onClick={() => handleToggle(event.id)} className="btn btn-small">
              {event.completed ? 'Undo' : 'Complete'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}