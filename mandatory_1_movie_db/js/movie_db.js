let apiKey = "40876da1f83f0c135767cb0b759c57f3";
let searchTypeClickCount = 0;

$(document).ready(function () {
    $("#searchTypeBtn").click(function () { //Button to choose type of search - movies or people
        if (searchTypeClickCount % 2 === 0) {
            $("#searchTypeBtn").text("Filter by movies")
            $("#searchInput").attr("placeholder", "Type name of personality")
            $("#movieBtn").remove();
            $("#searchSection").append($("<button></button>").attr("id", "peopleBtn").text("Search for movie personalities"));
            clickSearchButtons();
        } else {
            $("#searchTypeBtn").text("Filter by personalities")
            $("#searchInput").attr("placeholder", "Type movie or production year")
            $("#peopleBtn").remove();
            $("#searchSection").append($("<button></button>").attr("id", "movieBtn").text("Search for movies"));
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
    let baseUrl = "https://api.themoviedb.org/3/search/movie/?api_key=";
    let titleParam = "&language=en-US&query=" + inputMovieTitle;
    let regNumExp = /\d{4}/;

    if (regNumExp.test(inputMovieTitle)) { //Validating if input has year number in it
        let inputMovieYear = inputMovieTitle.match(regNumExp)[0]; //Getting the first 4 digits in search input with regex
        let yearParam = "&page=1&include_adult=false&year=" + inputMovieYear;
        $.post(baseUrl + apiKey + titleParam + yearParam, function (data) {
            displayMovieData(data)
        });
    } else {
        $.post(baseUrl + apiKey + titleParam, function (data) {
            displayMoviesData(data)
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
    $("#displayedData").empty(); //Removes already displayed data before appending new ones

    for (let i = 0; i < data.results.length; i++) { //Iterating through the persons data list.
        $("#displayedData")
            .append($("<div></div>").attr("class", "dataDivs").attr("id", "person" + i)
                .append("<p>" + data.results[i].name + "</p>")
                .append($("<img>").attr("src", "https://image.tmdb.org/t/p/original/" + data.results[i].profile_path).attr("class", "personImages"))
                .append("<p>" + data.results[i].known_for_department + "</p>")
            )
    }

    $(".dataDivs").click(function () {
        displayPersonDetails($(this).attr("id"), data);
    })
}

function displayMoviesData(data) {
    $("#displayedData").empty(); //Removes already displayed data before appending new ones.

    for (let i = 0; i < data.results.length; i++) { //Iterating through the movies data list.
        $("#displayedData")
            .append($("<div></div>").attr("class", "dataDivs").attr("id", "movie" + i)
                .append("<p>" + data.results[i].title + "</p>")
                .append($("<img>").attr("src", "https://image.tmdb.org/t/p/original/" + data.results[i].poster_path).attr("class", "movieImages"))
                .append("<p>" + data.results[i].release_date + "</p>")
                .append("<p>" + data.results[i].original_language + "</p>")
            );
    }

    $(".dataDivs").click(function () {
        displayMovieDetails($(this).attr("id"), data);
    })
}

function displayPersonDetails(personDivId, data) {
    let regIdExp = /\d+/;
    let personIdNumber = personDivId.match(regIdExp)[0];
    console.log("person data details", data.results[personIdNumber]);

    populateDialog();

    //Defining another person endpoint from the person api with more person info
    let personApiId = data.results[personIdNumber].id;
    let detailedPersonEndpoint = "https://api.themoviedb.org/3/person/" + personApiId + "?api_key=" + apiKey;

    $.get(detailedPersonEndpoint, function (detailedData) {
        console.log("Other person data", (detailedData));

        $("#detailsDialog")
            .empty()
            .append("<h3>" + data.results[personIdNumber].name + "</h3>")
            .append($("<img>").attr("src", "https://image.tmdb.org/t/p/original/" + data.results[personIdNumber].profile_path).attr("class", "personImages"))
            .append($("<p></p>").text("Main activity:").attr("class", "descriptionAttributes"))
            .append("<p>" + data.results[personIdNumber].known_for_department + "</p>")
            .append($("<p></p>").text("Biography:").attr("class", "descriptionAttributes"))
            .append("<p>" + detailedData.biography + "</p>")
            .append($("<p></p>").text("Homepage:").attr("class", "descriptionAttributes"))
            .append($("<a></a>").attr("href", detailedData.homepage).attr("class", "descriptionAttributes").text(detailedData.homepage))
            .append($("<p></p>").text("Birthday:").attr("class", "descriptionAttributes"))
            .append("<p>" + detailedData.birthday + "</p>")
            .append($("<p></p>").text("Birthplace:").attr("class", "descriptionAttributes"))
            .append("<p>" + detailedData.place_of_birth + "</p>")

        if (detailedData.deathday !== null) { //Adding day of decease if actor is dead
            $("#detailsDialog")
                .append($("<p></p>").text("Day of decease:").attr("class", "descriptionAttributes"))
                .append("<p>" + detailedData.deathday + "</p>")
        }

        //Appending actor movies
        $("#detailsDialog").append($("<p></p>").text("List of movies worked with:").attr("class", "descriptionAttributes"))
        for (let i = 0; i < data.results[personIdNumber].known_for.length; i++) {
            $("#detailsDialog").
                append("<p>" + data.results[personIdNumber].known_for[i].title + "</p>").
                append($("<li></li>").text("Release date: " + data.results[personIdNumber].known_for[i].release_date))
            //and the role the person performed
        }
        $("#detailsDialog").dialog('open');
    });
}

function displayMovieDetails(movieDivId, data) {
    let regIdExp = /\d+/;
    let movieIdNumber = movieDivId.match(regIdExp)[0];
    console.log("movie data details", data.results[movieIdNumber]);

    populateDialog();

    //Defining another movie endpoint from the movie api with more movie info
    let movieId = data.results[movieIdNumber].id;
    console.log("api id", movieId)
    let detailedMovieEndpoint = "https://api.themoviedb.org/3/movie/" + movieId + "?api_key=" + apiKey;
    let creditsEndpoint = "https://api.themoviedb.org/3/movie/" + movieId + "/credits?api_key=" + apiKey;

    $.get(detailedMovieEndpoint, function (detailedData) {
        console.log("Other movie data", (detailedData));

        $.get(creditsEndpoint, function (creditsData) {
            console.log("credits data", creditsData)
            $("#detailsDialog")
                .empty()
                .append($("<div></div>").attr("id", "generalMovieDiv")
                    .append($("<div></div")
                        .append("<h3>" + data.results[movieIdNumber].title + "</h3>")
                        .append($("<img>").attr("src", "https://image.tmdb.org/t/p/original/" + data.results[movieIdNumber].poster_path).attr("class", "movieImages")))
                    .append($("<div></div")
                        .append($("<p></p>").text("Release date:").attr("class", "descriptionAttributes"))
                        .append("<p>" + data.results[movieIdNumber].release_date + "</p>"))
                    .append($("<div></div")
                        .append($("<p></p>").text("Original language:").attr("class", "descriptionAttributes"))
                        .append("<p>" + data.results[movieIdNumber].original_language + "</p>"))
                    .append($("<div></div")
                        .append($("<p></p>").text("Runtime:").attr("class", "descriptionAttributes"))
                        .append("<p>" + detailedData.runtime + " minutes</p>"))
                    .append($("<div></div")
                        .append($("<p></p>").text("Website:").attr("class", "descriptionAttributes"))
                        .append($("<a></a>").attr("href", detailedData.homepage).text(detailedData.homepage)))
                )

            //Overview description
            $("#detailsDialog").append($("<p></p>").text("Overview:").attr("class", "descriptionAttributes"))
                .append("<p>" + data.results[movieIdNumber].overview + "</p>")

            //Appending div for genres and production companies
            $("#detailsDialog")
                .append($("<div></div>").attr("id", "genreProdListDiv")
                    .append($("<div></div>").attr("id", "genresDiv"))
                    .append($("<div></div>").attr("id", "productCompDiv"))
                );

            $("#genresDiv").append($("<p></p>").text("Genres:").attr("class", "descriptionAttributes"))
            for (let i = 0; i < detailedData.genres.length; i++) { //Appending genres
                $("#genresDiv").append("<li>" + detailedData.genres[i].name + "</li>")
            }

            $("#productCompDiv").append($("<p></p>").text("Production companies:").attr("class", "descriptionAttributes")); //Appending production companies
            for (let i = 0; i < detailedData.production_companies.length; i++) {
                $("#productCompDiv").append("<li>" + detailedData.production_companies[i].name + "</li>");
            }

            //Appending div for actors, directors, script writers, executive producers, producers and composers
            $("#detailsDialog")
                .append($("<div></div>").attr("id", "crewsDiv")
                    .append($("<div></div>").attr("id", "actorsDiv"))
                    .append($("<div></div>").attr("id", "directorsDiv"))
                    .append($("<div></div>").attr("id", "scriptWritersDiv"))
                    .append($("<div></div>").attr("id", "execProdDiv"))
                    .append($("<div></div>").attr("id", "prodDiv"))
                    .append($("<div></div>").attr("id", "compDiv"))
                );

            $("#actorsDiv") //Appending actors
                .append($("<p></p>").text("List of actors:").attr("class", "descriptionAttributes"))
                .append($("<ul></ul>").attr("class", "dialogScrollView"))
            for (let i = 0; i < creditsData.cast.length; i++) {
                $("#actorsDiv > ul")
                    .append($("<li>" + creditsData.cast[i].name + "</li>"));
            }

            //Appending directors
            $("#directorsDiv").append($("<p></p>").text("Directors:").attr("class", "descriptionAttributes"))
                .append($("<ul></ul>").attr("class", "dialogScrollView"))
            for (let i = 0; i < creditsData.crew.length; i++) {
                if (creditsData.crew[i].department === "Directing") {
                    $("#directorsDiv > ul")
                        .append($("<li>" + creditsData.crew[i].name + "</li>"));
                }
            }

            //Appending script writers
            $("#scriptWritersDiv").append($("<p></p>").text("Script writers:").attr("class", "descriptionAttributes"))
                .append($("<ul></ul>").attr("class", "dialogScrollView"))
            for (let i = 0; i < creditsData.crew.length; i++) {
                if (creditsData.crew[i].department === "Writing") {
                    $("#scriptWritersDiv > ul")
                        .append($("<li>" + creditsData.crew[i].name + "</li>"));
                }
            }

            //Appending executive producers
            $("#execProdDiv").append($("<p></p>").text("Executive producers:").attr("class", "descriptionAttributes"))
                .append($("<ul></ul>").attr("class", "dialogScrollView"))
            for (let i = 0; i < creditsData.crew.length; i++) {
                if (creditsData.crew[i].job === "Executive Producer") {
                    $("#execProdDiv > ul")
                        .append($("<li>" + creditsData.crew[i].name + "</li>"));
                }
            }

            //Appending producers
            $("#prodDiv").append($("<p></p>").text("Producers:").attr("class", "descriptionAttributes"))
                .append($("<ul></ul>").attr("class", "dialogScrollView"))
            for (let i = 0; i < creditsData.crew.length; i++) {
                if (creditsData.crew[i].department === "Production") {
                    $("#prodDiv > ul")
                        .append($("<li>" + creditsData.crew[i].name + "</li>"));
                }
            }

            //Appending music composers
            $("#compDiv").append($("<p></p>").text("Music composers:").attr("class", "descriptionAttributes"))
                .append($("<ul></ul>").attr("class", "dialogScrollView"))
            for (let i = 0; i < creditsData.crew.length; i++) {
                if (creditsData.crew[i].job === "Composer") {
                    $("#compDiv > ul")
                        .append($("<li>" + creditsData.crew[i].job + "</li>"));
                }
            }
        });
    });
    $("#detailsDialog").dialog('open');
}

function populateDialog() {
    $('#detailsDialog').dialog({
        autoOpen: false,
        modal: true,
        width: "80%",
        maxHeight: "80%",
        resizable: false,
        draggable: false
    });
}
