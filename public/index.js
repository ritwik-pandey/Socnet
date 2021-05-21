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

$(".profile-follower").click(function () {
    $("#following-list").empty()
    $("#following-list").hide()
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
    xhttp.send("user" + username);
});

$(".profile-following").click(function () {
    $('#followers-list').empty()
    $("#followers-list").hide()
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
    xhttp.send("user" + username);
})

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
const getData = async(url) => {
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
const applyGradient = async(url, callback) => {
  const data = await getData(url);
  const gradient = buildGradient(data[randNumInRange(data.length)]);
  callback(gradient);
}

// RESULT
applyGradient(gradientAPI, addBackgroundToUnderlines);


isFollowing();
