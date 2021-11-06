<?php
    include "films_db.php";

    $films_query = <<<"SQL"
                        SELECT title, release_date, runtime
                        FROM movies
                        SQL;


    $films_exec = $pdo->query($films_query);

    $films_data = $films_exec->fetch();


    // $departments_query .= " ORDER BY de.dept_name;";
    // $departments = $pdo->query($departments_query);

    // $departments_query .= " ORDER BY manager;";
    // $departments = $pdo->query($departments_query);
    // $departments = $pdo->query($departments_query);
    
    echo json_encode($films_data);

  
?>