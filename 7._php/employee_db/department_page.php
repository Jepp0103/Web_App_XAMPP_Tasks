<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../css/employee_db.css">
    <title>Employees - Employee db</title>
</head>
<body>
    <nav>
        <a href="./department_page.php">Departments</a>
        <a href="./employee_page.php">Employees</a>
    </nav>
    <header>
        <h1>Employee Database</h1>
        <h4>Departments</h4>
    </header>
    <section>
        <table>
            <tr>
                <th>Name</th>
                <th>Manager</th>
            </tr>
            <tr>
                <?php
                    include "../backend/employees_db_backend/employees_departments.php";
                ?>
            </tr>
        </table>
    </section>
</body>
</html>