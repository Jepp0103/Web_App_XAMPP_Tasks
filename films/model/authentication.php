<?php

    require_once("films_conn_db.php");

    class Authentication {
        function validateIfUserExists($emailInput, $passwordInput){
            $movie_db = new MovieDB();
            $connection = $movie_db->connect();

            if($connection) {
                $pwd_query = <<<'SQL'
                    SELECT pwd FROM user 
                        WHERE email = ?;
                    SQL;

                $pwd_exec = $connection->prepare($pwd_query);
                $pwd_exec->execute([$emailInput]);
                $pwd_array = $pwd_exec->fetch();
                
                if(!empty($pwd_array)){
                    $stored_hash_pwd = $pwd_array["pwd"];
                    echo($stored_hash_pwd);

                    $pwd_exec = null;
                    $movie_db->disconnect($connection);

                    if (password_verify($passwordInput, $stored_hash_pwd)) {
                        session_start();
                        $_SESSION["user"] = $emailInput; //Setting session
                        echo json_encode(true);
                    } else {
                        echo json_encode(false);
                    }
                } else {
                    echo json_encode(false);
                }
            }
        }

        function addUser($firstNameInput, $lastNameInput, $emailInput, $passwordInput){
            $movie_db = new MovieDB();
            $connection = $movie_db->connect();

            $pwd = password_hash($passwordInput, PASSWORD_DEFAULT);

            if($connection) {
                $insertion_query = <<<'SQL'
                                        INSERT INTO user (first_name, last_name, email, pwd) 
                                            VALUES (?, ?, ?, ?);
                                        SQL;

                $insertion_exec = $connection->prepare($insertion_query);
                $insertion_exec->execute([$firstNameInput, $lastNameInput, $emailInput, $pwd]);
                $insertion_exec = null;
                $movie_db->disconnect($connection);
                echo json_encode("User " .$firstNameInput." ".$lastNameInput. " added");
            } else {
                return false;
            }
        }
    }

?>