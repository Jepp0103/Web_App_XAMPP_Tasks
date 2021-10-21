<?php
    if (isset($_POST["fromConv"]) && isset($_POST["toConv"]) && isset($_POST["convertNumber"])) {
        $convertNumber = $_POST["convertNumber"];
        $fromUnit = $_POST["fromConv"]; //Setting chosen units in dropdown globally in order to do the calculation
        $toUnit = $_POST["toConv"];
        calculateTemperatureConversion($fromUnit, $toUnit, $convertNumber);
    }

    function calculateTemperatureConversion($fromUnit, $toUnit, $convertNumber) {
        switch ([$fromUnit, $toUnit]) {
            case ["Celcius", "Fahrenheit"]:
                $resultNumber = $convertNumber * 1.8 + 32;
                display($convertNumber, "°C", $resultNumber, "°F");
                break;
            case ["Celcius", "Kelvin"]:
                $resultNumber = $convertNumber + 273.15;
                display($convertNumber, "°C", $resultNumber, "K");
                break;
            case ["Fahrenheit", "Celcius"]:
                $resultNumber = ($convertNumber - 32) / 1.8;
                display($convertNumber, "°F", $resultNumber, "K");
                break;
            case ["Fahrenheit", "Kelvin"]:
                $resultNumber = ($convertNumber - 32) * 5 / 9 + 273.15;
                display($convertNumber, "°F", $resultNumber, "K");
                break;
            case ["Kelvin", "Celcius"]:
                $resultNumber = $convertNumber - 273.15;
                display($convertNumber, "K", $resultNumber, "°C");
                break;
            case ["Kelvin", "Fahrenheit"]:
                $resultNumber = ($convertNumber - 273.15) * 9 / 5 + 32;;
                display($convertNumber, "K", $resultNumber, "°F");
                break;
            default:
                echo "Could not convert the values.";
        }
    }

    display($convertNumber, $unitFrom, $resultNumber, $unitTo) {
        echo $convertNumber;
        echo "<br>";
        echo $unitFrom;
        echo "<br>";
        echo $resultNumber; 
        echo "<br>";
        echo $unitTo;
        echo "<br>";

        // echo "<p>{$convertNumber}{$unitFrom} = <b>{$resultNumber}{$unitTo}</b></p>";
        // echo "<p>" . $convertNumber . $unitFrom . " = <b> " . $resultNumber . $unitTo . "</b> </p>";
    }
?>