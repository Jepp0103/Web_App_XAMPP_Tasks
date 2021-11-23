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
            $text = "I just love *em text*."; // Arrange
            $result = replaceByHTMLTags($text, '*', 'em'); // Act 
            $this->assertEquals("I just love <em>em text</em>.", $result, "Actual: $result"); // Assert
        }

        public function testReplaceImages() {
            $imageText = "![Duck](../assets/duck.png)"; // Arrange
            $result = replaceImages($imageText); // Act
            $this->assertEquals("<img src=\"../assets/duck.png\" alt=\"Duck\">", $result, "Actual: $result");
        }

        public function testReplaceUrls() {
            $urlText = "[Duck Duck Go](https://duckduckgo.com)";
            $result = replaceURLs($urlText);
            $this->assertEquals("<a href=\"https://duckduckgo.com\" target=\"_blank\" title=\"Duck Duck Go\">Duck Duck Go</a>", $result, "Actual: $result");
        }

        public function testReplaceUrlsFailure() {
            $urlText = "[Duck Duck Go](https://duckduckgo.com)";
            $result = replaceURLs($urlText);
            $this->assertEquals("<a href=\"https://duckduckgo.com\">Duck Duck Go</a>", $result, "Actual: $result");
        }

        // public function testMarkdown2Html() {
        //     $code = "![Duck](../assets/duck.png)" + 
        //             "[Duck Duck Go](https://duckduckgo.com)";
        //     $result = markdown2html($code);
        //     $this->assertEquals("<img src=\"../assets/duck.png\" alt=\"Duck\"><a href=\"https://duckduckgo.com\">Duck Duck Go</a>", $result, "Actual: $result");
        // }

        public function testMarkdown2HtmlFailure() {
            $code = "![Duck](../assets/duck.png)" + 
                    "[Duck Duck Go](https://duckduckgo.com)";
            $result = markdown2html($code);
            $this->assertEquals("<img src=\"../assets/duck.png\" alt=\"Duck\"><a href=\"https://duckduckgo.com\">Duck Duck Go</a>", $result, "Actual: $result");
        }
    }
?>