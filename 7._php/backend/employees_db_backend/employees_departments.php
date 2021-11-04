<?php
    include "employees_db.php";

    // $employees = $pdo->query("SELECT first_name, last_name FROM employees e INNER JOIN dept_manager d ON e.emp_no = d.emp_no");
    $departments = $pdo->query("SELECT dept_name, first_name, last_name FROM departments de INNER JOIN dept_manager d ON de.dept_no = d.dept_no INNER JOIN employees e ON d.emp_no = e.emp_no");

    if ($departments != null) {
        $departments_arr = array();
        $employees_arr = array();
        while($department = $departments->fetch()) {
            array_push($departments_arr, $department["dept_name"]);
            array_push($employees_arr, $department["first_name"], $department["last_name"]);
        }
        // echo "<td>";
            print_t($departments_arr)
        // echo "</td>";


        // echo "<td>";
            print_t($employees_arr)

        // echo "</td>";


    }




?>