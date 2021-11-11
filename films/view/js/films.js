$(document).ready(function () {
    $("#searchMovieBtn").click(function () {
        searchFilms()
    })
})

function searchFilms() {
    $(".movieResults").empty()
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
            .append($("<tr></tr>").attr("class", "movieResults")
                .append("<td>" + data[i].title + "</td>")
                .append("<td>" + data[i].release_date + "</td>")
                .append("<td>" + data[i].runtime + "</td>")
            )
    }
}

