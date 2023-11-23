const mongoose = require('mongoose');

const connectToDatabase = async () => {
  try {
    await mongoose.connect('mongodb+srv://stripe:stripe@cluster0.nn4mlal.mongodb.net/?retryWrites=true&w=majority', {
    });
    console.log('Connected to database');
  } catch (error) {
    console.log('Error connecting to database:', error.message);
  }
};

module.exports = connectToDatabase;