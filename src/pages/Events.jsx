import { Link } from 'react-router-dom';
import { useEvents } from '../context/EventContext';
import { useState, useEffect, useMemo } from 'react';

const CATEGORIES = ['Academic', 'Social', 'Sports', 'Workshop', 'Seminar', 'Cultural'];

function getCategory(id) {
  return CATEGORIES[id % CATEGORIES.length];
}

const CATEGORY_COLORS = {
  Academic: '#6366f1',
  Social: '#ec4899',
  Sports: '#22c55e',
  Workshop: '#f59e0b',
  Seminar: '#3b82f6',
  Cultural: '#8b5cf6',
};

const CAMPUS_EVENTS = [
  {
    id: 1,
    title: 'Welcome Week Orientation',
    body: 'Join us for the annual Welcome Week! Meet your classmates, tour the campus, and kick off the semester with fun activities. Free food and merchandise for all attendees.',
    date: '2026-06-15',
    location: 'Main Quad',
  },
  {
    id: 2,
    title: 'Research Symposium 2026',
    body: 'Annual undergraduate research conference showcasing student projects across all departments. Oral presentations and poster sessions available.',
    date: '2026-07-20',
    location: 'Science Building Auditorium',
  },
  {
    id: 3,
    title: 'Career Fair: Tech & Engineering',
    body: 'Connect with over 50 employers from leading tech and engineering companies. Bring your resume and dress professionally. Pre-registration recommended.',
    date: '2026-08-05',
    location: 'Student Center Ballroom',
  },
  {
    id: 4,
    title: 'Intramural Basketball Tournament',
    body: 'Sign up your team for the spring basketball league. Games every Saturday in August. Prizes for top 3 teams. Open to all students.',
    date: '2026-08-10',
    location: 'Recreation Center',
  },
  {
    id: 5,
    title: 'Workshop: Resume Writing Basics',
    body: 'Learn how to craft a compelling resume that stands out. Career Services staff will provide tips and feedback. Bring your laptop.',
    date: '2026-06-25',
    location: 'Library Room 204',
  },
  {
    id: 6,
    title: 'Guest Lecture: AI in Healthcare',
    body: 'Dr. Maria Santos from Stanford presents on the applications of artificial intelligence in modern medicine. Q&A session to follow.',
    date: '2026-07-12',
    location: 'Medical School Auditorium',
  },
  {
    id: 7,
    title: 'Cultural Night: Global Connections',
    body: 'Celebrate diversity with performances, food, and displays from student cultural organizations. Tickets required.',
    date: '2026-09-01',
    location: 'Performing Arts Center',
  },
  {
    id: 8,
    title: 'Sustainability Campus Cleanup',
    body: 'Volunteer to help beautify campus grounds. Supplies provided. Service hours credited. Meet at the west entrance.',
    date: '2026-06-18',
    location: 'West Campus Entrance',
  },
  {
    id: 9,
    title: 'Hackathon: Solve for Tomorrow',
    body: '48-hour coding challenge with $10,000 in prizes. Form teams of up to 4 and build solutions to real-world problems.',
    date: '2026-08-22',
    location: 'Engineering Building',
  },
  {
    id: 10,
    title: 'Yoga & Mindfulness Sessions',
    body: 'Weekly drop-in yoga classes for all skill levels. Mats provided. Focus on stress relief and wellness during midterm season.',
    date: '2026-09-08',
    location: 'Recreation Center Studio B',
  },
  {
    id: 11,
    title: 'Alumni Networking Mixer',
    body: 'Meet successful alumni from your field of study. Speed networking format with refreshments served. Business casual attire.',
    date: '2026-07-30',
    location: 'Alumni House',
  },
  {
    id: 12,
    title: 'Movie Night Under the Stars',
    body: 'Outdoor screening of this years award-winning films. Free popcorn and blankets. Bring your own seating. Rain location: Student Center.',
    date: '2026-08-15',
    location: 'Outdoor Amphitheater',
  },
];

export default function Events() {
  const { state, dispatch } = useEvents();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [showUpdateMsg, setShowUpdateMsg] = useState(false);

  useEffect(() => {
    dispatch({ type: 'FETCH_SUCCESS', payload: CAMPUS_EVENTS });
    setLastUpdated(new Date());
  }, [dispatch]);

  const filteredEvents = useMemo(() => {
    return state.events.filter(e => {
      const matchSearch = e.title.toLowerCase().includes(search.toLowerCase());
      const cat = getCategory(e.id);
      const matchCategory = selectedCategory === 'All' || cat === selectedCategory;
      return matchSearch && matchCategory;
    });
  }, [state.events, search, selectedCategory]);

  const handleDelete = (id) => {
    dispatch({ type: 'DELETE_EVENT', payload: id });
  };

  const presentCategories = useMemo(() => {
    const cats = new Set(state.events.map(e => getCategory(e.id)));
    return ['All', ...CATEGORIES.filter(c => cats.has(c))];
  }, [state.events]);

  const formatDate = (dateString) => {
    const options = { weekday: 'long', day: 'numeric', month: 'long' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
  };

  return (
    <div className="page events-page">
      <div className="events-header">
        <h1>Campus Events</h1>
        <div className="last-updated">
          Last Updated: {lastUpdated.toLocaleTimeString()}
        </div>
      </div>

      {showUpdateMsg && (
        <div className="update-toast">Data Updated</div>
      )}

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search events..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="category-filters">
        {presentCategories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`filter-chip${selectedCategory === cat ? ' active' : ''}`}
          >
            {cat}
          </button>
        ))}
      </div>

      <p className="results-count">{filteredEvents.length} events found</p>

      <div className="events-grid">
        {filteredEvents.map((event) => {
          const cat = getCategory(event.id);
          const bgColor = CATEGORY_COLORS[cat];

          return (
            <div key={event.id} className="event-card-modern">
              <div className="card-banner" style={{ backgroundColor: bgColor }}>
                <div className="banner-icon-wrapper">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{color: 'white'}}>
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                    <circle cx="9" cy="15" r="2"></circle>
                    <path d="M21 15l-4-4-5 5"></path>
                  </svg>
                </div>
              </div>

              <div className="card-content">
                <p className="card-date">{formatDate(event.date)} | 10:00 am</p>
                <h3 className="card-title">{event.title}</h3>

                <div className="card-location">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  <span>{event.location}</span>
                </div>

                <div className="card-actions-modern">
                  <Link to={`/events/${event.id}`} className="action-btn view-btn" title="View Details">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  </Link>

                  <button onClick={() => handleDelete(event.id)} className="action-btn delete-btn" title="Delete Event">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="3 6 5 6 21 6"></polyline>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}