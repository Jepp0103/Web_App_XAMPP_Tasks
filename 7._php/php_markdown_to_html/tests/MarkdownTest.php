<?php

    require_once 'api/md2html.php';

    use Product\ApiTester;
    use \PHPUnit\Framework\TestCase;

    class MarkdownToHtmlTest extends TestCase {
        
        public function testIsOl() { //Write test keyword in front of the method name
            $text = '6. Hello there'; // Arrange
            $result = isOL($text); // Act
            $this->assertEquals(true, $result, "Expected $text");   // Assert
        }


    }

?>