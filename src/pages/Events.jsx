import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { useEvents } from '../context/EventContext';
import { useState, useEffect } from 'react';

export default function Events() {
  const { state, dispatch } = useEvents();
  const [search, setSearch] = useState('');
  const [lastUpdated, setLastUpdated] = useState(new Date());

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['events'],
    queryFn: async () => {
      const res = await fetch('https://jsonplaceholder.typicode.com/posts');
      if (!res.ok) throw new Error('Failed to fetch events');
      return res.json();
    },
    staleTime: 5000,
  });

  useEffect(() => {
    if (data) {
      dispatch({ type: 'FETCH_SUCCESS', payload: data });
      setLastUpdated(new Date());
    }
  }, [data, dispatch]);

  useEffect(() => {
    if (isError) {
      dispatch({ type: 'FETCH_ERROR', payload: 'Failed to load events' });
    }
  }, [isError, dispatch]);

  useEffect(() => {
    if (isLoading) {
      dispatch({ type: 'FETCH_START' });
    }
  }, [isLoading, dispatch]);

  const filteredEvents = state.events.filter(e =>
    e.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id) => {
    dispatch({ type: 'DELETE_EVENT', payload: id });
  };

  return (
    <div className="page events-page">
      <div className="events-header">
        <h1>Campus Events</h1>
        <div className="last-updated">Last Updated: {lastUpdated.toLocaleTimeString()}</div>
      </div>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search events..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {isLoading && <p className="loading">Loading events...</p>}
      {isError && <p className="error">Error loading events</p>}

      {!isLoading && !isError && (
        <div className="events-grid">
          {filteredEvents.map((event) => (
            <div key={event.id} className="event-card">
              <h3>{event.title}</h3>
              <p>{event.body}</p>
              <div className="card-actions">
                <Link to={`/events/${event.id}`} className="btn">View Details</Link>
                <button onClick={() => handleDelete(event.id)} className="btn btn-danger">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
