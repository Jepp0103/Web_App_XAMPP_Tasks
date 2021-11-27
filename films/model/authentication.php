<?php

    require_once("films_conn_db.php");

    class Authentication {

        function validateIfUserExists($emailInput, $passwordInput){
            $movie_db = new MovieDB();
            $connection = $movie_db->connect();

            if($connection) {
                $user_query = <<<'SQL'
                    SELECT user_id, pwd, first_name, last_name FROM user 
                        WHERE email = ?;
                    SQL;

                $user_exec = $connection->prepare($user_query);
                $user_exec->execute([$emailInput]);
                $user_array = $user_exec->fetch();
                
                if(!empty($user_array)){
                    $stored_hash_pwd = $user_array["pwd"];
                    $user_exec = null;
                    $movie_db->disconnect($connection);

                    if (password_verify($passwordInput, $stored_hash_pwd)) {
                        session_start();
                        $_SESSION["user_id"] = $user_array["user_id"]; //Setting session
                        $_SESSION["email"] = $emailInput;
                        $_SESSION["first_name"] = $user_array["first_name"];
                        $_SESSION["last_name"] = $user_array["last_name"];
                        return true;
                    } else {
                        return false;
                    }
                } else {
                    return false;
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
            } else {
                return false;
            }
        }

        function logout() {
            session_start();
            session_destroy();
            echo json_encode("Logged out");
        }
    }

?>