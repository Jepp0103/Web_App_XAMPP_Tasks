<?php 
    $info_dk_file = file_get_contents("./data/info_dk.json");

    $info_eng_file = file_get_contents("./data/info_eng.json");
    
    $info_dk = json_decode($info_dk_file, true);

    echo json_encode($info_dk);
    echo "<br>";
    // echo $info_eng;

?>