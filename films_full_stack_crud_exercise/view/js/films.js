searchFilms()

function searchFilms() {
    $("#searchMovieBtn").click(function () {
        const filmSearchText = $("#filmTitleInput").val()
        console.log("filmSearchText", filmSearchText)
        filmSearchText.empty()
        if (filmSearchText != null || filmSearchText != "") {
            console.log("getting here??")
            const filmsEndpoint = "http://localhost/web_app_xampp_tasks/Films_full_stack_crud_exercise/model/main.php";

            $.ajax({
                url: filmsEndpoint,
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
        }
    })
}

function displayMovies(data) {
    console.log("films data:", data)

    for (let i = 0; i < data.length; i++) {
        $("#moviesTable")
            .append($("<tr></tr>")
                .append("<td>" + data[i].title + "</td>")
                .append("<td>" + data[i].release_date + "</td>")
                .append("<td>" + data[i].runtime + "</td>")
            )
    }
}

