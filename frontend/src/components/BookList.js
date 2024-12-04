import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './BookList.css'; // Ensure the styles are applied

const BookList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch books data from the API
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:7000/books'); // Update with your API URL
        setBooks(response.data); // Set the books data
      } catch (err) {
        setError('Could not fetch books. Please try again later.');
        console.error('Error fetching books:', err);
      }
    };

    fetchBooks();
  }, []);

  // Filter books based on the search term
  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search by title or author..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar" // Class applied from BookList.css
      />

      {/* Display error if fetching books failed */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Book List */}
      <div className="book-list">
        {filteredBooks.length > 0 ? (
          filteredBooks.map(book => (
            <div key={book.id} className="book-card">
              {/* Display book cover image */}
              {book.coverImage && (
                <img
                  src={book.coverImage}
                  alt={book.title}
                  className="book-image" // Class for styling the image
                />
              )}
              <h3>{book.title}</h3>
              <p>{book.author}</p>
              <button onClick={() => navigate(`/books/${book.id}`)}>View Details</button>
            </div>
          ))
        ) : (
          <p>No books found</p>
        )}
      </div>
    </div>
  );
};

export default BookList;
