<?php

    require_once 'api/md2html.php';

    use Product\ApiTester;
    use \PHPUnit\Framework\TestCase;

    class MarkdownToHtmlTest extends TestCase {

        public function testIsOlTrue() { //Write test keyword in front of the method name
            $text = '6. Hello there'; // Arrange
            $result = isOL($text); // Act
            $this->assertEquals(true, $result, "Actual: $text");   // Assert
        }

        public function testIsOlFalse(){
            $text = 'Hello there'; // Arrange
            $result = isOL($text); // Act
            $this->assertEquals(false, $result, "Actual: $text");   // Assert
        }

        public function testIsOlFails(){
            $text = 'Hello there'; // Arrange
            $result = isOL($text); // Act
            $this->assertEquals(true, $result, "Actual: $text");   // Assert
        }

        public function testReplaceByHtmlTagsStrong() {
            $text = "I just love **bold text**."; //Arrange
            $result = replaceByHTMLTags($text, '**', 'strong');
            $this->assertEquals("I just love <strong>bold text</strong>.", $result, "Actual: $result");
        }

        public function testReplaceByHtmlTagsEm() {
            $text = "I just love *em text*.";
            $result = replaceByHTMLTags($text, '*', 'em');
            $this->assertEquals("I just love <em>em text</em>.", $result, "Actual: $result");
        }

        public function testReplaceImages() {
            $text = "![Tux, the Linux mascot](/assets/images/tux.png)";
        }
    }

?>