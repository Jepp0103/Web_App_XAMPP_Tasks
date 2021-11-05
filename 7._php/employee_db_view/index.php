<?php 
    include('header.php');
    
    if (isset($_GET['p']) && ($_GET['p'] === 'name' || $_GET["p"] === "manager")) {
        include('department_page.php');
    } else {
        include('employee_page.php');
    }
    
    include('footer.php'); 
?>