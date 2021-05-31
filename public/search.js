jQuery('#input-sidebar').on('keydown', function(e) {
    if( e.which == 8 || e.which == 46 ){
        $('.search-list').empty()
    }
});

$('.sidebar-button').click(function() {
    $('.search-list').empty()
    let searchQuery = $('.sidebar-input').val()
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {

        if (this.readyState == 4 && this.status == 200) {
            $('.search-list').append('<li class="search-result"><a href=/' + searchQuery + '> ' + searchQuery + ' </a></li>')
        }
    };
    xhttp.open("POST", "/search", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("user=" + searchQuery);
})