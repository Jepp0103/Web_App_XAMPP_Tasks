<?php   
    require_once("movie.php");
    
    $movie = new Movie();


    switch($_POST["action"]) {
        case "search":
            echo json_encode($movie->searchMovies($_POST["film_search_text"]));
            break;
        case "add":
            echo json_encode("not yet implemented");
    }
    
?>