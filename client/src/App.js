import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box, Container } from '@mui/material';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Home from './pages/Home';
import Portfolio from './pages/Portfolio';
import Contact from './pages/Contact';
import BookingCalendar from './components/BookingCalendar';
import SEO from './components/SEO';
import About from './pages/About';
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import ForgotPassword from './pages/admin/ForgotPassword';
import ResetPassword from './pages/admin/ResetPassword';
import NotFound from './pages/NotFound';

const App = () => {
  return (
    <>
      <SEO
        title="Portfolio Website"
        description="Professional portfolio website showcasing creative work and photography"
        keywords={['portfolio', 'photography', 'creative', 'booking']}
      />
      <Box display="flex" flexDirection="column" minHeight="100vh">
        <Navigation />
        <Container component="main" sx={{ flex: 1, py: 4 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin/login" element={<Login />} />
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route path="/admin/forgot-password" element={<ForgotPassword />} />
            <Route path="/admin/reset-password/:token" element={<ResetPassword />} />
            <Route path="/book" element={<BookingCalendar />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Container>
        <Footer />
      </Box>
    </>
  );
};

export default App;
