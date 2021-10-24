<?php 

    if (isset($_POST["languages"])) {
        $language = $_POST["languages"];
        displayText($language);
    } else if (isset($_COOKIE["text_cookie"])) {
        echo $_COOKIE["text_cookie"];
    } else {
        echo "";
    }

    function displayText($language) {
        if ($language == "danish"){
            $info_dk_json = file_get_contents("././data/info_dk.json");
            $info_dk = json_decode($info_dk_json, true);
            setcookie("text_cookie", $info_dk["text"], time() + (86400 * 7));
            echo $info_dk["text"];
        } else if ($language == "english") {
            $info_eng_json = file_get_contents("././data/info_eng.json");
            $info_eng = json_decode($info_eng_json, true);
            setcookie("text_cookie", $info_eng["text"], time() + (86400 * 7));
            echo $info_eng["text"];
        }
    }
?>