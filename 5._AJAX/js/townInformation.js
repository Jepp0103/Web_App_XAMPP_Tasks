$(document).ready(function () {
    getWeatherAPI();
});

function getWeatherAPI() {
    console.log("working)==")
    $("#townBtn").click(function () {
        let city_name = $("#cityInput").val();
        console.log(city_name)
        let url = "http://api.openweathermap.org/data/2.5/weather?q=" + city_name + "";
        console.log(url)
        $.get(url, function (data) {
            console.log(data)
        })

    })
}

function getMapAPI() {

}

function getEventAPI() {

}