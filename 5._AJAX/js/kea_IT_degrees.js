
$(document).ready(function () {
    hoverElements();
    appendJsonData();
});

function appendJsonData() {
    $.getJSON("http://localhost/web_app_xampp_tasks/5._ajax/data/info.json", function (data) {
        for (let i = 0; i < data.kea_it_degrees.length; i++) {
            $("#main").append(($("<article></article>").attr("id", data.kea_it_degrees[i].id)))
            $("#" + data.kea_it_degrees[i].id).append("<section></section>");
            $("#" + data.kea_it_degrees[i].id + "> section").append("<p></p>");
            $("#" + data.kea_it_degrees[i].id + "> section > p").append(data.kea_it_degrees[i].description);
            console.log("semesters length", data.kea_it_degrees[i].semesters.length)
            for (let j = 0; j < data.kea_it_degrees[i].semesters.length; j++) {

                $("#" + data.kea_it_degrees[j].id).append("<section class=\"semester\"></section>");

                // $(".semester").append("<header></header>, <article></article>");
            }
            // .append("<header></header>");

        }
    });



}


function hoverElements() {
    $("#aPBA, #PBAMenu").hover(
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