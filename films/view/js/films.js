
$(document).ready(function () {
    const filmsEndpoint = "http://localhost/web_app_xampp_tasks/films/model/main.php"

    $("#searchMovieBtn").off().click(function () { //If button is fires multiple times use undbind method
        searchMovies(filmsEndpoint)
    })

    $("#newMovieBtn").off().click(function () {
        $("#filmsModal").css("display", "block")
        $(".modalFooter")
            .prepend($("<button></button>").attr("id", "addFilmBtn").text("Add film"))
        addMovie(filmsEndpoint)
    })
})

function searchMovies(filmsEndpoint) {
    $(".movieResults").remove()
    const filmSearchText = $("#filmSearchText").val()
    if (filmSearchText !== null || filmSearchText !== "") {
        $.ajax({
            url: filmsEndpoint,
            type: "POST",
            data: {
                action: "search",
                film_search_text: filmSearchText
            },
            dataType: "json"
        }).done(function (data) {
            displayMovies(data, filmsEndpoint)
        })
    } else {
        alert("Invalid input.")
    }
}

function displayMovies(data, filmsEndpoint) {
    for (let i = 0; i < data.length; i++) {
        $("#moviesTable")
            .append($("<tr></tr>").attr("class", "movieResults").attr("id", data[i].movie_id)
                .append("<td>" + data[i].title + "</td>")
                .append("<td>" + data[i].release_date + "</td>")
                .append("<td>" + data[i].runtime + "</td>")
                .append($("<button></button>").text("D").attr("class", "delBtn"))
                .append($("<button></button>").text("E").attr("class", "editBtn"))
                .append($("<button></button>").text("I").attr("class", "infBtn"))
            )
    }
    deleteMovie(filmsEndpoint) //Calling delete function after movies are displayed.

    getMovie(filmsEndpoint)
}

function closeModal() {
    $(".close").click(function () {
        $("#addFilmBtn").remove()
        $("#editFilmBtn").remove()
        $("#filmsModal").css("display", "none")
    })
}

function addMovie(filmsEndpoint) {
    $("#addFilmBtn").off().click(function () {
        const titleInput = $("#titleInput").val()
        const overviewInput = $("#overviewTextArea").val()
        const dateInput = $("#dateInput").val()
        const runtimeInput = $("#runtimeInput").val()
        const directorsInput = $("#directorsTextArea").val()
        const actorsInput = $("#actorsTextArea").val()
        $.ajax({
            url: filmsEndpoint,
            type: "POST",
            data: {
                action: "add",
                title_input: titleInput,
                overview_input: overviewInput,
                date_input: dateInput,
                runtime_input: runtimeInput,
                directors_input: directorsInput,
                actorsInput: actorsInput
            },
            dataType: "json"
        }).done(function (data) {
            console.log(data)
            $("#filmsModal").css("display", "none")
        })
    })
}

function deleteMovie(filmsEndpoint) {
    $(".delBtn").off().click(function () {
        $(this).parent().remove() //Removes the element in the front end.
        const movieId = $(this).parent().attr("id")
        $.ajax({
            url: filmsEndpoint,
            type: "POST",
            data: {
                action: "delete",
                movie_id: movieId
            },
            dataType: "json"
        }).done(function (data) {
            console.log(data)
        })
    })
}

function getMovie(filmsEndpoint) {
    $(".editBtn").off().click(function () {
        console.log("getting movie")
        $("#filmsModal").css("display", "block")
        $(".modalFooter")
            .prepend($("<button></button>").attr("id", "editFilmBtn").text("Edit film")
            )
        const movieId = $(this).parent().attr("id")
        $.ajax({
            url: filmsEndpoint,
            type: "POST",
            data: {
                action: "get_movie",
                movie_id: movieId,
            },
            dataType: "json"
        }).done(function (data) {
            console.log(data)
            console.log(data.title)
            $("#titleInput").val(data.title)
            $("#overviewTextArea").val(data.overview)
            $("#dateInput").val(data.release_date)
            $("#runtimeInput").val(data.runtime)
            $("#dateInput").val(data.release_date)
            $("#actorsTextArea").val("Not implemented yet.")
            $("#directorsTextArea").val("Not implemented yet.")

            updateMovie(filmsEndpoint)
        })
        closeModal()
    })
}

function updateMovie(filmsEndpoint) {
    const titleInput = $("#titleInput").val()
    const overviewInput = $("#overviewTextArea").val()
    const dateInput = $("#dateInput").val()
    const runtimeInput = $("#runtimeInput").val()
    const directorsInput = $("#directorsTextArea").val()
    const actorsInput = $("#actorsTextArea").val()
    $.ajax({
        url: filmsEndpoint,
        type: "POST",
        data: {
            action: "update",
            movie_id: movieId,
            title_input: titleInput,
            overview_input: overviewInput,
            date_input: dateInput,
            runtime_input: runtimeInput,
            directors_input: directorsInput,
            actorsInput: actorsInput
        },
        dataType: "json"
    }).done(function (data) {
        console.log(data)
    })
}

