document.addEventListener("DOMContentLoaded", listBooks);

function listBooks () {
    fetch("http://localhost:3000/books")
    .then(res => res.json())
    .then((books) => books.forEach((book) => renderBookTitle(book)))
}



function renderBookTitle(book) {
    let list = document.querySelector("#list")
    let li = document.createElement("li")
    li.innerHTML = book.title
    list.appendChild(li)

    li.addEventListener("click", () => renderBookInfo(book))
}

function renderBookInfo (book) {
    const showPanel = document.getElementById("show-panel")
    const title = document.createElement("h1")
    const subtitle = document.createElement("h2")
    const author = document.createElement("h2")
    const description = document.createElement("p")
    const thumbnail = document.createElement("img")
    const users = document.createElement("ul")
    const likeButton = document.createElement("button")

    title.textContent = book.title
    subtitle.textContent = book.subtitle
    author.textContent = `By ${book.author}`
    description.textContent = book.description
    thumbnail.src = book.img_url
    likeButton.textContent = "Like"
    
    book.users.forEach(user => {
        const userList = document.createElement("li")
        userList.innerHTML = user.username
        users.appendChild(userList)
    })

    while(showPanel.firstChild) {
        showPanel.removeChild(showPanel.lastChild)
    }

    likeButton.addEventListener("click", () => submitLike(book))

    showPanel.append(title, subtitle, author, description, thumbnail, users, likeButton)
}

function submitLike(book) {
    fetch(`http://localhost:3000/books/${book.id}`, {
        method: "PATCH",
        headers: { 
            "Content-Type": "application/json" 
        },
        body: JSON.stringify({
            "users": [...book.users, { "id": 1, "username": "pouros"} ]            
        })
    })
    .then(res => res.json())
    .then(book => renderBookInfo(book))
}

