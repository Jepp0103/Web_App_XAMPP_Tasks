<?php
    require_once("films_conn_db.php");

    class Movie {

        function searchMovies($filmsSearchText) {
            $movie_db = new MovieDB();
            $connection = $movie_db->connect();

            if($connection) {
                $searched_films = array();

                $films_query = "SELECT title, release_date, runtime 
                                FROM movie 
                                    WHERE title LIKE ?
                                    ORDER BY title";
                $films_exec = $connection->prepare($films_query);
                $films_exec->execute(['%' . $filmsSearchText . '%']);

                $searched_films = $films_exec->fetchAll();

                $films_exec = null;
                $movie_db->disconnect($connection);

                return $searched_films;
            } else {
                return false;
            }
        }

        function addMovie(){
            
        }
    } 
?>