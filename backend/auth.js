const fs = require('fs');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const path = require('path');
const crypto = require('crypto');

const usersFilePath = path.join(__dirname, 'data', 'users.json');
const SECRET_KEY = crypto.randomBytes(64).toString('hex'); 


const getUsers = () => {
  const usersData = fs.readFileSync(usersFilePath);
  return JSON.parse(usersData);
};


const fileAuth = (username, password) => {
  const users = getUsers();
  const user = users.find(user => user.username === username);
  
  if (user && bcrypt.compareSync(password, user.password)) {
    return user;
  }
  
  return null;
};


const generateJWT = (username) => {
  return jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
};

const verifyJWT = (token) => {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (error) {
    return null;
  }
};

module.exports = {
  fileAuth,
  generateJWT,
  verifyJWT
};