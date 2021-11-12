<?php   
    require_once("movie.php");
    
    $movie = new Movie();

    switch($_POST["action"]) {
        case "search":
            echo json_encode($movie->searchMovies($_POST["film_search_text"]));
            break;
        case "add":
            $movie->addMovie($_POST["title_input"], $_POST["overview_input"], $_POST["date_input"], $_POST["runtime_input"]);
            break;
        case "delete":
            $movie->deleteMovie($_POST["movie_id"]);
            break;
    }
    
?>