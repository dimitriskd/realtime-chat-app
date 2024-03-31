const userData = {
  username: 'john_doe',
  password: 'secretpassword',
  email: 'johny@example.com'
};

fetch('http://localhost:3000/user/register', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(userData)
})
.then(response => {
  if (!response.ok) {
    return response.json().then(errorResponse => {
      throw new Error(`Network response was not ok: ${JSON.stringify(errorResponse)}`);
    });
  }
  return response.json();
})
.then(data => {
  console.log(data); // Response from server after successful login
})
.catch(error => {
  console.error('There was a problem with the fetch operation:', error);
});
