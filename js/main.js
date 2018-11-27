// onLoad code
// Event listening on form submitting, Calling displayBookmarks
document.getElementById('add-bookmark-form').addEventListener('submit', saveBookmark);
displayBookmarks();

// onSubmit of the "Add to Bookmarks" form
function saveBookmark(e){
    var siteName = document.getElementById('site-name').value;
    var siteURL = document.getElementById('site-URL').value;

    if(siteName == '' || siteURL == ''){
        alert('Please fill the form fields');   
        return false;
    }

    var bookmark = { name: siteName, url:siteURL };
    
    if(localStorage.getItem('bookmarks') === null){
        var bookmarks_array = [];
        bookmarks_array.push(bookmark);
        var bookmarks_string = JSON.stringify(bookmarks_array);

        localStorage.setItem('bookmarks', bookmarks_string);

    } else{
        var bookmarks_string = localStorage.getItem('bookmarks');
        var bookmarks_array = JSON.parse(bookmarks_string);
        bookmarks_array.push(bookmark);
        bookmarks_string = JSON.stringify(bookmarks_array);
        localStorage.setItem('bookmarks', bookmarks_string);
    }

    displayBookmarks()
    e.preventDefault();
}

// onClick of the delete button for any saved bookmark
function deleteBookmark(url){
    var bookmarks_string = localStorage.getItem('bookmarks');
    var bookmarks_array = JSON.parse(bookmarks_string);

    for(var i=0; i<bookmarks_array.length; i++){
        if(bookmarks_array[i].url == url){
            bookmarks_array.splice(i, 1);
        }
    }

    bookmarks_string = JSON.stringify(bookmarks_array);
    localStorage.setItem('bookmarks', bookmarks_string);

    displayBookmarks();
}

// onLoad
function displayBookmarks(){  
    var bookmarks_card = document.getElementById('bookmarks-card');
    bookmarks_card.innerHTML = '';

    var bookmarks_string = localStorage.getItem('bookmarks');
    var bookmarks_array = JSON.parse(bookmarks_string);
    var bookmarks_num = bookmarks_array.length;

    if(bookmarks_num == 0){
        bookmarks_card.innerHTML += '<p><strong>You have no saved bookmarks yet</strong></p>';
    } else {
        for(var i=0; i<bookmarks_num; i++){
            var name = bookmarks_array[i].name;
            var url = bookmarks_array[i].url;
    
            bookmarks_card.innerHTML += '<p class="left">'+
            '<span><strong>'+ name +'</strong></span><span class="right">'+
            '<a class="btn btn-primary" href="'+ url +'" target="_blank">visit</a>'+
            '<a class="btn btn-danger" href="#" onclick="deleteBookmark(\''+ url+ '\')">delete</a>'+
            '</span></p>'+
            '<br>';
        }
    }
}