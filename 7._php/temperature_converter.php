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
                <input type="number" id="convertNumber">
                <div id="convDiv">
                    <div id="fromDiv">
                        <label for="fromConv">From</label>
                        <br>
                        <select size="3" name="fromConv" id="fromConv">
                            <option id=from_cel>
                                Celcius
                            </option>
                            <option id="from_fahr">
                                Fahrenheit
                            </option>
                            <option id="from_kel">
                                Kelvin
                            </option>
                        </select>
                    </div>
                    <div id="toDiv">
                        <label for="toConv">To</label>
                        <br>
                        <select size="3" name="fromConv" id="toConv">
                            <option id="to_cel">
                                Celcius
                            </option>
                            <option id="to_fahr">
                                Fahrenheit
                            </option>
                            <option id="to_kel">
                                Kelvin
                            </option>
                        </select>
                    </div>
                </form>
            </div>
            <br>
            <button id="calcBtn">Calculate</button>
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