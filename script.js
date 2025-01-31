// Handle form submission
document.getElementById('contact-form').addEventListener('submit', function (e) {
  e.preventDefault(); // Prevent the form from submitting

  // Get form values
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;

  // Simulate form submission
  alert(`Thank you, ${name}! Your message has been sent.`);
  console.log({ name, email, message });

  // Clear the form
  document.getElementById('contact-form').reset();
});
