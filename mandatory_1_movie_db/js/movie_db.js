
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


    // if (inputMovieTitle)
    let regNumExp = /\d{4}/;
    // let inputMovieYear = inputMovieTitle.match(regNumExp)[0]; //Getting the first 4 digits in search input with regex

    // let yearParam = "&page=1&include_adult=false&year=" + inputMovieYear;

    // console.log("input movie year", inputMovieYear)



    // if (inputMovieYear.length === 4) {
    //     $.post(baseUrl + apiKey + titleParam + yearParam, function (data) {
    //         console.log("movie api data:", data)
    //     });
    // } else {
    $.post(baseUrl + apiKey + titleParam, function (data) {
        console.log("movie api data without year:", data)
    });
    // }


}

function appendMovieData() {

}
