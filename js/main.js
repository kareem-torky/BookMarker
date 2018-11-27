
document.getElementById('add-bookmark-form').addEventListener('submit', saveBookmark);

function saveBookmark(e){
    var siteName = document.getElementById('site-name').value;
    var siteURL = document.getElementById('site-URL').value;

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

    e.preventDefault();
}