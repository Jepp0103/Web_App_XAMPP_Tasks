<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Calculator</title>
        <link rel="stylesheet" href="./css/calculator.css">
    </head>
    <body>
        <header>
            <h1>Tax calculator</h1>
        </header>
        <main>
            <div id="formDiv">
                <form method="post">
                    <label for="monetary_amount" id="monetary_amount_label">Monetary amount</label>
                    <br>
                    <input name="monetary_amount" id="monetary_amount" type="number" required>
                    <br><br>
                    <label for="tax_percentage" id="tax_percentage_label">Tax percentage</label>
                    <br>
                    <input name ="tax_percentage" id="tax_percentage" type="number" required>
                    <br><br>
                    <input type="submit" class="button" name="calcBtn" id="calcBtn" value="Calculate"></button>
                </form>
            </div>
            <br>
            <div id="resultDiv">
                <p>Tax amount:
                    <span id="taxAmount">
                        <?php  ?>
                    </span>
                </p>
                <p>Final amount:
                    <span id="finalAmount">
                    </span>
                </p>
            </div>
            </div>
        </main>
        <footer>
            <p id="copyrightText">&#169; 2021 Jeppe Nannestad Dyekjaer</p>
        </footer>
    </body>
    <?php include "./backend/tax_calculator_backend.php" ?>
</html>