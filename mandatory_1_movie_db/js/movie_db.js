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
    $('#detailsDialog').dialog({
        autoOpen: false
    });

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



        //biography,
        //link to the person’s website
        $("#detailsDialog").dialog('open');
    });
}

function displayMovieDetails(movieDivId, data) {
    let regIdExp = /\d+/;
    let movieIdNumber = movieDivId.match(regIdExp)[0];
    console.log("movie data details", data.results[movieIdNumber]);
    $('#detailsDialog').dialog({
        autoOpen: false
    });

    //Defining another movie endpoint from the movie api with more movie info
    let movieApiId = data.results[movieIdNumber].id;
    let detailedMovieEndpoint = "https://api.themoviedb.org/3/movie/" + movieApiId + "?api_key=" + apiKey;

    $.get(detailedMovieEndpoint, function (detailedData) {
        console.log("Other movie data", (detailedData));

        $("#detailsDialog")
            .empty()
            .append("<h3>" + data.results[movieIdNumber].title + "</h3>")
            .append($("<img>").attr("src", "https://image.tmdb.org/t/p/original/" + data.results[movieIdNumber].poster_path).attr("class", "movieImages"))
            .append($("<p></p>").text("Release date:").attr("class", "descriptionAttributes"))
            .append("<p>" + data.results[movieIdNumber].release_date + "</p>")
            .append($("<p></p>").text("Original language:").attr("class", "descriptionAttributes"))
            .append("<p>" + data.results[movieIdNumber].original_language + "</p>")
            .append($("<p></p>").text("Runtime:").attr("class", "descriptionAttributes"))
            .append("<p>" + detailedData.runtime + " minutes</p>")
            .append($("<p></p>").text("Overview:").attr("class", "descriptionAttributes"))
            .append("<p>" + data.results[movieIdNumber].overview + "</p>")
            .append($("<a></a>").attr("href", detailedData.homepage).attr("class", "descriptionAttributes").text("Visit web page here"))
            .append($("<p></p>").text("Genres:").attr("class", "descriptionAttributes"))

        for (let i = 0; i < detailedData.genres.length; i++) { //Appending genres
            $("#detailsDialog").append("<li>" + detailedData.genres[i].name + "</li>")
        }

        $("#detailsDialog").append($("<p></p>").text("Production companies:").attr("class", "descriptionAttributes")) //Appending production companies
        for (let i = 0; i < detailedData.production_companies.length; i++) {
            $("#detailsDialog").append("<li>" + detailedData.production_companies[i].name + "</li>")
        }

        // - List of actors. For each actor, his/her name and the name of their character will be shown
        // - List of directors
        // - List of script writers
        // - List of executive producers
        // - List of producers
        // - List of music composers
    });
    $("#detailsDialog").dialog('open');
}
