import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const BookDetail = () => {
  const { id } = useParams(); // Get the book id from the URL
  const [book, setBook] = useState(null);
  const navigate = useNavigate(); // Use to navigate to other pages

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(`http://localhost:7000/books/${id}`); // Fetch the book details by id
        setBook(response.data); // Set the fetched book data
      } catch (error) {
        console.error('Error fetching book details:', error);
      }
    };

    fetchBook();
  }, [id]);

  if (!book) return <div>Loading...</div>; // Show loading while fetching data

  return (
    <div className="book-detail">
      {/* Book Cover Image */}
      {book.coverImage && (
        <img
          src={book.coverImage}
          alt={book.title}
          className="book-detail-image" // Class for styling the image
        />
      )}

      <h1>{book.title}</h1>
      <h2>{book.author}</h2>
      <p>{book.description}</p>
      <button onClick={() => navigate('/books')}>Back to Book List</button>
    </div>
  );
};

export default BookDetail;
