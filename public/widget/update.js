const current_date = document.getElementById("current-date");

setInterval(function () {
  let currentDateTime = new Date().toDateString();
  current_date.innerText = currentDateTime;
}, 10000);

let currentDateTime = new Date().toDateString();
current_date.innerText = currentDateTime;