<?php   
    require_once("movie.php");
    require_once("session.php");
    require_once("authentication.php");

    $movie = new Movie();
    $authentication = new Authentication();
    $session = new Session();

    switch($_POST["action"]) {
        case "search":
            echo json_encode($movie->searchMovies($_POST["film_search_text"]));
            break;
        case "add":
            $movie->addMovie($_POST["title_input"], $_POST["overview_input"], $_POST["date_input"], $_POST["runtime_input"]);
            echo json_encode("Movie " .$_POST["title_input"]. " added");
            break;
        case "delete":
            $movie->deleteMovie($_POST["movie_id"]);
            echo json_encode("Movie " .$movieId. " deleted");
            break;
        case "get_movie":
            echo json_encode($movie->getMovie($_POST["movie_id"]));
            break;
        case "update":
            $movie->updateMovie($_POST["movie_id"], $_POST["title_input"], $_POST["overview_input"], $_POST["date_input"], $_POST["runtime_input"]);
            echo json_encode("Movie " .$movieId. " updated");
            break;
        case "add_user":
            $authentication->addUser($_POST["firstname_input"], $_POST["last_name_input"], $_POST["email_input"], $_POST["password_input"]);
            echo json_encode("User " .$_POST["firstname_input"]." ".$_POST["last_name_input"]. " added");
            break;
        case "validate_user":
            echo json_encode($authentication->validateIfUserExists($_POST["email_input"], $_POST["password_input"]));
            break;
        case "get_session":
            echo json_encode($session->getSessionMail());
            break;
        case "logout":
            $authentication->logout();
            break;
    }
    
?>