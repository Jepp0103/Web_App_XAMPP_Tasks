<?php
    class MovieDB {
        public function connect() {
            $host = "localhost";
            $db = "films";
            $user = "root";
            $pwd = "password";
            $charset = "utf8mb4";

            $dsn = "mysql:host=$host;dbname=$db;charset=$charset";
            $options = [
                PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES   => false,
            ];

            try {
                $cnDB = new PDO($dsn, $user, $pwd, $options);
            }
            catch (\PDOException $e) {
                echo 'Connection unsuccessful';
                die('Connection unsuccessful: ' . $cnDB->connect_error());
                exit();
            }

            return($cnDB);   
        }

        public function disconnect($cnDB) {
            $cnDB = null;
        }
    }
?>