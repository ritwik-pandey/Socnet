function sharePost(id){
    const user = $('.username-input').attr('value')

    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {

        if (this.readyState == 4 && this.status == 200) {
            console.log("Fine");
        }
    };

    xhttp.open("POST", "/share", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(
        "id=" + id + "&username=" + user
    );
}