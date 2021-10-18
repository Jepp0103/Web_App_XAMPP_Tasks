<?php
    if(array_key_exists('calcBtn', $_POST)) {
        $monetaryAmount = $_POST["monetary_amount"];
        $taxPercentage = $_POST["tax_percentage"];

        echo calculateTaxAmount($monetaryAmount, $taxPercentage);
    }

    function calculateTaxAmount($monetaryAmount, $taxPercentage) {
        echo "Monetary amount:" . $monetaryAmount . "<br>";
        echo "Tax percentage:". $taxPercentage;
        $taxAmount = $monetaryAmount * ($taxPercentage * 0.01);
        echo $taxAmount;
    }
    
?>