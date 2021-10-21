<?php
    $fromUnit;
    $toUnit;
    $convertNumber;
    $resultNumber;

    if (isset($_POST["fromConv"]) && isset($_POST["toConv"]) && isset($_POST["convertNumber"])) {
        $convertNumber = strval($_POST("convertNumber"));
        $fromUnit = $_POST["fromConv"]; //Setting chosen units in dropdown globally in order to do the calculation
        $toUnit = $_POST["toConv"];
        calculateTemperatureConversion($fromUnit, $toUnit, $convertNumber);
    }

    function calculateTemperatureConversion($fromUnit, $toUnit, $convertNumber) {
        switch ([$fromUnit, $toUnit]) {
            case ["Celcius", "Fahrenheit"]:
                $resultNumber = $convertNumber * 1.8 + 32;
                echo "<p>". $fromUnit . "°C = " . $toUnit . "°F </p>";
                break;
            default:
                echo "Could not convert the values.";
        }
        echo "<br>";
        echo $fromUnit;
        echo "<br>";
        echo $toUnit;
    }

    // if (array_key_exists('calcTempBtn', $_POST)) {
    //     echo "ss";

        
    //     if ($_POST["from_cel"]) {
    //         $fromUnit = "°C";
    
    //     }

        
    //     if (isset($_POST["to_fahr"])) {
    //         $toUnit = "°F";
    //         echo "to unit" . $toUnit;
    //     }
    // }

?>