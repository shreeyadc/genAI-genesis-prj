const axios = require('axios');

// Define the base URL for the Flask API
const flaskApiUrl = 'http://127.0.0.1:5000/greet';

// Make a GET request to the Flask API with a name parameter
axios.get(flaskApiUrl, { params: { name: 'Alice' } })
  .then(response => {
    console.log(response.data.message);  // Output: Hello, Alice!
  })
  .catch(error => {
    console.error('Error:', error);
  });
