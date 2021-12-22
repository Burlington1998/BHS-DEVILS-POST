const username = document.getElementById("username");
const msg = document.getElementById("msg");
const submissions = document.getElementById("submissions");

fetch ("/posts")
.then(response => response.text())
.then(data => {
  submissions.innerHTML = data;
})
.catch(error => {
  throw error;
});

$("#submission").submit(function () {
  event.preventDefault();
  
  fetch ("/szone", {
    method : "POST",
    headers : {
      "Content-Type" : "application/json"
    },
    body : JSON.stringify({
      username : username.value,
      message : msg.value
    })
  })
  .then(response => response.text())
  .then(data => {
    if (data === "nospam") {
      document.getElementById("error").innerText = "Error: Too fast of a post.";
    }

    else {
      document.getElementById("error").value = "";
      msg.value = "";
    }
  })
  .catch(error => {
    throw error;
  });
});

setInterval(function () {
  fetch ("/posts")
.then(response => response.text())
.then(data => {
  submissions.innerHTML = data;
})
.catch(error => {
  throw error;
});
}, 1000);