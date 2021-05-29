// ----------------------------------Posts,Follower and Following-------------------------------------

//Display posts


function posts() {
    $("#following-list").empty()
    $("#following-list").hide()
    $('#followers-list').empty()
    $("#followers-list").hide()
    $('#posts-list').empty()
    $("#posts-list").show()
    $('.profile').css({ "overflow-y": "visible" })
    $('.overlay').css({ "visibility": "hidden" })

    const username = $('.username-input').attr('value');
    var xhttp = new XMLHttpRequest();
    $(".clicked-link").html('Posts');

    xhttp.onreadystatechange = function () {

        if (this.readyState == 4 && this.status == 200) {
            let posts = this.responseText;

            let obj = JSON.parse(posts);
            let class1 = "";
            for (i in obj) {
                if (obj[i].isLiked === false) {
                    class1 = "far fa-thumbs-up";
                } else {
                    class1 = "fas fa-thumbs-up";
                }

                //Insert the post

                $("#posts-list").append(
                    '<li class="list-link-item">' + obj[i].text + '</li> <button id=' + i + ' class="see-Likes" onClick="seeLikesAndComments(this.id)"><h4 class="like-post">Likes - ' + obj[i].likes +'</h4></button><button id=' + i + ' class="see-Likes" onClick="seeLikesAndComments(this.id)"><h4 class="comment-post">Comments - ' + obj[i].comments + '</h4></button>' +
                    '<button class="like-button" onclick="likeButton(this.id , 0)" id=' + i + '> <i class="icon-thumsup ' + class1 + ' fa-2x"></i>' +
                    '</button>' + 
                    '<input autocomplete="off" name="comment" class="comment-input" type="text" placeholder="Add a comment..">  <button id=' + i + 
                    ' class="card-form-button comment-button" name="comment-button" onclick="comment(this.id)" >Comment</button>'
                    
                );
            }

        }
    }

    xhttp.open("POST", "/" + username + "/posts", true);

    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send();
}

//----------------------------------------Get post for the user-------------------------------------

$('.profile-posts').click(function () {
    posts();
})



//----------------------------------When you hit comment-------------------------------------


function comment(id){
    const user = $('.username-input').attr('value')
    
    const comment = $('.comment-input').val();
    

    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {

        if (this.readyState == 4 && this.status == 200) {
            posts();
        }
    };

    xhttp.open("POST", "/comment", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(
        "id=" + id + "&username=" + user + "&comment=" + comment
    );
}

//------------------------------------When you hit like--------------------------------------

function likeButton(id , locationFromWhereItIsCalled) {  //If locationFromWhereItIsCalled 0 then from profile otherwise from opening large div

    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {

        if (this.readyState == 4 && this.status == 200) {
            if(locationFromWhereItIsCalled === 0){
                posts();
            }else{
                seeLikesAndComments(id);
            }
            
        }
    };
    xhttp.open("POST", "/like", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    const user = $('.username-input').attr('value')

    // alert(this.id);

    xhttp.send(
        "id=" + id + "&username=" + user
    );
}

//----------------------------------------Show the follower of user---------------------------------

$(".profile-follower").click(function () {
    $("#following-list").empty()
    $("#following-list").hide()
    $("#posts-list").empty()
    $("#posts-list").hide()
    $('#followers-list').empty()
    $("#followers-list").show()


    const username = $('.username-input').attr('value');

    $(".clicked-link").html('Followers')

    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {

        if (this.readyState == 4 && this.status == 200) {
            let followers = this.responseText;
            followers = followers.substring(1, followers.length - 1);

            //array contains followers

            var array = followers.split(",");
            array.forEach((index) => {
                //Remove double quotes substring
                $("#followers-list").append('<li class="list-link-item"> <a href="/' + index.substring(1, index.length - 1) + '">' + index.substring(1, index.length - 1) + '</a></li>');
            });
        }
    };
    xhttp.open("POST", "/" + username + "/followers", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send();
});

//----------------------------------------Show the following of user----------------------------

$(".profile-following").click(function () {
    $('#followers-list').empty()
    $("#followers-list").hide()
    $("#posts-list").empty()
    $("#posts-list").hide()
    $("#following-list").empty()
    $("#following-list").show()


    const username = $('.username-input').attr('value');
    $(".clicked-link").html('Following');

    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {

        if (this.readyState == 4 && this.status == 200) {
            let following = this.responseText;
            following = following.substring(1, following.length - 1);

            //array contains followers

            var array = following.split(",");
            array.forEach((index) => {
                //Remove double quotes substring
                $("#following-list").append('<li class="list-link-item"> <a href="/' + index.substring(1, index.length - 1) + '">' + index.substring(1, index.length - 1) + '</a></li>');
            });
        }
    };
    xhttp.open("POST", "/" + username + "/following", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send();
})

posts()
