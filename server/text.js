// Define the user data to be sent in the request body

const userData = {
  username: 'john_doe',
  password: 'secretpassword'
};

fetch('http://localhost:3000/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(userData)
})
.then(response => {
  if (response.ok) {
    return response.json();
  } else {
    throw new Error('Failed to login', response);
  }
})
.then(data => {
  console.log('Login successful:', data);
})
.catch(error => {
  console.error('Error:', error.message);
});
