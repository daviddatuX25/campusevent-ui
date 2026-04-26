import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { EventProvider } from './context/EventContext';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';

const Events = lazy(() => import('./pages/Events'));
const EventDetails = lazy(() => import('./pages/EventDetails'));
const Dashboard = lazy(() => import('./pages/Dashboard'));

function LoadingSpinner() {
  return <div className="loading">Loading...</div>;
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <EventProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="events" element={
                  <Suspense fallback={<LoadingSpinner />}>
                    <Events />
                  </Suspense>
                } />
                <Route path="events/:id" element={
                  <Suspense fallback={<LoadingSpinner />}>
                    <EventDetails />
                  </Suspense>
                } />
                <Route path="dashboard" element={
                  <ProtectedRoute>
                    <Suspense fallback={<LoadingSpinner />}>
                      <Dashboard />
                    </Suspense>
                  </ProtectedRoute>
                } />
                <Route path="login" element={<Login />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </EventProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;