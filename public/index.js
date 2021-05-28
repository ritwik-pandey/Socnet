// ----------------------------------Posts,Follower and Following-------------------------------------

//Change the follow button

function isFollowing() {
    if ($('.username-follow').val() === 'true') {
        $(".profile-button").text('unfollow')
        $('.profile-button').addClass('clicked');
    }
}

//----------------------------------------Get post for the user-------------------------------------
function posts() {
    $("#following-list").empty()
    $("#following-list").hide()
    $('#followers-list').empty()
    $("#followers-list").hide()
    $('#posts-list').empty()
    $("#posts-list").show()

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
                    '<li class="list-link-item">' + obj[i].text + '</li> <h4 class="like-post">Likes - ' + obj[i].likes +'</h4><h4 class="comment-post">Comments - ' + obj[i].comments + '</h4>' +
                    '<button class="like-button" onclick="likeButton(this.id)" id=' + i + '> <i class="icon-thumsup ' + class1 + ' fa-2x"></i>' +
                    '</button>' + 
                    '<input autocomplete="off" name="comment" class="comment-input ' + i + '" type="text" placeholder="Add a comment..">  <button id=' + i + ' class="card-form-button comment-button" onclick="comment(this.id)" >Comment</button>'
                    
                );
            }

        }
    }

    xhttp.open("POST", "/" + username + "/posts", true);

    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send();
}

$('.profile-posts').click(function () {
    posts();
})

//----------------------------------When you hit comment-------------------------------------

function comment(id){
    const user = $('.username-input').attr('value')
    const search = '.' + id
    
    const comment = $(search).val();

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

function likeButton(id) {


    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {

        if (this.readyState == 4 && this.status == 200) {
            posts();
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

//------------------------------------------DESIGN---------------------------------------

// VARIABLES
const magicalUnderlines = Array.from(document.querySelectorAll('.underline--magical'));

const gradientAPI = 'https://gist.githubusercontent.com/wking-io/3e116c0e5675c8bcad8b5a6dc6ca5344/raw/4e783ce3ad0bcd98811c6531e40256b8feeb8fc8/gradient.json';

// HELPER FUNCTIONS

// 1. Get random number in range. Used to get random index from array.
const randNumInRange = max => Math.floor(Math.random() * (max - 1));

// 2. Merge two separate array values at the same index to 
// be the same value in new array.
const mergeArrays = (arrOne, arrTwo) => arrOne
    .map((item, i) => `${item} ${arrTwo[i]}`)
    .join(', ');

// 3. Curried function to add a background to array of elms
const addBackground = (elms) => (color) => {
    elms.forEach(el => {
        el.style.backgroundImage = color;
    });
}
// 4. Function to get data from API
const getData = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    return data.data;
}

// 5. Partial Application of addBackground to always apply 
// background to the magicalUnderlines constant
const addBackgroundToUnderlines = addBackground(magicalUnderlines);

// GRADIENT FUNCTIONS

// 1. Build CSS formatted linear-gradient from API data
const buildGradient = (obj) => `linear-gradient(${obj.direction}, ${mergeArrays(obj.colors, obj.positions)})`;

// 2. Get single gradient from data pulled in array and
// apply single gradient to a callback function
const applyGradient = async (url, callback) => {
    const data = await getData(url);
    const gradient = buildGradient(data[randNumInRange(data.length)]);
    callback(gradient);
}

// RESULT
applyGradient(gradientAPI, addBackgroundToUnderlines);


isFollowing();
posts();
