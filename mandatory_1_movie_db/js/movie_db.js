
$(document).ready(function () {
    $("#movieBtn").click(function () {
        getMovieDbApi();
    })
});

function getMovieDbApi() {
    let inputMovieTitle = $("#movieInput").val();
    console.log("input movie title", inputMovieTitle)
    let baseUrl = "https://api.themoviedb.org/3/search/movie/?api_key=";
    let apiKey = "40876da1f83f0c135767cb0b759c57f3";
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

function displayMovieData(data) {
    console.log("display data", data)
    $("#displayedMovies").remove(); //Removes already displayed movies before appending new ones.
    $("main").append($("<section><section>").attr("id", "displayedMovies"));

    for (let i = 0; i < data.results.length; i++) { //Iterating through the movie list.
        // console.log("title:", data.results[i].title, "release year:", data.results[i].release_date, "language:", data.results[i].original_language);
        $("#displayedMovies")
            .append($("<div></div>")
                .append("<p>" + data.results[i].title + "</p>")
                .append($("<img>").attr("src", "https://image.tmdb.org/t/p/original/" + data.results[i].poster_path).attr("class", "movieImages"))
                .append("<p>" + data.results[i].release_date + "</p>")
                .append("<p>" + data.results[i].original_language + "</p>")
            )
    }
}
