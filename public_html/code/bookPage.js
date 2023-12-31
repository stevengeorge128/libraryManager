var bookInfo = {};

async function loadPage() {
    authenticate();
    document.getElementById("libraryHeaderButton").addEventListener("click", toLibraryList);
    document.getElementById("searchHeaderButton").addEventListener("click", toBookSearch);
    document.getElementById("logOutHeaderButton").addEventListener("click", logOut);
    console.log("loadPage is running");
    console.log(window.localStorage.getItem("lookupHash"));
    if (window.localStorage.getItem("lookupHash") == undefined) {
        window.alert("Failed to load book page. Please try again")
        window.location.href = "http://localhost:5000";
    }
    console.log(window.localStorage)
    let loading = await fetch("http://localhost:5000/post/loadBookPage", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ "bookHash": window.localStorage.getItem("lookupHash") }),
        credentials: 'include', // Include credentials in the request
    });
    let response = await loading.json();
    console.log("json response is ", response)
    convertServerResponseToHtml(response);
}

async function convertServerResponseToHtml(bookObj) {
    let title = bookObj.title;
    let authors = bookObj.authors;
    let isbn = bookObj.isbn;
    let publishedDate = bookObj.firstPublished;
    let imageLink = bookObj.imageLink;
    let imageHtml = bookObj.imageHtml;
    let extendedInfo = JSON.parse(bookObj.extendedInfo);
    console.log(imageLink)
    let publisher = extendedInfo.volumeInfo.publisher;
    let description = extendedInfo.volumeInfo.description;
    let googleLink = extendedInfo.volumeInfo.previewLink;

    let newRightHtml = `

    
    
    <table id="bookPageInitialInfoTable">


                <tr>
                    <td class="bookPageTableLeftColumn">TITLE:</td>
                    <td class="bookPageTableRightColumn">${title}</td>
                </tr>
                <tr>
                    <td class="bookPageTableLeftColumn">AUTHORS:</td>
                    <td class="bookPageTableRightColumn">${authors}</td>
                </tr>
                <tr>
                    <td class="bookPageTableLeftColumn">PUBLISHED:</td>
                    <td class="bookPageTableRightColumn">${publishedDate}</td>
                </tr>
                <tr>
                    <td class="bookPageTableLeftColumn">PUBLISHER:</td>
                    <td class="bookPageTableRightColumn">${publisher}</td>
                </tr>
                <tr>
                    <td class="bookPageTableLeftColumn">ISBN:</td>
                    <td class="bookPageTableRightColumn">${isbn}</td>
                </tr>
                <tr>
                <td class="bookPageTableLeftColumn">MORE:</td>
                <td class="bookPageTableRightColumn"><a href=${googleLink}>Google Books</a></td>
            </tr>

                <tr>
                    <td class="bookPageTableLeftColumn">DESCRIPTION: </td>
                    <td class="bookPageTableRightColumn" id = "descriptionTD">${description}</td>
                </tr>





            </table>`

    document.getElementById("bookPageInitialInfo").innerHTML = newRightHtml;

    let img = document.getElementById("bookPageImage")
    img.src = imageLink

}

async function seeMoreBookInfo() {
    console.log("seeMoreBookInfo")

}

async function authenticate() {
    console.log("authenticate on bookPage.js is being called")
    let auth = await fetch("http://localhost:5000/auth")
    if (auth.status == 401) {
        window.location.href = "http://localhost:5000/html/login.html";
    }
}


function backToBookSearch() {
    window.location.href = "http://localhost:5000/";
}
window.onload = loadPage;
// window.onload = authenticate;
setInterval(authenticate, 5000)

window.onload = loadPage;;

setInterval(authenticate, 5000)
setInterval(test, 2000)

function test() {
    console.log("client.js running")
}


function toLibraryList() {
    window.location.href = "http://localhost:5000/html/libraryListPage.html";
}

function toBookSearch() {
    window.location.href = "http://localhost:5000/";

}

async function logOut() {
    console.log(document.cookie)
    try {
        let loggingOut = await fetch("http://localhost:5000/logout");
        document.cookie = "login=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        console.log(document.cookie)
        authenticate();
    } catch {
        window.alert("Error logging out. Please try again.")
    }

}

async function authenticate() {
    let auth = await fetch("http://localhost:5000/auth")
    if (auth.status == 401) {
        window.location.href = "http://localhost:5000/html/login.html";
    }
}

