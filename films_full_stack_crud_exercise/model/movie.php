<?php

    require_once("films_conn_db.php");
    
    class Movie {

        function searchMovies($filmInput) {
            $movie_db = new MovieDB();
            $connection = $movie_db->connect();

            if($connection) {
                $searched_films = array();
                $films_query = "SELECT title, release_date, runtime 
                FROM movie LIKE ?
                ORDER BY title";

                $films_exec = $connection->prepare($films_query);
                $films_exec->(['%' . $filmInput . '%']);
                while($row = $films_exec->fetch())
                    $searched_films[] = [$row["title"], $row["release_date"], $row["runtime"]]
                
                $films_exec = null;
                $movie_db->disconnect($connection);

                return $searched_films;
            } else {
                return false;
            }
        }

    }

    

?>