const input = document.querySelector('.input');
const weatherForm = document.querySelector('form');
const message1 = document.querySelector('.message-1');
const message2 = document.querySelector('.message-2');



weatherForm.addEventListener('submit', (e) => {
e.preventDefault();
const location = input.value;
message1.textContent = 'Loading...';
message2.textContent = '';

fetch(`/weather?location=${location}`)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    if (data.error){
      message1.textContent = `Error: ${data.error}`;
    } else {
    message1.textContent = `Location: ${data.location}`;
    message2.textContent = `${data.forecast}`;
    }
  });
});
