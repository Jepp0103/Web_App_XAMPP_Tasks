<?php
    include "films_db.php";

    getSearchedMovies();

    function getSearchedMovies() {
        if(isset($_POST["filmTitleInput"]) && $_POST["filmTitleInput"] != null && $_POST["filmTitleInput"]!= "") {
            $film_input_title = $_POST["filmTitleInput"];

            $films_query = <<<"SQL"
                                SELECT title, release_date, runtime
                                FROM movie
                            SQL;

            $films_exec = $pdo->query($films_query);

            echo json_encode("here");


            // $films_data = $films_exec->fetch();
            // echo json_encode($films_data);
        }
    }
        // $departments_query .= " ORDER BY de.dept_name;";
        // $departments = $pdo->query($departments_query);

        // $departments_query .= " ORDER BY manager;";
        // $departments = $pdo->query($departments_query);
        // $departments = $pdo->query($departments_query);
?>