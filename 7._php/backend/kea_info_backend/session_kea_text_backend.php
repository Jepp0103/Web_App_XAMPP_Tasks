<?php 
    // session_start(); have understood the concept, can't create two sessions

    if (isset($_POST["languages"])) {
        $language = $_POST["languages"];
        displayText($language);
    } else if (isset($_SESSION["text_session"])) {
        echo $_SESSION["text_session"]; //Echoing stored session if page is opened on new.
    } else {
        echo "";
    }

    function displayText($language) {
        if ($language == "danish"){
            $info_dk_json = file_get_contents("././data/info_dk.json");
            $info_dk = json_decode($info_dk_json, true);
            $_SESSION["text_session"]=$info_dk["text"]; //Setting session
            echo $info_dk["text"];
        } else if ($language == "english") {
            $info_eng_json = file_get_contents("././data/info_eng.json");
            $info_eng = json_decode($info_eng_json, true);
            $_SESSION["text_session"]=$info_eng["text"]; //Setting session
            echo $info_eng["text"];
        }
    }
?>