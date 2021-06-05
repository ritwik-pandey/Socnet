function deletePost(id){
    let user = $('.username-input').attr('value')
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {

        if (this.readyState == 4 && this.status == 200) {
            window.location = "http://localhost:4000/" + user
        }
    };
    xhttp.open("POST", "/deletepost", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("user=" + user + "&id=" + id);
}