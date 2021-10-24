<?php
   if (isset($_POST["languages"])) {
      $language = $_POST["languages"];
      displayTitle($language);
   } else if (isset($_COOKIE["title_cookie"])) {
       echo $_COOKIE["title_cookie"];
   } else {
       echo "";
   }

  function displayTitle($language) {
      if ($language == "danish"){
          $info_dk_json = file_get_contents("././data/info_dk.json");
          $info_dk = json_decode($info_dk_json, true);
          setcookie("title_cookie", $info_dk["title"], time() + (86400 * 7));
          echo $info_dk["title"];
      } else if ($language == "english") {
          $info_eng_json = file_get_contents("././data/info_eng.json");
          $info_eng = json_decode($info_eng_json, true);
          setcookie("title_cookie", $info_eng["title"], time() + (86400 * 7));
          echo $info_eng["title"];
      }
  }
?>