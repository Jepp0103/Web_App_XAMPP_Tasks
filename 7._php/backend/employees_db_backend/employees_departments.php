<?php
    include "employees_db.php";

    $departments_query = <<<"SQL"
                            SELECT dept_name, CONCAT(e.last_name, ', ', e.first_name) AS manager 
                            FROM departments de 
                                LEFT JOIN dept_manager d ON de.dept_no = d.dept_no 
                                LEFT JOIN employees e ON d.emp_no = e.emp_no
                            SQL;
    $departments;

    if (isset($_GET["p"]) && $_GET["p"] === "name") {
        $departments_query .= " ORDER BY de.dept_name;";
        $departments = $pdo->query($departments_query);
        displayDepartments($departments);
    } else if (isset($_GET["p"]) && $_GET["p"] === "manager") {
        $departments_query .= " ORDER BY manager;";
        $departments = $pdo->query($departments_query);
        displayDepartments($departments);
    } else {
        $departments = $pdo->query($departments_query);
        displayDepartments($departments);
    }

    function displayDepartments($deps) {
        if ($deps != null) {
            while($department = $deps->fetch()) {
                echo<<<ROW
                    <tr>
                        <td>{$department["dept_name"]}</td>
                        <td>{$department["manager"]}</td>
                    </tr>
                ROW;
            }
        }
    }
?>