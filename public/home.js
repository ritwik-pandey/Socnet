function commentHome(id , username){
    let comment = $('.comment-input-home').val()
    id = id.split(" ").join("")
    console.log(id);

    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {

        if (this.readyState == 4 && this.status == 200) {
            window.location = "http://localhost:4000";
        }
    };

    xhttp.open("POST", "/comment", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(
        "id=" + id + "&username=" + username + "&comment=" + comment
    );
}