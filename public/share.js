function sharePost(id) {
    const user = $('.username-input').attr('value')

    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {

        if (this.readyState == 4 && this.status == 200) {
            $("#" + id + "popup").addClass("show");
            $("#" + id + "popup").html("Shared!");
            setTimeout(
                function () {
                    $("#" + id + "popup").removeClass("show");
                }, 3000);
        } else {
            if (this.responseText != '') {
                $("#" + id + "popup").addClass("show");
                $("#" + id + "popup").html("already shared");
                setTimeout(
                    function () {
                        $("#" + id + "popup").removeClass("show");
                    }, 3000)
            }
        }
    };

    xhttp.open("POST", "/share", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(
        "id=" + id + "&username=" + user
    );
}

function seesharepost(username, id) {
    seeLikesAndComments(id, username)
}