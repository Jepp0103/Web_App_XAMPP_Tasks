getFilms()

function getFilms() {
    const filmsEndpoint = "http://localhost/web_app_xampp_tasks/Films_full_stack_crud_exercise/model/films.php";
    $.ajax({
        url: filmsEndpoint,
        type: "GET",
        dataType: "json",
        processData: false,
        contentType: false
    }).done(function (data) {
        displayMovies(data)
    })
}

function displayMovies(data) {
    console.log("films data:", data)

    for (let i = 0; i < data.length; i++) {
        $("#moviesTable")
            .append($("<tr></tr>")
                // .append("<td>" + data[i].title + "</td>")
                // .append("<td>" + data[i].release_date + "</td>")
                // .append("<td>" + data[i].runtime + "</td>")
            )
    }
}

