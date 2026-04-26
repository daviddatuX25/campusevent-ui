import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="page home-page">
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to <span className="highlight">CampusEventUI</span></h1>
          <p className="hero-subtitle">
            Your one-stop hub for campus events and activities.
            Discover, join, and manage events happening across campus.
          </p>
          <div className="hero-actions">
            <Link to="/events" className="btn btn-lg">Browse Events</Link>
            <Link to="/dashboard" className="btn btn-outline btn-lg">Dashboard</Link>
          </div>
        </div>
        <div className="hero-illustration">
          <div className="floating-card card-1">Tech Talk</div>
          <div className="floating-card card-2">Workshop</div>
          <div className="floating-card card-3">Seminar</div>
        </div>
      </section>

      <section className="features">
        <div className="feature-card">
          <div className="feature-icon">&#128197;</div>
          <h3>Event Discovery</h3>
          <p>Browse all campus events in one place</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">&#128203;</div>
          <h3>Event Management</h3>
          <p>Add, toggle, and delete events easily</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">&#128274;</div>
          <h3>Protected Dashboard</h3>
          <p>Secure access to manage your events</p>
        </div>
      </section>
    </div>
  );
}