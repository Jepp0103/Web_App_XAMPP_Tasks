<?php 
    session_start();
    if (isset($_SESSION["user_id"])) {
        include('header.html');
        include('films.html');
        include('footer.html'); 
    } else {
        header("Location: http://localhost/web_app_xampp_tasks/films/view/login_page.php?"); 
    }
?>