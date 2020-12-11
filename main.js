//Listen for form Submit
document.getElementById('myForm').addEventListener('submit',saveBookmark);

//Save Bookmark
function saveBookmark(e) {
    //console.log("it works"); 

    var siteName=document.getElementById('siteName').value;
    var siteUrl=document.getElementById('siteUrl').value;
    // console.log(siteName);

if(!validateForm(siteName,siteUrl)){
    return false;
}
   
    var bookmark = {
        name:siteName,
        url:siteUrl
    }

   // console.log(bookmark);


/*
    localStorage.setItem('test','Hello World');
    console.log(localStorage.getItem('test'));
    localStorage.removeItem('test');
    console.log(localStorage.getItem('test'));
*/

if(localStorage.getItem('bookmarks')===null){
    //init array
    var bookmarks=[];
    //Add to Array
    bookmarks.push(bookmark);
    //set to Localstorage
    localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
}
else {
    //Get bookmarks from LocalStorage
    var bookmarks=JSON.parse(localStorage.getItem('bookmarks'));
    //Add bookmark to array
    bookmarks.push(bookmark);
    //Re-set back to localStorage
    localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
}

//clear form
document.getElementById('myForm').reset();

//re-fetch bookmarks
fetchBookmarks()

    e.preventDefault();
}


//delete Bookmark
function deleteBookmark(url){
    //get bookmark from localStorage
    var bookmarks=JSON.parse(localStorage.getItem('bookmarks'));
    //loop through bookmarks
    for(var i=0; i < bookmarks.length; i++){
        if(bookmarks[i].url == url){

            //remove from array
            bookmarks.splice(i,1);
        }
    }
     //Re-set back to localStorage
     localStorage.setItem('bookmarks',JSON.stringify(bookmarks));

     //re-fetch bookmarks
     fetchBookmarks()
}

//fetch bookmaks
function fetchBookmarks(){
    //Get bookmarks from localStorage
    var bookmarks=JSON.parse(localStorage.getItem('bookmarks'));
    //Get output id
    var bookmarksResult=document.getElementById('bookmarksResults');

    //Build output
    bookmarksResult.innerHTML='';
    for(var i=0; i< bookmarks.length; i++){
        var name = bookmarks[i].name;
        var url = bookmarks[i].url;

        bookmarksResult.innerHTML +=' <div class="well">' +
                                        '<h3>' +name+
                                        '<a class="btn btn-deafult" target="_blank" href="'+url+'">Visit</a>' +
                                        '<a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" target="_blank" href="#">Delete</a>' +
                                        '</h3>'+
                                       ' </div>';
    }
}

function validateForm(siteName, siteUrl){
    if(!siteName || !siteUrl){
        alert('Please Fill the Box')
        return false;
    }

    var expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);

    if(!siteUrl.match(regex)){
        alert('Please use a valid URL');
        return false;
    }

    return true;
}