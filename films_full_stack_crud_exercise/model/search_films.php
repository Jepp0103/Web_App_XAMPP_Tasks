<?php
    include "films_db.php";

    getSearchedMovies();

    echo "helllo";


    function getSearchedMovies() {
        // if(isset($_POST["filmTitleInput"]) && $_POST["filmTitleInput"] != null && $_POST["filmTitleInput"]!= "") {
            $film_input_title = $_POST["filmTitleInput"];

            $films_query = <<<"SQL"
                            SELECT title, release_date, runtime
                            FROM movie WHERE title = $film_input_title
                            SQL;

            $films_exec = $pdo->query($films_query);
            $films_data = $films_exec->fetchAll();
            echo json_encode($films_data);
        // }
    }
        // $departments_query .= " ORDER BY de.dept_name;";
        // $departments = $pdo->query($departments_query);

        // $departments_query .= " ORDER BY manager;";
        // $departments = $pdo->query($departments_query);
        // $departments = $pdo->query($departments_query);
?>