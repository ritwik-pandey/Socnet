//When you hit see likes

function seeLikesAndComments(id , username) {
    let user;
    id = id.split(" ").join("")
    if(username === undefined){
        user = $('.username-input').attr('value')
    }else{
        user = username
    }
    $("#post-list-large").empty()

    //Change the styles
    changeCss();


    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {

        if (this.readyState == 4 && this.status == 200) {
            const postDetails = this.responseText;
            let obj = JSON.parse(postDetails);

            if (obj.isLiked === false) {
                class1 = "far fa-thumbs-up";
            } else {
                class1 = "fas fa-thumbs-up";
            }

            let userName = "'" + user + "'"

            if(obj.details.shared != ""){
                
                let link = "seesharepost('" + obj.details.shared  + "' , '" + obj.details.sharedId + "')"; 
                $("#post-list-large").append(
                    '<i class="fas fa-share share-icon-top"></i>' + user +' shared a post' +
                   '<div onclick="' + link + '" class="SinglePostSharedDetails"><h4> <a class="shared-name" href="/' + obj.details.shared + '"> ' + obj.details.shared + ' </a></h4> <li class="list-link-item shared-div-text">' + obj.details.text.substring(0 , 20) + '...</li></div>' +
                    '<button id=' + obj.id + ' class="see-Likes" onClick="seeLikesAndComments(this.id)"><h4 class="like-post">Likes - ' + obj.details.likes + '</h4>' +
                    '<button id=' + obj.id + ' class="see-Likes" onClick="seeLikesAndComments(this.id)"><h4 class="comment-post">Comments - ' + obj.details.comments + '</h4></button>' +
                    '<button class="like-button" onclick="likeButton(this.id , 1 , ' + userName + ')" id=' + obj.id + '> <i class="icon-thumsup ' + class1 + ' fa-2x"></i></button>' +
                    '<input autocomplete="off" name="comment-large" class="comment-input-large" type="text" placeholder="Add a comment..">  <button id=' + obj.id +
                    ' class="card-form-button comment-button-large" name="comment-button-large" onclick="commentSinglePost(this.id)" >Comment</button>'
                );
            }else{
                $("#post-list-large").append(
                    '<h3><a class="viewPostTop" href="/' + user + '">' + user + '</a></h3>' +
                    '<li class="list-link-item"><h3 class="title-post-large">' + obj.details.text + '</h3></li>' +
                    '<button id=' + obj.id + ' class="see-Likes" onClick="seeLikesAndComments(this.id)"><h4 class="like-post">Likes - ' + obj.details.likes + '</h4>' +
                    '<button id=' + obj.id + ' class="see-Likes" onClick="seeLikesAndComments(this.id)"><h4 class="comment-post">Comments - ' + obj.details.comments + '</h4></button>' +
                    '<button class="like-button" onclick="likeButton(this.id , 1, ' + userName + ')" id=' + obj.id + '> <i class="icon-thumsup ' + class1 + ' fa-2x"></i></button>' +
                    '<input autocomplete="off" name="comment-large" class="comment-input-large" type="text" placeholder="Add a comment..">  <button id=' + obj.id +
                    ' class="card-form-button comment-button-large" name="comment-button-large" onclick="commentSinglePost(this.id)" >Comment</button>'
                );
    
            }

            //Make a cookie storing likes and comments. So we don't have to fetch database again

            var xhttp = new XMLHttpRequest();

            xhttp.onreadystatechange = function () {

                if (this.readyState == 4 && this.status == 200) {
                    
                }
            };

            xhttp.open("POST", "/cookieLikesAndComments", true);
            xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhttp.send(
                "likesandcomments=" + postDetails
            );

        }
    };

    xhttp.open("POST", "/seelikesandcomments", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(
        "id=" + id + "&username=" + user
    );
}

function seelikes() {
    $('#showlikes').empty()
    $('#showcomments').empty()
    $('#Whocommented').css({ "display": "none" })
    $('#Wholiked').css({ "display": "inline-block" })

    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {

        if (this.readyState == 4 && this.status == 200) {
            let obj = JSON.parse(this.responseText);
            for(i in obj){
                $('#showlikes').append(
                    '<li class="list-item-likesandcomments seelikes-list"><a href="/' + obj[i] + '"> ' + obj[i] + '</a></li>'
                );
            }
        }
    };

    xhttp.open("GET", "/getlikes", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send();

}

function seecomments() {
    $('#showlikes').empty()
    $('#showcomments').empty()
    $('#Wholiked').css({ "display": "none" })
    $('#Whocommented').css({ "display": "inline-block" })

    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {

        if (this.readyState == 4 && this.status == 200) {
            let obj = JSON.parse(this.responseText);
            for(i in obj){
                for(j in obj[i]){
                    $('#showcomments').append(
                        '<li class="list-item-likesandcomments seecomments-list"><h4 class="seecomments-list-name"><a href="/' + i + '"> ' + i + '</a> <h4 class="seecomments-list-hypen">-</h4> </h4> <h4 class="seecomments-list-comment">' + obj[i][j] + '</h4></li>'
                    );
                }
            }
        }
    };

    xhttp.open("GET", "/getcomments", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send();

}

function changeCss() {
    $('.profile').css({ "overflow-y": "hidden" })
    $('.overlay').css({ "visibility": "visible" })
}

function commentSinglePost(id) {
    const user = $('.username-input').attr('value')
    const search = '.comment-input-large'

    const comment = $(search).val();

    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {

        if (this.readyState == 4 && this.status == 200) {
            seeLikesAndComments(id);
        }
    };

    xhttp.open("POST", "/comment", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(
        "id=" + id + "&username=" + user + "&comment=" + comment
    );

}

$('.close').click(function () {
    $('#showlikes').empty()
    $('#showcomments').empty()
    $('.profile').css({ "overflow-y": "scroll" })
    $('.overlay').css({ "visibility": "hidden" })
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {

        if (this.readyState == 4 && this.status == 200) {
            if(window.location.href === 'http://localhost:4000/'){
                window.location = "http://localhost:4000";
            }else{
                posts();
            }
            
        }
    };

    xhttp.open("GET", "/destroycookies", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send();
})


