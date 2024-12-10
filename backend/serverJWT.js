const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const { fileAuth, generateJWT } = require("./auth");
 
const app = express();
app.use(bodyParser.json());
 
const booksFilePath = path.join(__dirname, "./data/books.json");
 
// Helper function to read books from JSON file
const readBooksFromFile = () => {
  const data = fs.readFileSync(booksFilePath, "utf8");
  return JSON.parse(data);
};
 
// Helper function to write books to JSON file
const writeBooksToFile = (books) => {
  fs.writeFileSync(booksFilePath, JSON.stringify(books, null, 2), "utf8");
};
 
// Middleware for CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});
 
// Login endpoint for JWT authentication
app.post("/login", (req, res) => {
  const { username, password } = req.body;
 
  // Authenticate user
  const user = fileAuth(username, password);
  if (!user) {
    return res.status(401).json({ message: "Invalid username or password" });
  }
 
  // Generate JWT token
  const token = generateJWT(username);
  res.json({ token });
});
 
// GET all books
app.get("/books", (req, res) => {
  try {
    const books = readBooksFromFile();
    res.status(200).json(books);
  } catch (err) {
    console.error("Error reading books:", err);
    res.status(500).json({ message: "Failed to fetch books" });
  }
});
 
// DELETE a specific book by ID
app.delete("/books/:id", (req, res) => {
  const bookId = parseInt(req.params.id, 10);
 
  try {
    const books = readBooksFromFile();
 
    // Find and remove the book
    const bookIndex = books.findIndex((book) => book.id === bookId);
    if (bookIndex === -1) {
      return res.status(404).json({ message: "Book not found" });
    }
 
    books.splice(bookIndex, 1); // Remove the book
 
    // Save the updated list back to the file
    writeBooksToFile(books);
 
    res.status(200).json({ message: "Book deleted successfully" });
  } catch (err) {
    console.error("Error deleting book:", err);
    res.status(500).json({ message: "Failed to delete book" });
  }
});
 
const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
 