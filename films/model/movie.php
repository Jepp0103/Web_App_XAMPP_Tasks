<?php
    require_once("films_conn_db.php");

    class Movie {

        function searchMovies($filmsSearchText) {
            $movie_db = new MovieDB();
            $connection = $movie_db->connect();

            if($connection) {
                $searched_films = array();

                $films_query = <<<'SQL'
                                SELECT DISTINCT movie_id, title, release_date, runtime 
                                    FROM movie 
                                        WHERE title LIKE ?
                                        ORDER BY title;
                                SQL;
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

        function addMovie($titleInput, $overViewInput, $releaseDateInput, $runtimeInput){
            $movie_db = new MovieDB();
            $connection = $movie_db->connect();

            if($connection) {
                $insertion_query = <<<'SQL'
                                        INSERT INTO movie (title, overview, release_date, runtime) 
                                            VALUES (?, ?, ?, ?);
                                        SQL;
                $insertion_exec = $connection->prepare($insertion_query);
                $insertion_exec->execute([$titleInput, $overViewInput, $releaseDateInput, $runtimeInput]);
                $insertion_exec = null;
                $movie_db->disconnect($connection);
                echo json_encode("Movie " .$titleInput. " added");
            } else {
                return false;
            }
        }

        function deleteMovie($movieId) { //A function where it is important to remove all child tables first before the actual table can be removed
            $movie_db = new MovieDB();
            $connection = $movie_db->connect();

            if($connection) {
                $deletion_query = <<<'SQL'
                            DELETE FROM movie_director 
                                WHERE movie_id = ?;
                            SQL;

                $deletion_exec = $connection->prepare($deletion_query);
                $deletion_exec->execute([$movieId]);

                $deletion_query = <<<'SQL'
                    DELETE FROM movie_cast WHERE movie_id = ?;
                SQL;
                $deletion_exec = $connection->prepare($deletion_query);
                $deletion_exec->execute([$id]);

                $deletion_query = <<<'SQL'
                    DELETE FROM movie WHERE movie_id = ?;
                SQL;
                $deletion_exec = $connection->pdo->prepare($deletion_query);
                $deletion_exec->execute([$id]);

                $deletion_exec = null;
                $movie_db->disconnect($connection);

                echo json_encode("Movie " .$movieId. " deleted");
            } else {
                return false;
            }
        }
    } 
?>