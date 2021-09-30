$(document).ready(function () {
    getWeatherAPI();
});

function getWeatherAPI() {
    $("#townBtn").click(function () {
        let cityName = $("#cityInput").val();
        let weatherUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=7b465694a9d40b359790061668d4c801";
        $.get(weatherUrl, function (data) {
            $(".weatherMapSection").remove() //Removing the class section before appending a new one.

            $("main")
                .append($("<section></section>").attr("class", "weatherMapSection")
                    .append($("<div></div>")
                        .append($("<h1></h1>").text(data.name + ", " + data.sys.country))
                        .append($("<b></b>").text(data.weather[0].main))
                        .append($("<p></p>").text((data.main.temp / 10).toFixed(2) + "°C (feels like " + (data.main.feels_like / 10).toFixed(2) + " °C)"))
                        .append($("<p></p>").text("Humidity: " + data.main.humidity + "%"))
                        .append($("<p></p>").text("Wind speed: " + data.wind.speed + " m/s"))
                    )
                );

            console.log("weather data", data)
        });

        // let mapUrl = "https://api.mapbox.com/directions/v5/mapbox/driving-traffic/151.2073, -33.8679";
        // $.get(mapUrl, function (data) {
        //     console.log("map data", data)
        // })
    });
}

function getMapAPI() {

}

function getEventAPI() {

}