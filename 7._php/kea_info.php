<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./css/kea_info.css">
    <title>KEA info</title>
</head>
<body>
    <header>
        <h1>  
            <?php 
                include "./backend/kea_info_backend/kea_title_backend.php";
            ?>
        </h1>
        <form method="post">
            <select name="languages" id="languages" onchange="this.form.submit();">
                <option>Danish</option>
                <option>English</option>
                <option selected="selected">Choose language</option>
            </select>
        </form>
    </header>
    <main>
        <section>
            <?php
                include "./backend/kea_info_backend/kea_text_backend.php";
            ?>
        </section>
    </main>
</body>
</html>