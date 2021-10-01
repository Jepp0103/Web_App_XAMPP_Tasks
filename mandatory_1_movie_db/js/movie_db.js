let apiKey = "40876da1f83f0c135767cb0b759c57f3";
let searchTypeClickCount = 0;

$(document).ready(function () {
    $("#personSearchType").click(function () { //Button to choose type of search - movies or people
        if (searchTypeClickCount % 2 === 0) {
            $("#personSearchType").text("Filter by movies")
            $("#movieInput").attr("placeholder", "Type name of personality")
            $("#movieBtn").remove();
            $("#movieSearch").append($("<button></button>").attr("id", "peopleBtn").text("Search for movie personalities"));
            clickSearchButtons();
        } else {
            $("#personSearchType").text("Filter by personalities")
            $("#movieInput").attr("placeholder", "Type movie or production year")
            $("#peopleBtn").remove();
            $("#movieSearch").append($("<button></button>").attr("id", "movieBtn").text("Search for movies"));
            clickSearchButtons();
        }
        searchTypeClickCount++;
    })
    clickSearchButtons();
});

function clickSearchButtons() {
    //Buttons for getting apis for people or movies
    $("#peopleBtn").click(function () {
        getPersonsApi();
    })

    $("#movieBtn").click(function () {
        getMoviesApi();
    })
}

function getMoviesApi() {
    let inputMovieTitle = $("#searchInput").val();
    console.log("input movie title", inputMovieTitle)
    let baseUrl = "https://api.themoviedb.org/3/search/movie/?api_key=";
    let titleParam = "&language=en-US&query=" + inputMovieTitle;
    let regNumExp = /\d{4}/;

    if (regNumExp.test(inputMovieTitle)) {
        let inputMovieYear = inputMovieTitle.match(regNumExp)[0]; //Getting the first 4 digits in search input with regex
        let yearParam = "&page=1&include_adult=false&year=" + inputMovieYear;
        console.log("input movie year", inputMovieYear)
        $.post(baseUrl + apiKey + titleParam + yearParam, function (data) {
            console.log("movie api data with year")
            displayMovieData(data)
        });
    } else {
        $.post(baseUrl + apiKey + titleParam, function (data) {
            console.log("movie api data without year")
            displayMovieData(data)
        });
    }
}

function getPersonsApi() {
    let inputPersonName = $("#searchInput").val();
    let baseUrl = "https://api.themoviedb.org/3/search/person/?api_key=";
    let personNameParam = "&language=en-US&query=" + inputPersonName;

    $.post(baseUrl + apiKey + personNameParam, function (data) {
        displayPersonsData(data);
    });
}

function displayPersonsData(data) {
    console.log("persons display data", data)
    $("#displayedData").remove(); //Removes already displayed data before appending new ones
    $("main").append($("<section><section>").attr("id", "displayedData"));

    for (let i = 0; i < data.results.length; i++) { //Iterating through the persons data list.
        $("#displayedData")
            .append($("<div></div>")
                .append("<p>" + data.results[i].name + "</p>")
                .append($("<img>").attr("src", "https://image.tmdb.org/t/p/original/" + data.results[i].profile_path).attr("class", "personImages"))
                .append("<p>" + data.results[i].known_for_department + "</p>")
            )
    }
}

function displayMovieData(data) {
    console.log("display data", data)
    $("#displayedData").remove(); //Removes already displayed data before appending new ones.
    $("main").append($("<section><section>").attr("id", "displayedData"));

    for (let i = 0; i < data.results.length; i++) { //Iterating through the movies data list.
        $("#displayedData")
            .append($("<div></div>")
                .append("<p>" + data.results[i].title + "</p>")
                .append($("<img>").attr("src", "https://image.tmdb.org/t/p/original/" + data.results[i].poster_path).attr("class", "movieImages"))
                .append("<p>" + data.results[i].release_date + "</p>")
                .append("<p>" + data.results[i].original_language + "</p>")
            )
    }
}

