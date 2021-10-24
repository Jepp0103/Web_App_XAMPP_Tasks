<?php
   if (isset($_POST["languages"])) {
      $language = $_POST["languages"];
      displayTitle($language);
   }

  function displayTitle($language) {
      if ($language == "danish"){
          $info_dk_json = file_get_contents("././data/info_dk.json");
          $info_dk = json_decode($info_dk_json, true);
          echo $info_dk["title"];
      } else if ($language == "english") {
          $info_eng_json = file_get_contents("././data/info_eng.json");
          $info_eng = json_decode($info_eng_json, true);
          echo $info_eng["title"];
      }
  }
?>