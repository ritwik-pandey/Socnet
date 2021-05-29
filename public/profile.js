//Change the follow button

function isFollowing() {
    if ($('.username-follow').val() === 'true') {
        $(".profile-button").text('unfollow')
        $('.profile-button').addClass('clicked');
    }
}



//------------------------------------------Follow Button--------------------------------

$('.profile-button').click(() => {
    const username = $('.username-input').attr('value');
    var xhttp = new XMLHttpRequest();

    if ($('.username-follow').val() === 'true') {

        xhttp.onreadystatechange = function () {

            if (this.readyState == 4 && this.status == 200) {
                window.location.href = '/' + username
            }
        };

        xhttp.open("POST", "unfollow", true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send("clickedid=" + username);

    } else {

        xhttp.onreadystatechange = function () {

            if (this.readyState == 4 && this.status == 200) {
                window.location.href = '/' + username
            }
        };

        xhttp.open("POST", "follow", true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send("clickedid=" + username);

    }

})

isFollowing();