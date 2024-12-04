import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';
import DeleteConfrimationModal from './modals/DeleteConfrimationModal'; // Corrected import
import './Modal.css'; // Import the modal styles from a separate CSS file


const AdminDashboard = () => {
  const [books, setBooks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [bookToDelete, setBookToDelete] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:7000/books');
        setBooks(response.data);
      } catch (err) {
        console.error('Error fetching books:', err);
      }
    };

    fetchBooks();
  }, []);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:7000/books/${bookToDelete.id}`);
      setBooks(books.filter(book => book.id !== bookToDelete.id)); // Update book list after deletion
      setShowModal(false);
      setSuccessMessage('Book deleted successfully!'); // Show success message
    } catch (err) {
      console.error('Error deleting book:', err);
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit-book/${id}`); // Navigate to edit page
  };

  const handleDeleteClick = (book) => {
    setBookToDelete(book);
    setShowModal(true); // Show the delete confirmation modal
  };

  const handleSubmitChanges = () => {
    setSuccessMessage('Changes saved successfully!');
    setTimeout(() => {
      navigate('/'); // Redirect to homepage after a short delay
    }, 2000); // 2 seconds delay before redirect
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <button onClick={() => navigate('/add-book')}>Add New Book</button>

      <div className="book-list">
        {books.map((book) => (
          <div key={book.id} className="book-card">
            <img src={book.coverImage} alt={book.title} className="book-image" />
            <h3>{book.title}</h3>
            <p>{book.author}</p>
            <button onClick={() => handleEdit(book.id)}>Edit</button>
            <button onClick={() => handleDeleteClick(book)}>Delete</button>
          </div>
        ))}
      </div>

      {/* Success Message */}
      {successMessage && <p>{successMessage}</p>}

      {/* Delete Confirmation Modal */}
      {showModal && (
        <DeleteConfrimationModal
          showModal={showModal}
          onDelete={handleDelete}
          onCancel={() => setShowModal(false)} // Close the modal
        />
      )}

      {/* Submit Changes Button */}
      <button onClick={handleSubmitChanges}>Submit Changes</button>
    </div>
  );
};

export default AdminDashboard;
