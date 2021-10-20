<?php
    if(array_key_exists('calcBtn', $_POST)) {
        $monetaryAmount = $_POST["monetary_amount"];
        $taxPercentage = $_POST["tax_percentage"];

        calculateTaxAndFinalAmount($monetaryAmount, $taxPercentage);
    }

    function calculateTaxAndFinalAmount($monetaryAmount, $taxPercentage) {
        $taxAmount = $monetaryAmount * ($taxPercentage * 0.01);
        $finalAmount = $monetaryAmount - $taxAmount;
        echo "<p>Tax amount: <span>" . $taxAmount . "</span> </p>";
        echo "<p>Final amount: <span>" . $finalAmount . "</span> </p>";
    }
    
?>