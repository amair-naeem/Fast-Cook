////password ValidationError
function checkPasswordMatch() {
    var password = $("#psw").val();
    var confirmPassword = $("#psw-repeat").val();

    if (password && confirmPassword)
        if (password != confirmPassword)
            $("#message").html("Passwords do not match!").css('color', 'red');
        else
            $("#message").html("Passwords match.").css('color', 'green');
    else
        $("#message").html(" ");
}

$(document).ready(function () {
    $("#psw, #psw-repeat").keyup(checkPasswordMatch);
});

