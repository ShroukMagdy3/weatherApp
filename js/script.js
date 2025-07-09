
async function getWeather(input) {
  let url;

  if (typeof input === "string") {
    // city name
    url = `https://api.weatherapi.com/v1/forecast.json?key=688ea4f7a9ba4ec9b2a234047240612&q=${input}&days=3`;
  } else if (typeof input === "object") {
    // coordinates { lat, lon }
    url = `https://api.weatherapi.com/v1/forecast.json?key=688ea4f7a9ba4ec9b2a234047240612&q=${input.lat},${input.lon}&days=3`;
  }

  const res = await fetch(url);
  const data = await res.json();
  return data;
}

function displayToday(data) {
  const todayDate = new Date(data.location.localtime);
  day1.innerText = todayDate.toLocaleDateString("en-US", { weekday: "long" });
  date1.innerText = todayDate.toLocaleDateString("en-US", { day: "numeric", month: "long" });

  location1.innerText = data.location.name;
  temp1.innerText = `${data.current.temp_c}°C`;
  weatherIcon1.src = "https:" + data.current.condition.icon;
}

function displayNextDays(data) {
  const forecast = data.forecast.forecastday;

  const date2 = new Date(forecast[1].date);
  day2.innerText = date2.toLocaleDateString("en-US", { weekday: "long" });
  temp2.innerText = `${forecast[1].day.avgtemp_c}°C`;
  weatherDesc2.innerText = forecast[1].day.condition.text;
  weatherIcon2.src = "https:" + forecast[1].day.condition.icon;

  const date3 = new Date(forecast[2].date);
  day3.innerText = date3.toLocaleDateString("en-US", { weekday: "long" });
  temp3.innerText = `${forecast[2].day.avgtemp_c}°C`;
  weatherDesc3.innerText = forecast[2].day.condition.text;
  weatherIcon3.src = "https:" + forecast[2].day.condition.icon;
}

async function startApp(locationInput = "Cairo") {
  try {
    const data = await getWeather(locationInput);
    displayToday(data);
    displayNextDays(data);
  } catch (err) {
    alert("❌ Couldn't load weather data.");
    console.error(err);
  }
}

function getUserLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = {
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        };
        startApp(coords);
      },
      (error) => {
        console.warn("Geolocation error:", error.message);
        startApp("Cairo"); // fallback
      }
    );
  } else {
    alert("Geolocation not supported. Showing Cairo.");
    startApp("Cairo");
  }
}

window.onload = function () {
  const locInput = document.getElementById("locInput");
  const searchForm = document.getElementById("searchForm");

  searchForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const city = locInput.value.trim();
    if (city) {
      startApp(city);
    }
  });

  getUserLocation();
};
