document.addEventListener("DOMContentLoaded", function() {
    fetch('http://localhost:3000/shoes')
    .then(resource => resource.json())
    .then((data) => {

        addTilesToPage(data)
        renderDealOfTheDay(data)

        renderHeader()
        renderLoginScreen()
        renderSignUpScreen()
    })
});

function renderLoginScreen(){
    const errorMessageDiv = document.querySelector('#error-message-div')

    const usernameInput = document.querySelector('#login-username-input')

    const passwordInput = document.querySelector('#login-pasword-input')

    const signUpButton = document.querySelector('#login-screen-sign-up')

    signUpButton.addEventListener('click', function(event){
        event.preventDefault()
        toggleHideLoginScreen()
        toggleHideSignUpScreen()
        hidePage()
        hideHeaderButtons()
    })

    function hideIncorrectPasswordMessage(){
        errorMessageDiv.style.display = "none"
    }    

    const submitButton = document.querySelector('#login-submit-button')

    submitButton.addEventListener('click', function(event){
        event.preventDefault()
        // usernameInput.value
        // passwordInput.value
        fetch('http://localhost:3000/users')
        .then(response => response.json())
        .then((data) => {
            data.forEach(function(user){
                if (user.username === usernameInput.value && user.password === passwordInput.value){
                    showPage()
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

        hidePage()
        hideHeaderButtons()
    } else {
        showPage()
        showHeaderButtons()
        loginTargetDiv.style.display = "none";
    }
}

function toggleHideSignUpScreen(){
    // debugger
    const loginTargetDiv = document.querySelector('#sign-up-target')
    if (loginTargetDiv.style.display === "none") {
        loginTargetDiv.style.display = "block";

        hidePage()
        hideHeaderButtons()
    } else {
        showPage()
        showHeaderButtons()
        loginTargetDiv.style.display = "none";
    }
}

function showHeaderButtons(){
    const headerSignUpButton = document.querySelector('.sign-up')
    headerSignUpButton.style.display = "inline-block"

    const headerLoginButton = document.querySelector('.log-in')
    headerLoginButton.style.display = "inline-block"
}

function hideHeaderButtons(){
    const headerSignUpButton = document.querySelector('.sign-up')
    headerSignUpButton.style.display = "none"

    const headerLoginButton = document.querySelector('.log-in')
    headerLoginButton.style.display = "none"
}

function renderSignUpScreen(){
    const nameInput = document.querySelector('#name-input')

    const usernameInput = document.querySelector('#sign-up-username-input')

    const passwordInput = document.querySelector('#sign-up-password-input')

    const sizeInput = document.querySelector('#size-input')

    const widthInput = document.querySelector('#width-input')

    const submitButton = document.querySelector('#sign-up-submit-button')

    const loginButton = document.querySelector('#sign-up-screen-login')
    loginButton.addEventListener('click', function(event){
        event.preventDefault()
        toggleHideLoginScreen()
        toggleHideSignUpScreen()
        hidePage()
        hideHeaderButtons()
    })

    submitButton.addEventListener('click', function(event){
        event.preventDefault()
        // usernameInput.value
        // passwordInput.value
        fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify({
                "name": `${nameInput.value}`,
                "username": `${usernameInput.value}`,
                "password": `${passwordInput.value}`,
                "shoe_size": `${sizeInput.value}`,
                "shoe_width": `${widthInput.value}`,
            })
        })
        .then(response => response.json())
        .then((data) => {
            console.log(data)
            showPage()
            // toggleHideLoginScreen()
            toggleHideSignUpScreen()
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

// function toggleShowPage(){
//     // debugger
//     const parentElement = document.querySelector('#main-body')
//     // parentElement.style.display = "none"
//     if (parentElement.style.display === "none") {
//         parentElement.style.display = "block";
//       } else {
//         parentElement.style.display = "none";
//       }
// }

function showPage(){
    const parentElement = document.querySelector('#main-body')
    parentElement.style.display = "block"
}

function hidePage(){
    const parentElement = document.querySelector('#main-body')
    parentElement.style.display = "none"
}

function renderDealOfTheDay(tiles){
    let highestStock = 400
    tiles.forEach(function(tileData){
        if (tileData.stock > highestStock){
            highestStock = tileData.stock
        }
    })
    function isHighestStock(tileData){
        return tileData.stock === highestStock
    }
    renderDealOfTheDayItem(tiles.find(isHighestStock))
}

function addTilesToPage(tiles){
    const shoeTileParent = document.querySelector(".posts")
    console.log(tiles)
    tiles.forEach(function renderTile(tileData){
        // console.log(tileData)
        const shoeTile = document.createElement('article')

        const shoeName = document.createElement('h3')
        shoeName.innerText = `${tileData.name}`

        const shoePrice = document.createElement('p')
        shoePrice.innerText = `$${tileData.price}`
        const addToCartButton = document.createElement('button')
        addToCartButton.innerText = "Add To Cart"
        addToCartButton.addEventListener('click', function(event){
            // console.log(event.target)
            const cartItem = document.createElement('article')
            const cartItemImageFrame = document.createElement('a')
            cartItemImageFrame.className = "image"

            const cartItemImage = document.createElement('img')
            cartItemImage.src = tileData.image_url

            const cartItemName = document.createElement('h4')
            cartItemName.innerText = tileData.name

            const cartItemPrice = document.createElement('p')
            cartItemPrice.innerText = `$${tileData.price}`
            cartItemPrice.style.color = "green"
            cartItemPrice.style.fontSize = "1.8em"

            cartItemImageFrame.appendChild(cartItemImage)
            cartItem.appendChild(cartItemImageFrame)
            cartItem.appendChild(cartItemName)
            cartItem.appendChild(cartItemPrice)

            const cart = document.querySelector('.mini-posts')
            
            cart.appendChild(cartItem)
            renderSideBar(tileData.price)
        })

        const shoeImage = document.createElement('img')
        shoeImage.class = "tile-image"
        shoeImage.src = `${tileData.image_url}`

        shoeName.addEventListener('click', function(event){
                //Sanny
            // console.log(event.target)
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

function toggleHideSidebar(){
    const sideBar = document.querySelector('#sidebar')
    // sideBar.firstElementChild.style.display = "none"
    if (sideBar.style.display === "none") {
        sideBar.style.display = "block"
        const newMenuHamburger = document.querySelector('#sidebar').lastElementChild
        // const shadowMenuHamburger = document.querySelector('#main').firstElementChild
        // shadowMenuHamburger.style.marginLeft = "23em"
        // // // debugger
        newMenuHamburger.style.display = "block"
        newMenuHamburger.addEventListener('click', function(event){
            // console.log(event.target)
            toggleHideSidebar()
        })
    } else {
        sideBar.style.display = "none";
        // const shadowMenuHamburger = document.querySelector('#main').firstElementChild
        // // debugger
        // shadowMenuHamburger.addEventListener('click', function(event){
        //     console.log(event.target)
        //     toggleHideSidebar()
        // })
    }


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
    // renderYourCartButton()
    const shadowMenuHamburger = document.querySelector('#main').firstElementChild
    shadowMenuHamburger.addEventListener('click', function(event){
        // console.log(event)
        toggleHideSidebar()
    })

    const signUpButton = iconsUl.querySelector('.sign-up')
    signUpButton.style.cursor = "pointer"
    signUpButton.addEventListener('click', function(event){
        console.log(event.target)
        // renderSignUpScreen()
        toggleHideSignUpScreen()
    })
    
    const loginButton = iconsUl.querySelector('.log-in')
    loginButton.style.cursor = "pointer"
    loginButton.addEventListener('click', function(event){
        // console.log(event.target)
        // renderLoginScreen()
        toggleHideLoginScreen()
    })
    renderSideBar()
}

function renderSideBar(addSum = 0){
    const yourCartDiv = document.querySelector('.mini-posts').parentElement
    const checkoutButton = yourCartDiv.querySelector('.actions').lastElementChild.firstElementChild
    checkoutButton.innerText = "Checkout Items"
    // debugger
    checkoutButton.addEventListener('click', function(event){
        event.preventDefault()
        const miniPostsDiv = document.querySelector('.mini-posts')
        removeAllChildNodes(miniPostsDiv)
        const cartTotal = document.querySelector('#cart-total')
        cartTotal.innerText = "$0"
    })
    let totalCalc = document.querySelector('#cart-total')
    let initialInt = totalCalc.innerText.split("$")[1]
    let prevTotal = parseInt(initialInt)
    let currentTotal = `$${prevTotal + parseInt(addSum)}`
    totalCalc.innerText = currentTotal
    totalCalc.style.color = "green"
}

function renderItemPage(tileData){
    const banner = document.querySelector('#banner')
    // console.log(banner)
    let content = banner.querySelector('.content')
    // console.log(content)
    let header = content.querySelector('header')

    let itemTitle = header.querySelector('h1')
    itemTitle.innerText = tileData.name

    let secondaryItemTitle = header.querySelector('h2')
    secondaryItemTitle.innerHTML = null

    let itemPrice = content.querySelector('h3')
    itemPrice.innerText = `$${tileData.price}`

    // let itemDescription = content.querySelector('#item-description')
    // itemDescription.innerText = `${tileData.description}`

    let buttonParentUl = content.querySelector('ul')

    let oldAddToCartButton = buttonParentUl.querySelector('a')
    oldAddToCartButton.style.display = "none"

    let addToCartButton = document.createElement('button')
    addToCartButton.innerText = "Add To Cart"
    addToCartButton.addEventListener('click', function(event){
        // console.log(event)
        event.preventDefault()
        const cartItem = document.createElement('article')
        const cartItemImageFrame = document.createElement('a')
        cartItemImageFrame.className = "image"
    
        const cartItemImage = document.createElement('img')
        cartItemImage.src = tileData.image_url
    
        const cartItemName = document.createElement('h4')
        cartItemName.innerText = tileData.name
    
        const cartItemPrice = document.createElement('p')
        cartItemPrice.innerText = `$${tileData.price}`
        cartItemPrice.style.color = "green"
        cartItemPrice.style.fontSize = "1.8em"
    
        cartItemImageFrame.appendChild(cartItemImage)
        cartItem.appendChild(cartItemImageFrame)
        cartItem.appendChild(cartItemName)
        cartItem.appendChild(cartItemPrice)
    
        const cart = document.querySelector('.mini-posts')
                
        cart.appendChild(cartItem)
        renderSideBar(tileData.price)
    })
    buttonParentUl.appendChild(addToCartButton)

    // debugger

    let itemStockDisplay = content.querySelector('#item-stock-display')
    itemStockDisplay.innerText = `Remaining Stock: ${tileData.stock}`

    let imageObject = banner.querySelector('span')
    let itemImage = imageObject.firstElementChild
    // debugger
    itemImage.src = tileData.image_url
}

function renderDealOfTheDayItem(tileData){
    // debugger
    const banner = document.querySelector('#banner')
    // console.log(banner)
    let content = banner.querySelector('.content')
    // console.log(content)
    let header = content.querySelector('header')

    let itemTitle = header.querySelector('h2')
    itemTitle.innerText = tileData.name

    let itemPrice = content.querySelector('h3')
    itemPrice.innerText = `$${tileData.price}`

    let imageObject = banner.querySelector('span')
    let itemImage = imageObject.firstElementChild
    console.log(tileData)
    itemImage.src = tileData.image_url

    // let itemDescription = content.querySelector('#item-description')
    // itemDescription.innerText = `${tileData.description}`

    let buttonParentUl = content.querySelector('ul')

    let addToCartButton = buttonParentUl.querySelector('a')
    addToCartButton.innerText = "Add To Cart"
    addToCartButton.addEventListener('click', function(event){
        // console.log(event)
        event.preventDefault()
        const cartItem = document.createElement('article')
        const cartItemImageFrame = document.createElement('a')
        cartItemImageFrame.className = "image"
    
        const cartItemImage = document.createElement('img')
        cartItemImage.src = tileData.image_url
    
        const cartItemName = document.createElement('h4')
        cartItemName.innerText = tileData.name
    
        const cartItemPrice = document.createElement('p')
        cartItemPrice.innerText = `$${tileData.price}`
        cartItemPrice.style.color = "green"
        cartItemPrice.style.fontSize = "1.8em"
    
        cartItemImageFrame.appendChild(cartItemImage)
        cartItem.appendChild(cartItemImageFrame)
        cartItem.appendChild(cartItemName)
        cartItem.appendChild(cartItemPrice)
    
        const cart = document.querySelector('.mini-posts')
                
        cart.appendChild(cartItem)
        renderSideBar(tileData.price)
    })

    let itemStockDisplay = content.querySelector('#item-stock-display')
    itemStockDisplay.innerText = `Remaining Stock: ${tileData.stock}`

    header.addEventListener('click', function(event){
        clearItemList()
        renderItemPage(tileData)
    })
    

    // debugger
}
    
function clearItemList(){
    // console.log("You made it")
    
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