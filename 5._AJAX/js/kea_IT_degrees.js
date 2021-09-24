
$(document).ready(function () {
    hoverElements();
    appendJsonData();
});

function appendJsonData() {
    $.getJSON("http://localhost/Web_App_XAMPP_Tasks/5._AJAX/data/info.json", function (data) {
        console.log(data)
    });



}


function hoverElements() {
    $("#aPBA").hover(
        function () {
            $("#PBAMenu").css("display", "block");
        }, function () {
            $("#PBAMenu").css("display", "none");
        }
    );

    $("#aAP").hover(
        function () {
            $("#APMenu").css("display", "block");
        }, function () {
            $("#APMenu").css("display", "none");
        }
    );
}