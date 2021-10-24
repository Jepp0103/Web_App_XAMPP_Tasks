<?php 
    $path = "C:/xampp/htdocs/web_app_xampp_tasks/7._php/kea_info.php";

    setcookie("userName", "Jeppe", time() + (86400 * 7), $path);
    echo $_COOKIE["userName"];

    echo "<br>";

    if (isset($_POST["languages"])) {
        $language = $_POST["languages"];
        displayText($language);
    }

    function displayText($language) {
        if ($language == "danish"){
            $info_dk_json = file_get_contents("././data/info_dk.json");
            $info_dk = json_decode($info_dk_json, true);
            echo $info_dk["text"];
        } else if ($language == "english") {
            $info_eng_json = file_get_contents("././data/info_eng.json");
            $info_eng = json_decode($info_eng_json, true);
            echo $info_eng["text"];
        }
    }
?>