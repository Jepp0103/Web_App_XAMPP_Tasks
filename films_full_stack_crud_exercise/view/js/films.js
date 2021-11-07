searchFilms()

function searchFilms() {
    $("#searchMovieBtn").click(function () {
        const filmTitleInput = $("#filmTitleInput").val()
        console.log("filmtitleinput", filmTitleInput)
        if (filmTitleInput != null || filmTitleInput != "") {
            console.log("getting here??")
            const filmsEndpoint = "http://localhost/web_app_xampp_tasks/Films_full_stack_crud_exercise/model/search_films.php";
            const form = new FormData();
            form.append("filmTitleInput", filmTitleInput);
            $.ajax({
                url: filmsEndpoint,
                type: "POST",
                data: form,
                dataType: "json",
                processData: false,
                contentType: false
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

