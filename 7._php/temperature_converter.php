<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Temperature converter</title>
    <link rel="stylesheet" href="./css/temperature_converter.css">
</head>

<body>
    <header>
        <h1>Temperature converter</h1>
    </header>
    <main>
        <div id="formDiv">
            <form method="post">
                <label for="convertNumber" id="convertNumberLabel">Convert</label>
                <br>
                <input name="convertNumber" type="number" id="convertNumber" required>
                <div id="convDiv">
                    <div id="fromDiv">
                        <label for="fromConv">From</label>
                        <br>
                            <select size="3" name="fromConv" id="fromConv" required>
                                    <option name="from_cel" id=from_cel>
                                        Celcius
                                    </option>
                                    <option id="from_fahr" name = "from_fahr">
                                        Fahrenheit
                                    </option>
                                    <option id="from_kel" name = "from_kel">
                                        Kelvin
                                    </option>
                            </select>
                    </div>
                    <div id="toDiv">
                        <label for="toConv">To</label>
                        <br>
                        <select size="3" name="toConv" id="toConv" required>
                            <option id="to_cel" name = "to_cel">
                                Celcius
                            </option>
                            <option id="to_fahr" name = "to_fahr">
                                Fahrenheit
                            </option>
                            <option id="to_kel" name = "to_kel">
                                Kelvin
                            </option>
                        </select>
                    </div>
                </div>
                <br>
                <input type="submit" class="button" name="calcTempBtn" id="calcBtn" value="Calculate"></button>
            </form>
            <br>
        </div>
    </main>
    <br>
    <div id="resultDiv">
        <?php 
            include "./backend/temperature_converter_backend.php";
        ?>
    </div>
    <br>
    <footer>
        <p id="copyrightText">&#169; 2021 Jeppe Nannestad Dyekjaer</p>
    </footer>
</body>

</html>