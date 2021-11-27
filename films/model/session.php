<?php
    class Session {
        function getSessionMail(){
            session_start();
            return $_SESSION["email"];
        }
    }
?>