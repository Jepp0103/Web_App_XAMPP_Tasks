<?php 
    if ($_SESSION["user"] !== null) {
        include('header.html');
        
        include('films_page.html');
        
        include('footer.html'); 
    } else {
        header("Location: http://localhost/web_app_xampp_tasks/films/view/login_page.php?"); 
    }
?>