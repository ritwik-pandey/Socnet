//When you hit see likes

function seeLikesAndComments(id) {
    $("#post-list-large").empty()

    //Change the styles
    changeCss();


    const user = $('.username-input').attr('value')
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
            
            $("#post-list-large").append(
                '<li class="list-link-item"><h3 class="title-post-large">' + obj.details.text + '</h3></li>' +
                '<button id=' + obj.id + ' class="see-Likes" onClick="seeLikesAndComments(this.id)"><h4 class="like-post">Likes - ' + obj.details.likes +'</h4>' +
                '<button id=' + obj.id + ' class="see-Likes" onClick="seeLikesAndComments(this.id)"><h4 class="comment-post">Comments - ' + obj.details.comments + '</h4></button>' +
                '<button class="like-button" onclick="likeButton(this.id , 1)" id=' + obj.id + '> <i class="icon-thumsup ' + class1 + ' fa-2x"></i></button>' +
                '<input autocomplete="off" name="comment-large" class="comment-input-large" type="text" placeholder="Add a comment..">  <button id=' + obj.id + 
                ' class="card-form-button comment-button-large" name="comment-button-large" onclick="commentSinglePost(this.id)" >Comment</button>'
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
    // $('#Wholiked').css({"display": ""})
}

function seecomments() {
    
}

function changeCss() {
    $('.profile').css({ "overflow-y": "hidden" })
    $('.overlay').css({ "visibility": "visible" })
}

function commentSinglePost(id){
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

$('.close').click(function() {
    $('.profile').css({ "overflow-y": "scroll" })
    $('.overlay').css({ "visibility": "hidden" })
})


