// global variables 

const ul = document.querySelector('#list')
const showPanel = document.querySelector('#show-panel')



// fetch

function listAndRenderBooks(){
    fetch(' http://localhost:3000/books')
    .then(r => r.json())
    .then(data => displayBooks(data))
}

//patch 

function patchLikes(id, userName, userID) {    

    fetch(`http://localhost:3000/books/${id}`, {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },

        body: JSON.stringify({
            "id": userID,
          "username": userName
        })

    })
        .then(response => response.json())
        .then(data => console.log(data))

}


// render and display functions 

function displayBooks(books){
    console.log(books.users)
    books.forEach(book => {

        const li = document.createElement('li')
        li.textContent = book.title 
        ul.append(li)
        li.id = book.id

        li.addEventListener('click', e => {
            e.preventDefault()

           let thumbNail = document.createElement('img')
           let bookDiscription = document.createElement('p')
           thumbNail.src = book.img_url
           bookDiscription.textContent = book.description
        
           showPanel.append(thumbNail) 
           showPanel.append(bookDiscription)
           
           for (let eachUser of book.users) {
            let liOfUsers = document.createElement('li')
            liOfUsers.textContent = eachUser.username
            showPanel.append(liOfUsers)
               
           }

           // like button 

           let button = document.createElement('button')
           button.textContent = ' <3'
           bookDiscription.append(button)

           button.addEventListener('click', e => {
               e.preventDefault()
               
               let id = book.id
               
               let userName = "pouros"
               let userID =  1
            
               patchLikes(id, userName, userID)              

               
               //need id of book clicked 

           })


           liOfUsers = book.users.userName

        })
    })
    
  

}


//event listeners


document.addEventListener("DOMContentLoaded", e => {
    listAndRenderBooks()
});


console.log(document.querySelector('body'))


console.log(document)


