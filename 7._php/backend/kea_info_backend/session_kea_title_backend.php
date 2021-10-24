<?php
   session_start();
   
   if (isset($_POST["languages"])) {
      $language = $_POST["languages"];
      displayTitle($language);
   } else if (isset($_SESSION["title_session"])) {
       echo $_SESSION["title_session"];
   } else {
       echo "";
   }

  function displayTitle($language) {
      if ($language == "danish"){
          $info_dk_json = file_get_contents("././data/info_dk.json");
          $info_dk = json_decode($info_dk_json, true);
          $_SESSION["title_session"] = $info_dk["title"];
          echo $info_dk["title"];
      } else if ($language == "english") {
          $info_eng_json = file_get_contents("././data/info_eng.json");
          $info_eng = json_decode($info_eng_json, true);
          $_SESSION["title_session"] = $info_eng["title"];
          echo $info_eng["title"];
      }
  }
?>