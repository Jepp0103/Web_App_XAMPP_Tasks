<?php
    $host = "localhost";
    $db = "films";
    $user = "root";
    $pwd = "password";
    $charset = "utf8mb4";

    $dsn = "mysql:host=$host;dbname=$db;charset=$charset";
    $options = [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
    ];

    try {
        $pdo = new PDO($dsn, $user, $pwd, $options);
    }
    catch (\PDOException $e) {
        echo $e -->getMessage();
    }
?>