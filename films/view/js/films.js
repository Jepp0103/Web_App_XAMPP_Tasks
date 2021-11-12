$(document).ready(function () {
    $("#searchMovieBtn").off().click(function () { //If button is fires multiple times use undbind method
        searchFilms()
    })

    openModal()
})

function searchFilms() {
    $(".movieResults").remove()
    const filmSearchText = $("#filmSearchText").val()
    if (filmSearchText != null || filmSearchText != "") {
        $.ajax({
            url: "http://localhost/web_app_xampp_tasks/films/model/main.php",
            type: "POST",
            data: {
                action: "search",
                film_search_text: filmSearchText
            },
            dataType: "json"
        }).done(function (data) {
            console.log("Data:", data)
            displayMovies(data)
        })
    } else {
        alert("Invalid input.")
    }
}

function displayMovies(data) {
    console.log("films data:", data)

    for (let i = 0; i < data.length; i++) {
        $("#moviesTable")
            .append($("<tr></tr>").attr("class", "movieResults").attr("id", data[i].movie_id)
                .append("<td>" + data[i].title + "</td>")
                .append("<td>" + data[i].release_date + "</td>")
                .append("<td>" + data[i].runtime + "</td>")
            )
    }
}

function openModal() {
    $("#newMovieBtn").click(function () {
        $("#filmsModal").css("display", "block")
        addMovie()
    })

    $(".close").click(function () {
        $("#filmsModal").css("display", "none")
    })

}

function addMovie() {
    $("#addFilmBtn").off().click(function () {
        const titleInput = $("#titleInput").val()
        const overviewInput = $("#overviewTextArea").val()
        const dateInput = $("#dateInput").val()
        const runtimeInput = $("#runtimeInput").val()
        const directorsInput = $("#directorsTextArea").val()
        const actorsInput = $("#actorsTextArea").val()
        $.ajax({
            url: "http://localhost/web_app_xampp_tasks/films/model/main.php",
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

function deleteMovie() {

}

function updateMovie() {

}

