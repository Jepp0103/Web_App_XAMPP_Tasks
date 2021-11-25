$(document).ready(function () {
    const authEndpoint = "http://localhost/web_app_xampp_tasks/films/model/main.php"
    signUpUser(authEndpoint)
})

function signIn() { //TO DO NOW NOT DONE
    $("#signUpBtn").on("click", function () {
        if ($("#firstNameInput").val().length !== 0
            && $("#lastNameInput").val().length !== 0
            && $("#emailNameInput").val().length !== 0
            && $("#passwordInput").val().length !== 0
        ) {
            $.ajax({
                url: authEndpoint,
                type: "POST",
                data: {
                    action: "add_user",
                    firstname_input: $("#firstNameInput").val(),
                    last_name_input: $("#lastNameInput").val(),
                    email_input: $("#emailInput").val(),
                    password_input: $("#passwordInput").val(),
                },
                dataType: "json"
            }).done(function (data) {
                alert(data)
                $("#firstNameInput").val("")
                $("#lastNameInput").val("")
                $("#emailInput").val("")
                $("#passwordInput").val("")
            })
        } else {
            alert("Wrong input.")
        }
    })
}


function signUpUser(authEndpoint) {
    $("#signUpBtn").on("click", function () {
        if ($("#firstNameInput").val().length !== 0
            && $("#lastNameInput").val().length !== 0
            && $("#emailNameInput").val().length !== 0
            && $("#passwordInput").val().length !== 0
        ) {
            $.ajax({
                url: authEndpoint,
                type: "POST",
                data: {
                    action: "add_user",
                    firstname_input: $("#firstNameInput").val(),
                    last_name_input: $("#lastNameInput").val(),
                    email_input: $("#emailInput").val(),
                    password_input: $("#passwordInput").val(),
                },
                dataType: "json"
            }).done(function (data) {
                alert(data)
                $("#firstNameInput").val("")
                $("#lastNameInput").val("")
                $("#emailInput").val("")
                $("#passwordInput").val("")
            })
        } else {
            alert("Wrong input.")
        }
    })
}