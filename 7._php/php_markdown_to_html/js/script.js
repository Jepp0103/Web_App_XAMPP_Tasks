$(document).ready(function() {

    $('#btnConvert').on('click', function(e) {
        e.preventDefault();

        const markdownCode = $('#txtMarkdown').val();
        
        $.ajax({
            url: 'api/index.php',
            type: 'POST',
            data: {
                markdown: markdownCode
            },
            success: function(data) {
                const sectionHTML = $('#sectionHTML');

                sectionHTML.html(data);
                sectionHTML.show();
            }
        });
    });
});