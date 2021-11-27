$(document).ready(function () {
    const authEndpoint = "http://localhost/web_app_xampp_tasks/films/model/main.php"
    signUpUser(authEndpoint)
    signIn(authEndpoint)
    getSessionInfo(authEndpoint)
    logout(authEndpoint)
})

function getSessionInfo(authEndpoint) {
    $.ajax({
        url: authEndpoint,
        type: "POST",
        data: {
            action: "get_session",
        },
        dataType: "json"
    }).done(function (data) {
        $("header").append("<p>" + data + "</p>")
    })
}

function logout(authEndpoint) {
    $("#logoutBtn").on("click", function () {
        $.ajax({
            url: authEndpoint,
            type: "POST",
            data: {
                action: "logout"
            },
            dataType: "json"
        }).done(function (data) {
            console.log(data)
            window.location.href = "http://localhost/web_app_xampp_tasks/films/view/login_page.php"
        })
    })
}

function signIn(authEndpoint) {
    $("#signInBtn").on("click", function () {
        if ($("#emailInput").val().length !== 0 && $("#passwordInput").val().length !== 0) {
            $.ajax({
                url: authEndpoint,
                type: "POST",
                data: {
                    action: "validate_user",
                    email_input: $("#emailInput").val(),
                    password_input: $("#passwordInput").val(),
                },
                dataType: "json"
            }).done(function (data) {
                if (data === true) {
                    window.location.href = "http://localhost/web_app_xampp_tasks/films/view/index.php"
                    $("header").append($("<button></button>")
                        .attr("id", "logoutBtn").text("Logout")
                    )
                } else {
                    alert("User does not exist")
                }
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
            && $("#emailInput").val().length !== 0
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
                alert("User succesfully created.")
                window.location.href = "http://localhost/web_app_xampp_tasks/films/view/login_page.php"
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