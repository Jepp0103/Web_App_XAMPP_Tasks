<?php
    require_once('md2html.php');

    if (!isset($_POST['markdown']) || trim($_POST['markdown']) === '') {
        echo '<span style="color: red">No code to convert.</span>';
    } else {
        echo markdown2html($_POST['markdown']);
    }
?>