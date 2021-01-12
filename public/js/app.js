console.log("client side app.js loaded");

const weatherForm = document.querySelector("form");
const msgs1 = document.querySelector("#msg-1");
const msgs2 = document.querySelector("#msg-2");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const search = document.querySelector("#input").textContent;
  let headline = `<h2>
                    Searching
                  </h2>`;
  let loader = `<div id="loader">
                  <div class="area">
                    <div class="loading"></div>
                  </div>
                </div>`;
  msgs1.innerHTML = headline;
  msgs2.innerHTML = loader;
  fetch("http://localhost:3000/weather?address=" + search).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        msgs1.textContent = "Error";
        msgs1.classList.add("error1");
        msgs2.textContent = data.error;
      } else {
        msgs1.innerHTML = data.location;
        msgs1.classList.remove("error1");
        let datas = `<ul>
                      <li>
                        Minimum Tempreture: ${data.forcast.MinTemp} °C 
                      </li>
                      <li>
                        Maximum Tempreture: ${data.forcast.MaxTemp} °C 
                      </li>
                      <li>
                        Humidity: ${data.forcast.humidity} 
                      </li>
                      <li>
                        Clouds: ${data.forcast.clouds} 
                      </li>
                      <li>
                        Visibility: ${data.forcast.visibility} m 
                      </li>
                    </ul>`;
        msgs2.innerHTML = datas;
      }
    });
  });
});
