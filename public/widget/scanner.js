let results = document.getElementById("results");

$("#scan").click(function () {
  const fixed_url = "bhs%20burlington%20ma%20instagram";
  
  fetch ("/getlinks", {
    method : "POST",
    headers : {
      "Content-Type" : "application/json"
    },
    body : JSON.stringify({
      url : "https://www.google.com/search?q=" + fixed_url
    })
  })
  .then(response => response.text())
  .then(data => {
    const data_array = data.split("<a href=");
    const all_array = [];
    let turn = 0;

    results.innerHTML = "";

    for (i = 0; i < data_array.length; i++) {
      if (data_array[i].includes("https://")) {
        const link_array = data_array[i].split('"');

        if (turn === 0) {
          // PASS 
          turn = turn + 1;
        }

        else {
          all_array.push(link_array[1]);
        }
      }
    }

    for (i = 0; i < all_array.length; i++) {
      results.innerHTML = results.innerHTML + "<p><a href='https://google.com" + all_array[i] + "' target='_blank'>" + all_array[i] + "</a></p>";
    }
  })
  .catch(error => {
    throw error;
  });
});