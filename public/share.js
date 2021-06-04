function sharePost(id , username) {
    let user;

    if(username === undefined){
        user = $('.username-input').attr('value')
    }else{
        user = username
    }

    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {

        if (this.readyState == 4 && this.status == 200) {
            $("#" + id + "popup").addClass("show");
            $("#" + id + "popup").html("Shared!");
            setTimeout(
                function () {
                    $("#" + id + "popup").removeClass("show");
            }, 3000);
            if(window.location.href === 'http://localhost:4000/'){
                window.location = "http://localhost:4000";
            }else{
                posts();
            }
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