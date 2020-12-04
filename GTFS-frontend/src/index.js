document.addEventListener("DOMContentLoaded", function() {
    fetch('http://localhost:3000/shoes')
    .then(resource => resource.json())
    .then((data) => {

        // renderLoginScreen()

        addTilesToPage(data)
        renderDealOfTheDay(data)
        // renderLoginScreen()

        renderHeader()
    })
});

function renderLoginScreen(){
    // clearPage()
    toggleShowPage()
    // hideIncorrectPasswordMessage()
    // const banner = document.querySelector('#banner')
    // const innerDiv = banner.parentElement
    const loginTargetDiv = document.querySelector('#login-target')
    loginTargetDiv.style.display = "block"

    const loginText = document.createElement('h1')
    loginText.innerText = "Login"
    loginText.className = "login-text"
    // loginText.style.display = "block"
    // loginText.style.margin = "auto"

    const spacer = document.createElement('div')
    spacer.style.marginBottom = "7em"
    loginTargetDiv.appendChild(spacer)

    const lineBreak = document.createElement('br')
    const lineBreak2 = document.createElement('br')
    const lineBreak3 = document.createElement('br')
    const lineBreak4 = document.createElement('br')
    // lineBreak4.style.marginBottom = "20px"
    const lineBreak5 = document.createElement('br')
    const lineBreak6 = document.createElement('br')

    const errorMessageDiv = document.createElement('div')
    const errorMessage = document.createElement('p')
    errorMessage.innerText = "Sorry, it looks like either your Password or your Username are incorrect"
    errorMessage.style.color = "red"
    
    errorMessageDiv.style.display = "none"
    errorMessageDiv.appendChild(errorMessage)

    const loginFormDiv = document.createElement('div')
    loginFormDiv.style.display = "block"

    const loginForm = document.querySelector('form')
    loginForm.method = "post"
    const defaultField = loginForm.querySelector('#query')
    loginForm.removeChild(defaultField)

    const usernameInputDiv = document.createElement('div')
    usernameInputDiv.className = "col-6 col-12-xsmall"
    usernameInputDiv.style.margin = "0 40em 0 0"

    const usernameInput = document.createElement('input')
    usernameInput.id = "username-input"
    usernameInput.type = "text"
    usernameInput.name = "username-input"
    usernameInput.placeholder = "Username"

    const passwordInputDiv = document.createElement('div')
    passwordInputDiv.className = "col-6 col-12-xsmall"
    passwordInputDiv.style.margin = "0 40em 0 0"

    const passwordInput = document.createElement('input')
    passwordInput.id = "pasword-input"
    passwordInput.type = "password"
    passwordInput.name = "password-input"
    passwordInput.placeholder = "Password"

    const actionsDiv = document.createElement('div')
    actionsDiv.className = "col-12"
    // const actionsUl = document.createElement('ul')

    // const actionLi1 = document.createElement('li')
    const submitButton = document.createElement('input')
    submitButton.type = "submit"
    submitButton.value = "Login"
    submitButton.className = "primary"

    // const actionLi2 = document.createElement('li')
    const signUpButton = document.createElement('button')
    signUpButton.innerText = "Sign Up"
    signUpButton.style.marginLeft = "1em"

    loginForm.appendChild(usernameInputDiv)
    usernameInputDiv.appendChild(usernameInput)
    loginForm.appendChild(lineBreak2)
    loginForm.appendChild(passwordInputDiv)
    passwordInputDiv.appendChild(passwordInput)

    // actionLi1.appendChild(submitButton)
    // actionLi2.appendChild(signUpButton)
    // actionsUl.appendChild(actionLi1)
    // actionsUl.appendChild(actionLi2)

    actionsDiv.appendChild(submitButton)
    actionsDiv.appendChild(signUpButton)
    loginForm.appendChild(lineBreak3)
    loginForm.appendChild(actionsDiv)

    loginTargetDiv.appendChild(loginText)
    loginTargetDiv.appendChild(lineBreak)
    loginTargetDiv.appendChild(errorMessageDiv)
    loginTargetDiv.appendChild(loginFormDiv)
    loginTargetDiv.appendChild(lineBreak4)
    loginTargetDiv.appendChild(lineBreak5)
    loginTargetDiv.appendChild(lineBreak6)
    loginFormDiv.appendChild(loginForm)
    // debugger
    function hideIncorrectPasswordMessage(){
        errorMessageDiv.style.display = "none"
    }    

    submitButton.addEventListener('click', function(event){
        event.preventDefault()
        // usernameInput.value
        // passwordInput.value
        fetch('http://localhost:3000/users')
        .then(response => response.json())
        .then((data) => {
            data.forEach(function(user){
                if (user.username === usernameInput.value && user.password === passwordInput.value){
                    toggleShowPage()
                    toggleHideLoginScreen()
                    hideIncorrectPasswordMessage()
                } else {
                    //incorrect username or password message
                    errorMessageDiv.style.display = "block"
                }
            })
        })
    })
}


function toggleHideLoginScreen(){
    // debugger
    const loginTargetDiv = document.querySelector('#login-target')
    if (loginTargetDiv.style.display === "none") {
        loginTargetDiv.style.display = "block";
    } else {
        loginTargetDiv.style.display = "none";
    }
}

function renderSignUpScreen(){
    // clearPage()
    toggleShowPage()
    // const banner = document.querySelector('#banner')
    // const innerDiv = banner.parentElement
    const signupTargetDiv = document.querySelector('#login-target')

    const signupText = document.createElement('h1')
    signupText.innerText = "Sign-Up"
    signupText.className = "signup-text"
    // loginText.style.display = "block"
    // loginText.style.margin = "auto"

    const spacer = document.createElement('div')
    spacer.style.marginBottom = "7em"
    loginTargetDiv.appendChild(spacer)

    const lineBreak = document.createElement('br')
    const lineBreak2 = document.createElement('br')
    const lineBreak3 = document.createElement('br')
    const lineBreak4 = document.createElement('br')
    // lineBreak4.style.marginBottom = "20px"
    const lineBreak5 = document.createElement('br')
    const lineBreak6 = document.createElement('br')

    // Errors -- come back
    // const errorMessageDiv = document.createElement('div')
    // const errorMessage = document.createElement('p')
    // errorMessage.innerText = "Sorry, it looks like either your Password or your Username are incorrect"
    // errorMessage.style.color = "red"
    // errorMessageDiv.style.display = "none"
    // errorMessageDiv.appendChild(errorMessage)

    const signupFormDiv = document.createElement('div')
    signupFormDiv.style.display = "block"

    const signupForm = document.querySelector('form')
    signupForm.method = "post"
    const defaultField = signupForm.querySelector('#query')
    signupForm.removeChild(defaultField)
    // name 
    const nameInputDiv = document.createElement('div')
    nameInputDiv.className = "col-6 col-12-xsmall"
    nameInputDiv.style.margin = "0 40em 0 0"

    const nameInput = document.createElement('input')
    nameInput.id = "name-input"
    nameInput.type = "text"
    nameInput.name = "name-input"
    nameInput.placeholder = "Name"
    // username 

    const newuserNameDiv = document.createElement('div')
    newuserNameDiv.className = "col-6 col-12-xsmall"
    newuserNameDiv.style.margin = "0 40em 0 0"

    const newuserNameInput = document.createElement('input')
    newuserNameInput.id = "new-username-input"
    newuserNameInput.type = "text"
    newuserNameInput.name = "new-username-input"
    newuserNameInput.placeholder = "Username"

    // password with confirm
    const passwordInputDiv = document.createElement('div')
    passwordInputDiv.className = "col-6 col-12-xsmall"
    passwordInputDiv.style.margin = "0 40em 0 0"

    const passwordInput = document.createElement('input')
    passwordInput.id = "password-input"
    passwordInput.type = "password"
    passwordInput.name = "password-input"
    passwordInput.placeholder = "Password"
    
    // confirmPassword

    const confirmInputDiv = document.createElement('div')
    confirmInputDiv.className = "col-6 col-12-xsmall"
    confirmInputDiv.style.margin = "0 40em 0 0"

    const confirmInput = document.createElement('input')
    confirmInput.id = "confirm-input"
    confirmInput.type = "password"
    confirmInput.name = "confirm-input"
    confirmInput.placeholder = "Confirm Password"

    // Shoe Size

    const sizeInputDiv = document.createElement('div')
    sizeInputDiv.className = "col-6 col-12-xsmall"
    sizeInputDiv.style.margin = "0 40em 0 0"

    const sizeInput = document.createElement('input')
    sizeInput.id = "size-input"
    sizeInput.type = "number"
    sizeInput.name = "size-input"
    sizeInput.placeholder = "Size"

    

    const actionsDiv = document.createElement('div')
    actionsDiv.className = "col-12"
    // const actionsUl = document.createElement('ul')

    // const actionLi1 = document.createElement('li')
    const submitButton = document.createElement('input')
    submitButton.type = "submit"
    submitButton.value = "Login"
    submitButton.className = "primary"

    // const actionLi2 = document.createElement('li')
    const signUpButton = document.createElement('button')
    signUpButton.innerText = "Sign Up"
    signUpButton.style.marginLeft = "1em"

    // put form together
    loginForm.appendChild(usernameInputDiv)
    usernameInputDiv.appendChild(usernameInput)
    loginForm.appendChild(lineBreak2)
    loginForm.appendChild(passwordInputDiv)
    passwordInputDiv.appendChild(passwordInput)

    actionsDiv.appendChild(submitButton)
    actionsDiv.appendChild(signUpButton)
    loginForm.appendChild(lineBreak3)
    loginForm.appendChild(actionsDiv)

    loginTargetDiv.appendChild(loginText)
    loginTargetDiv.appendChild(lineBreak)
    loginTargetDiv.appendChild(errorMessageDiv)
    loginTargetDiv.appendChild(loginFormDiv)
    loginTargetDiv.appendChild(lineBreak4)
    loginTargetDiv.appendChild(lineBreak5)
    loginTargetDiv.appendChild(lineBreak6)
    loginFormDiv.appendChild(loginForm)
    // debugger
    function hideIncorrectPasswordMessage(){
        errorMessageDiv.style.display = "none"
    }    

    submitButton.addEventListener('click', function(event){
        event.preventDefault()
        // usernameInput.value
        // passwordInput.value
        fetch('http://localhost:3000/users')
        .then(response => response.json())
        .then((data) => {
            data.forEach(function(user){
                if (user.username === usernameInput.value && user.password === passwordInput.value){
                    // debugger
                    // setCurrentUser(user)
                    toggleShowPage()
                    toggleHideLoginScreen()
                    hideIncorrectPasswordMessage()
                    
                } else {
                    //incorrect username or password message
                    errorMessageDiv.style.display = "block"
                }
            })
        })
    })
}

// function setCurrentUser(user){
//     debugger
//     const hiddenStorageDiv = document.querySelector('#hidden-storage')
//     const currentUserP = hiddenStorageDiv.querySelector('p')
//     // currentUserP.style.display = "none"
//     currentUserP.innerText = `${user}`
// }

function toggleShowPage(){
    // debugger
    const parentElement = document.querySelector('#main-body')
    // parentElement.style.display = "none"
    if (parentElement.style.display === "none") {
        parentElement.style.display = "block";
      } else {
        parentElement.style.display = "none";
      }
}

function renderDealOfTheDay(tiles){
    tiles.forEach(function(tileData){
        let highestStock = 5000
        if (tileData.stock == highestStock){
            highestStock = tileData.stock
            renderDealOfTheDayItem(tileData)
        }
    })
}

function addTilesToPage(tiles){
    const shoeTileParent = document.querySelector(".posts")
    console.log(tiles)
    tiles.forEach(function renderTile(tileData){
        console.log(tileData)
        const shoeTile = document.createElement('article')

        const shoeName = document.createElement('h3')
        shoeName.innerText = `${tileData.name}`

        const shoePrice = document.createElement('p')
        shoePrice.innerText = `${tileData.price}`
        const addToCartButton = document.createElement('button')
        addToCartButton.innerText = "Add To Cart"
        addToCartButton.addEventListener('click', function(event){
            console.log(event.target)
        })

        const shoeImage = document.createElement('img')
        shoeImage.class = "tile-image"
        shoeImage.src = `${tileData.image_url}`

        shoeName.addEventListener('click', function(event){
                //Sanny
            console.log(event.target)
            clearItemList()
            renderItemPage(tileData)//event.target.item
        })

        shoeTile.appendChild(shoeImage)
        shoeTile.appendChild(shoeName)
        shoeTile.appendChild(shoePrice)
        // debugger
        shoeTile.appendChild(addToCartButton)
        // debugger
        shoeTileParent.appendChild(shoeTile)
    })
}

function renderYourCartButton(){
    const pageHeader = document.querySelector('#header')
    let yourCartButton = pageHeader.querySelector('button')
    yourCartButton.className = "primary"
    // debugger
    yourCartButton.addEventListener('click', function(event){
        toggleShowPage()
        renderCart()
        // debugger
    })
}

function renderCart(){
    const currentUser = document.querySelector('#hidden-storage')
    debugger
}

function renderHeader(){
    const pageHeader = document.querySelector('#header')
    const iconsUl = pageHeader.querySelector('.icons')
    // let yourCartButton = pageHeader.querySelector('button')
    // yourCartButton.addEventListener('click', function(event){
    //     clearPage()
    //     renderCart()
    //     
    // })
    // 
    renderYourCartButton()
    const signUpButton = iconsUl.querySelector('.sign-up')
    signUpButton.addEventListener('click', function(event){
        // renderSignUpScreen()
    })
    
    const loginButton = iconsUl.querySelector('.log-in')
    // debugger
    loginButton.addEventListener('click', function(event){
        // console.log(event.target)
        renderLoginScreen()
    })
}





function renderItemPage(tileData){
    const banner = document.querySelector('#banner')
    console.log(banner)
    let content = banner.querySelector('.content')
    // console.log(content)
    let header = content.querySelector('header')

    let itemTitle = header.querySelector('h1')
    itemTitle.innerText = tileData.name

    let secondaryItemTitle = header.querySelector('h2')
    secondaryItemTitle.innerHTML = null

    let itemPrice = content.querySelector('h3')
    itemPrice.innerText = `${tileData.price}`

    let itemDescription = content.querySelector('#item-description')
    itemDescription.innerText = `${tileData.description}`

    let buttonParentUl = content.querySelector('ul')

    let addToCartButton = buttonParentUl.querySelector('a')
    addToCartButton.innerText = "Add To Cart"

    let itemStockDisplay = content.querySelector('#item-stock-display')
    itemStockDisplay.innerText = `Remaining Stock: ${tileData.stock}`

    let imageObject = banner.querySelector('span')
    let itemImage = imageObject.firstElementChild
    itemImage.src = tileData.image_url
}

function renderDealOfTheDayItem(tileData){
    const banner = document.querySelector('#banner')
    console.log(banner)
    let content = banner.querySelector('.content')
    // console.log(content)
    let header = content.querySelector('header')

    let itemTitle = header.querySelector('h2')
    itemTitle.innerText = tileData.name

    let itemPrice = content.querySelector('h3')
    itemPrice.innerText = `${tileData.price}`

    let itemDescription = content.querySelector('#item-description')
    itemDescription.innerText = `${tileData.description}`

    let buttonParentUl = content.querySelector('ul')

    let addToCartButton = buttonParentUl.querySelector('a')
    addToCartButton.innerText = "Add To Cart"

    let itemStockDisplay = content.querySelector('#item-stock-display')
    itemStockDisplay.innerText = `Remaining Stock: ${tileData.stock}`

    header.addEventListener('click', function(event){
        clearItemList()
        renderItemPage(tileData)
    })
    
    let imageObject = banner.querySelector('span')
    let itemImage = imageObject.firstElementChild
    itemImage.src = tileData.image_url
    // debugger
}
    
function clearItemList(){
    console.log("You made it")
    
    // removeAllChildNodes(banner)
    const productList = document.querySelector('#product-list')
    removeAllChildNodes(productList)
}

function clearPage(){
    const productList = document.querySelector('#product-list')
    removeAllChildNodes(productList)
    const banner = document.querySelector('#banner')
    removeAllChildNodes(banner)
}
    // function addPictureToPage(data) {
    //     // const imageCard = document.querySelector('.image-card')
    //     const pictureTitle = document.querySelector('.title')
    //     pictureTitle.innerText = data.title
    //     // dogNameItem.dataset.dogId = dog.id
    //     const dataImage = document.querySelector('.image')
    //     dataImage.src = data.image
    
    //     const likesCounter = document.querySelector('.likes')
    //     likesCounter.innerText = `${data.likes} likes`
    
    //     const likeButton = document.querySelector('.like-button')
    
    //     likeButton.addEventListener('click', function(event) {
    //         // showDogInfo(dog)
    //         likesCounter.innerText = incrementLikes(data.likes)
    //     })
    
    //     const dislikeButton = document.createElement('button')
    //     dislikeButton.className = 'dislike-button'
    //     dislikeButton.innerText = `💔`
    //     const likesSection = document.querySelector('.likes-section')
    //     likesSection.appendChild(dislikeButton)
    
    //     dislikeButton.addEventListener('click', function(event) {
    //         // showDogInfo(dog)
    //         likesCounter.innerText = downVote(data.likes)
    //     })
    
    //     const commentPostButton = document.querySelector('.comment-button')
    //     commentPostButton.addEventListener('click', function(event){
    //         event.preventDefault()
    //         addCommentToPage()
    //     })
    // }
    
    // function downVote(likes){
    //     // debugger
    //     const newLikes = likes - 1
    //     // debugger
    //     // let likesText = `${likes} likes`
    //     fetch('http://localhost:3000/images/1', {
    //         method: 'PATCH',
    //         headers: {
    //             "Content-Type": "application/json",
    //             Accept: "application/json"
    //         },
    //         body: JSON.stringify({
    //             "likes": newLikes
    //         })
    //     })
    //     let likesText = `${newLikes} likes`
    //     return likesText
    // }
    
    // function renderComments(data){
    //     // debugger
    //     const commentParent = document.querySelector('.comments')
    //     removeAllChildNodes(commentParent)
    //     console.log(data.comments)
    //     data.comments.forEach(myFunc)
    //     function myFunc(value){
    //         addCommentToPage(value)
    //     }
    // }
    
    // function addCommentToPage(data) {
    //     if (data) {
    //         const commentFormInput = document.querySelector('.comment-input')
    //         const newComment = document.createElement('li')
    //         // debugger
    //         newComment.dataset.commentId = data.id
    //         newComment.innerText = data.content
    //         commentFormInput.value = ""
    //         const commentParent = document.querySelector('.comments')
    
    //         const deleteCommentButton = document.createElement('button')
    //         deleteCommentButton.innerText = "Delete"
    //         newComment.appendChild(deleteCommentButton)
    
    //         deleteCommentButton.addEventListener('click', function(event){
    //             deleteComment(event.target.parentElement)
    //             // console.log(event.target.parentElement)
    //             // debugger
    //         })
    
    //         commentParent.appendChild(newComment)
    //     } else {
    //         const commentFormInput = document.querySelector('.comment-input')
    //         const newComment = document.createElement('li')
            
    //         newComment.innerText = commentFormInput.value
    //         commentFormInput.value = ""
    //         const commentParent = document.querySelector('.comments')
    
    //         const deleteCommentButton = document.createElement('button')
    //         deleteCommentButton.innerText = "Delete"
    //         newComment.appendChild(deleteCommentButton)
    
    //         deleteCommentButton.addEventListener('click', function(event){
    //             deleteComment(event.target.parentElement)
    //             // console.log(event.target.parentElement)
    //             // debugger
    //         })
    
    //         commentParent.appendChild(newComment)
    //         persistComment(newComment)
    //     }
    // }
        
    // function persistComment(newComment){
    //     fetch('http://localhost:3000/comments', {
    //         method: 'POST',
    //         headers: {
    //             "Content-Type": "application/json",
    //             Accept: "application/json"
    //         },
    //         body: JSON.stringify({
    //             imageId: 1,
    //             content: `${newComment.innerText}`
    //         })
    //     })
    //     .then(response => response.json())
    //     .then(function(object){
    //         console.log(object)
    //     })   
    // }og
    
    
    
    // function incrementLikes(likes){
    //     // debugger
    //     const newLikes = likes + 1
    //     // debugger
    //     // let likesText = `${likes} likes`
    //     fetch('http://localhost:3000/images/1', {
    //         method: 'PATCH',
    //         headers: {
    //             "Content-Type": "application/json",
    //             Accept: "application/json"
    //         },
    //         body: JSON.stringify({
    //             "likes": newLikes
    //         })
    //     })
    //     let likesText = `${newLikes} likes`
    //     return likesText
    // }
    
    
    function removeAllChildNodes(parent) {
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
    }
    
    // function deleteComment(commentLI){
    //     fetch(`http://localhost:3000/comments/${commentLI.dataset.commentId}`, {
    //         method: 'DELETE',
    //         headers: {
    //             "Content-Type": "application/json",
    //             Accept: "application/json"
    //         }
    //     })
    //     .then(response => response.json())
    //     .then(function(object){
    //         console.log(object)
    //     })
    //     let commentParent = commentLI.parentElement
    //     commentParent.removeChild(commentLI)
    // }