import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import HomePage from './pages/HomePage';
import BookDetail from './components/BookDetail';
import AdminDashboard from './components/AdminDashboard';
import AddBook from './components/AddBook';
import EditBook from './components/EditBook';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Authentication state

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route
          path="/books"
          element={isAuthenticated ? <HomePage /> : <Login setIsAuthenticated={setIsAuthenticated} />}
        />
        <Route
          path="/books/:id"
          element={isAuthenticated ? <BookDetail /> : <Login setIsAuthenticated={setIsAuthenticated} />}
        />
        <Route
          path="/admin-dashboard"
          element={isAuthenticated ? <AdminDashboard /> : <Login setIsAuthenticated={setIsAuthenticated} />}
        />
        <Route
          path="/add-book"
          element={isAuthenticated ? <AddBook /> : <Login setIsAuthenticated={setIsAuthenticated} />}
        />
        <Route
          path="/edit-book/:id"
          element={isAuthenticated ? <EditBook /> : <Login setIsAuthenticated={setIsAuthenticated} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
