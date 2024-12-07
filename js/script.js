var searchInput = document.querySelector("#locInput");

searchInput.addEventListener("input", function () {
  function search() {
    var apiKey = "688ea4f7a9ba4ec9b2a234047240612";
    var query = searchInput.value;

    fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${query}&days=3`
    )
      .then(function (res) {
        return res.json();
      })
      .then(function (data) {
        
        document.getElementById("day1").innerHTML = data.forecast.forecastday[0].date;
        document.getElementById("date1").innerHTML = new Date(data.forecast.forecastday[0].date).toLocaleDateString();
        document.getElementById("location1").innerHTML = data.location.name;
        document.getElementById("temp1").innerHTML = data.forecast.forecastday[0].day.avgtemp_c + "°C";

        document.getElementById("weatherIcon1").src = "http://" + data.current.condition.icon;
        document.getElementById("weatherDesc1").innerHTML = data.current.condition.text;
        document.getElementById("humidity1").innerHTML = data.current.humidity + "%";
        document.getElementById("precip1").innerHTML = data.current.precip_mm + " mm"; 

        document.getElementById("day2").innerHTML = data.forecast.forecastday[1].date;
        document.getElementById("weatherIcon2").src = "http://" + data.forecast.forecastday[1].day.condition.icon;
        document.getElementById("temp2").innerHTML = data.forecast.forecastday[1].day.avgtemp_c + "°C";

        var wind2Value = data.forecast.forecastday[1].day.maxwind_kph || "N/A";
        document.getElementById("wind2").innerHTML = wind2Value + " km/h";

        var precip2Value = data.forecast.forecastday[1].day.totalprecip_mm || "N/A";
        document.getElementById("precip2").innerHTML = precip2Value + " mm";

        document.getElementById("day3").innerHTML = data.forecast.forecastday[2].date;
        document.getElementById("weatherIcon3").src = "http://" + data.forecast.forecastday[2].day.condition.icon;
        document.getElementById("temp3").innerHTML = data.forecast.forecastday[2].day.avgtemp_c + "°C";

        var wind3Value = data.forecast.forecastday[2].day.maxwind_kph || "N/A";
        document.getElementById("wind3").innerHTML = wind3Value + " km/h";

        var precip3Value = data.forecast.forecastday[2].day.totalprecip_mm || "N/A";
        document.getElementById("precip3").innerHTML = precip3Value + " mm";

        document.getElementById("weatherDesc2").innerHTML = data.forecast.forecastday[1].day.condition.text;
        document.getElementById("weatherDesc3").innerHTML = data.forecast.forecastday[2].day.condition.text;
      })
      
  }
  
  search();
});



document.querySelector("#contact").addEventListener("click" , function(){
    document.querySelector(".contact").classList.replace("d-none" , "d-block")
    document.querySelector(".body").classList.add("d-none")
})

document.querySelector("#home").addEventListener("click" , function(){
    document.querySelector(".contact").classList.remove( "d-block")
    document.querySelector(".contact").classList.add("d-none")

    document.querySelector(".body").classList.remove("d-none")
    document.querySelector(".body").classList.add("d-block")
})