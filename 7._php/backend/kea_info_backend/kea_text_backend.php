<?php 
    if (isset($_POST["languages"])) {
        $language = $_POST["languages"];
        displayText($language);
    }

    function displayText($language) {
        if ($language == "Danish"){
            $info_dk_json = file_get_contents("././data/info_dk.json");
            $info_dk = json_decode($info_dk_json, true);
            echo $info_dk["text"];
        } else if ($language == "English") {
            $info_eng_json = file_get_contents("././data/info_eng.json");
            $info_eng = json_decode($info_eng_json, true);
            echo $info_eng["text"];
        }
    }
?>