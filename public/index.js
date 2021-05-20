// document.getElementById("myCheck").click()
//     var element = document.getElementById("<%=username%>");
//     element.classList.add("clicked");
//  


function isFollowing() {
    if ($('.username-follow').val() === 'true') {
        $(".profile-button").text('unfollow')
        $('.profile-button').addClass('clicked');
    }
}

$('.profile-button').click(() => {
    const username = $('.username-input').attr('value');
    var xhttp = new XMLHttpRequest();

    if ($('.username-follow').val() === 'true') {


        xhttp.open("POST", "unfollow", true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send("clickedid=" + username);

        // $(".profile-button").text('follow')
        // $('.profile-button').removeClass('clicked');

        window.location.href = '/' + username
        
    } else {
        // $(".profile-button").text('unfollow')
        // $('.profile-button').addClass('clicked');

        xhttp.open("POST", "follow", true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send("clickedid=" + username);

        window.location.href = '/' + username
    }
})


isFollowing();
