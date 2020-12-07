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

function renderPopularShoes(){
    fetch('http://localhost:3000/shoes')
    .then(resource => resource.json())
    .then((data) => {
        let newData = [0]
        data.forEach(function(datum){
            const popRand = Math.floor(Math.random() * 2)
            if (popRand === 1){
                if (newData == [0]){
                    newData = [datum]
                } else {
                    newData.push(datum)
                }
            }
        })
        newData = newData.slice(1)
        
        clearItemTiles()
        
        addTilesToPage(newData)
        // renderDealOfTheDay(newData)

        // renderHeader()
        // renderLoginScreen()
        // renderSignUpScreen()
    })
}

function clearItemTiles(){
    const productList = document.querySelector('.posts')
    removeAllChildNodes(productList)
}

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
                    // debugger
                    // console.log(user)
                    // return user
                    showPage()
                    toggleHideLoginScreen()
                    hideIncorrectPasswordMessage()
                    setCurrentUser(user)
                } else {
                    //incorrect username or password message
                    errorMessageDiv.style.display = "block"
                }
            })
        })
    })
}

function toggleHideLoginScreen(){

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
    // 
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

let currentUser = {}

function setCurrentUser(user){
    
    // const hiddenStorageDiv = document.querySelector('#hidden-storage')
    // const currentUserP = hiddenStorageDiv.querySelector('p')
    // currentUserP.style.display = "none"
    // currentUserP.innerText = `${user.name}`
    currentUser.id = user.id
    currentUser.name = user.name
    currentUser.username = user.username
    currentUser.password = user.password
    currentUser.shoe_size = user.shoe_size
    currentUser.shoe_width = user.shoe_width
    // debugger
    hideHeaderButtons()
    // debugger
    const currrentUserUsername = document.querySelector('#current-username').firstElementChild
    currrentUserUsername.innerText = currentUser.username
}

// function toggleShowPage(){
//     // 
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
    let highestStock = 0
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
        // shoeTile.className = "shoe-tile"

        const shoeName = document.createElement('h3')
        shoeName.innerText = `${tileData.name}`
        shoeName.style.cursor = "pointer"

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
            decrementStock(tileData, addTilesToPage)
        })

        const shoeImage = document.createElement('img')
        shoeImage.className = "tile-image"
        shoeImage.src = `${tileData.image_url}`
        shoeImage.style.cursor = "pointer"
        shoeImage.addEventListener('mouseover', () => {
            shoeImage.src = tileData.alt_img
        })
        shoeImage.addEventListener('mouseout', () => {
            shoeImage.src = tileData.image_url
        })

        shoeName.addEventListener('click', function(event){
                //Sanny
            // console.log(event.target)
            clearItemList()
            renderItemPage(tileData)//event.target.item
        })

        shoeTile.appendChild(shoeImage)
        shoeTile.appendChild(shoeName)
        shoeTile.appendChild(shoePrice)
        // 
        shoeTile.appendChild(addToCartButton)
        // 
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
        // // // 
        newMenuHamburger.style.display = "block"
        newMenuHamburger.addEventListener('click', function(event){
            // console.log(event.target)
            toggleHideSidebar()
        })
    } else {
        sideBar.style.display = "none";
        // const shadowMenuHamburger = document.querySelector('#main').firstElementChild
        // // 
        // shadowMenuHamburger.addEventListener('click', function(event){
        //     console.log(event.target)
        //     toggleHideSidebar()
        // })
    }


}

function renderHeader(){
    const pageHeader = document.querySelector('#header')
    const iconsUl = pageHeader.querySelector('.icons')

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

function decrementStock(shoe, parentFunc){
    // 
    var newStock = shoe.stock - 1
    fetch(`http://localhost:3000/shoes/${shoe.id}`, {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify({
            "stock": newStock
        })
    })
    .then(resource => resource.json())
    .then(function(data){
        console.log(data)
        // 
        const stockDisplay = document.querySelector('#item-stock-display')
        stockDisplay.innerText = `Remaining Stock: ${data.stock}`
    })
}

function toggleShowPaymentScreen(){
    const paymentScreenDiv = document.querySelector('#payment-screen')
    if (paymentScreenDiv.style.display === "none"){
        hidePage()
        paymentScreenDiv.style.display = "block"

        const submitPaymentButton = document.querySelector('#payment-submit-button')
        submitPaymentButton.addEventListener('click', function(event){
            event.preventDefault()
            const miniPostsDiv = document.querySelector('.mini-posts')
            removeAllChildNodes(miniPostsDiv)
            const cartTotal = document.querySelector('#cart-total')
            cartTotal.innerText = "$0"

            paymentScreenDiv.style.display = "none"
            showThankYouPage()
        })

        const cancelButton = document.querySelector('#cancel-transaction')
        cancelButton.addEventListener('click', function(event){
            event.preventDefault()
            toggleShowPaymentScreen()
            // showPage()
        })
    } else {
        paymentScreenDiv.style.display = "none"
        showPage()
    }
}

function showThankYouPage(){
    const thankYouPageDiv = document.querySelector('#thank-you-page')
    thankYouPageDiv.style.display = "block"

    const userNameDisplay = document.querySelector('#user-name-celebration-display')
    userNameDisplay.innerText = `${currentUser.name} 🎉`
    userNameDisplay.style.marginLeft = "33%"
}

function renderSideBar(addSum = 0){
    const searchBar = document.querySelector('#search').firstElementChild.firstElementChild
    searchBar.addEventListener('keyup', function(event){
        event.preventDefault()
        fetch('http://localhost:3000/shoes')
        .then(resource => resource.json())
        .then((data) => {
            let newData = [0]
            data.forEach(function(shoe){
                if (shoe.name.includes(`${searchBar.value}`)){
                    newData.push(shoe)
                }
            })
            newData = newData.slice(1)
            // debugger
            clearItemTiles()
            addTilesToPage(newData)
            renderDealOfTheDay(newData)
        })
    })

    const yourCartDiv = document.querySelector('.mini-posts').parentElement
    const checkoutButton = yourCartDiv.querySelector('.actions').lastElementChild.firstElementChild
    checkoutButton.innerText = "Checkout Items"
    
    checkoutButton.addEventListener('click', function(event){
        event.preventDefault()
        // const miniPostsDiv = document.querySelector('.mini-posts')
        // removeAllChildNodes(miniPostsDiv)
        // const cartTotal = document.querySelector('#cart-total')
        // cartTotal.innerText = "$0"
        toggleShowPaymentScreen()
    })
    let totalCalc = document.querySelector('#cart-total')
    let initialInt = totalCalc.innerText.split("$")[1]
    let prevTotal = parseInt(initialInt)
    let currentTotal = `$${prevTotal + parseInt(addSum)}`
    totalCalc.innerText = currentTotal
    totalCalc.style.color = "green"

    const popularShoesLi = document.querySelector('#popular-shoes-li')
    popularShoesLi.addEventListener('click', function(event){
        event.preventDefault()
        renderPopularShoes()
    })

    const browseOpener = document.querySelector('.opener')

    browseOpener.addEventListener('click', function(event){
        event.preventDefault()
        toggleShowBrowseByOptions()
    })

    const brandOpener = document.querySelector('#brand-drop-down').firstElementChild
    console.log(brandOpener)
    brandOpener.addEventListener('click', function(event){
        event.preventDefault()
        toggleShowBrands()
        
    })

    const allShoesSortButton = document.querySelector('#all-shoes-sidebar-li')
    allShoesSortButton.addEventListener('click', function(event){
        event.preventDefault()
        clearItemTiles()
        debugger
        fetch('http://localhost:3000/shoes')
        .then(resource => resource.json())
        .then((data) => {
            clearItemTiles()
            addTilesToPage(data)
            renderDealOfTheDay(data)
            
            // renderHeader()
            // renderLoginScreen()
            // renderSignUpScreen()
        })
    })
}

function toggleShowBrowseByOptions(){
    const browseByUl = document.querySelector('#browse-by-ul')
    if (browseByUl.style.display === "none"){
        browseByUl.style.display = "block"
        var browseByLiNodeList = browseByUl.childNodes
        var browseByLiArray = Array.prototype.slice.call(browseByLiNodeList)
        // debugger
        var browseByLiArray2 = browseByLiArray.slice(3, 4)
        // browseByLiArray2.push(browseByLiArray.slice(3, 4))
        browseByLiArray2.push(browseByLiArray.slice(5, 6))
        browseByLiArray2.push(browseByLiArray.slice(7, 8))
        // debugger
        var browseByLiArray3 = browseByLiArray2.flat()
        browseByLiArray3.forEach(function(li){
            li.style.display = "block"
        })

        var browseOpt1 = browseByLiArray3[0]
        browseOpt1.addEventListener('click', function(event){
            event.preventDefault()
            sortTilesByWomen()
        })

        var browseOpt2 = browseByLiArray3[1]
        browseOpt2.addEventListener('click', function(event){
            event.preventDefault()
            sortTilesByMen()
        })

        var browseOpt3 = browseByLiArray3[2]
        browseOpt3.addEventListener('click', function(event){
            event.preventDefault()
            sortTilesByPrice()
        })
        
        // var browseOpt4 = browseByLiArray3[3]
        // browseOpt4.addEventListener('click', function(event){
        //     event.preventDefault()
            // toggleShowBrands()
        // })


    } else {
        browseByUl.style.display = "none"
        var browseByLiNodeList = browseByUl.childNodes
        var browseByLiArray = Array.prototype.slice.call(browseByLiNodeList)
        // debugger
        var browseByLiArray2 = browseByLiArray.slice(3, 4)
        // browseByLiArray2.push(browseByLiArray.slice(3, 4))
        browseByLiArray2.push(browseByLiArray.slice(5, 6))
        browseByLiArray2.push(browseByLiArray.slice(7, 8))
        // debugger
        var browseByLiArray3 = browseByLiArray2.flat()
        browseByLiArray3.forEach(function(li){
            li.style.display = "none"
        })
    }
}

function toggleShowBrands(){
    const brandUl = document.querySelector('#brand-drop-down').lastElementChild
    console.log(brandUl)
    if (brandUl.style.display === "none"){
        brandUl.style.display = "block"

        const nikeLi = document.querySelector('#nike')
        nikeLi.addEventListener('click', function(event){
            sortTilesByBrand("Nike")
        })
        const airJordanLi = document.querySelector('#air-jordan')
        airJordanLi.addEventListener('click', function(event){
            sortTilesByBrand("Air Jordan")
        })
        const adidasLi = document.querySelector('#adidas')
        adidasLi.addEventListener('click', function(event){
            sortTilesByBrand("Adidas")
        })
        const reebokLi = document.querySelector('#reebok')
        reebokLi.addEventListener('click', function(event){
            sortTilesByBrand("Reebok")
        })
        const newBalanceLi = document.querySelector('#new-balance')
        newBalanceLi.addEventListener('click', function(event){
            sortTilesByBrand("New Balance")
        })
        const converseLi = document.querySelector('#converse')
        converseLi.addEventListener('click', function(event){
            sortTilesByBrand("Converse")
        })
    } else {
        brandUl.style.display = "none"
    }
    // const brandOpener = document.querySelector('#brand-drop-down')
    // brandOpener.style.display = "block"
}

function sortTilesByMen(){
    fetch('http://localhost:3000/shoes')
    .then(resource => resource.json())
    .then((data) => {
        // let halfwayPoint = 32
        // data = data.slice(23)
        data.forEach(function(shoe){
            if (shoe.name.includes("Wmns")){

            } else {

            }
        })

        clearItemTiles()
        addTilesToPage(data)
        renderDealOfTheDay(data)

        // renderHeader()
        // renderLoginScreen()
        // renderSignUpScreen()
    })
}

function sortTilesByWomen(){
    fetch('http://localhost:3000/shoes')
    .then(resource => resource.json())
    .then((data) => {
        // let halfwayPoint = 23
        data = data.slice(1, 23)

        clearItemTiles()
        addTilesToPage(data)
        renderDealOfTheDay(data)

        // renderHeader()
        // renderLoginScreen()
        // renderSignUpScreen()
    })
}

function sortTilesByBrand(brandName){
    fetch('http://localhost:3000/shoes')
    .then(resource => resource.json())
    .then((data) => {
        let brandedShoes = [0]
        data.forEach(function(shoe){
            if (shoe.name.includes(brandName)){
                brandedShoes.push(shoe)
            }
        })

        brandedShoes = brandedShoes.slice(1)

        clearItemTiles()
        addTilesToPage(brandedShoes)
        renderDealOfTheDay(brandedShoes)

        // renderHeader()
        // renderLoginScreen()
        // renderSignUpScreen()
    })
}

function sortTilesByPrice(){
    fetch('http://localhost:3000/shoes')
    .then(resource => resource.json())
    .then((data) => {


        clearItemTiles()
        addTilesToPage(data)
        renderDealOfTheDay(data)

        // renderHeader()
        // renderLoginScreen()
        // renderSignUpScreen()
    })
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
        decrementStock(tileData, renderItemPage)
    })
    buttonParentUl.appendChild(addToCartButton)

    // 

    let itemStockDisplay = content.querySelector('#item-stock-display')
    itemStockDisplay.innerText = `Remaining Stock: ${tileData.stock}`

    let imageObject = banner.querySelector('span')
    let itemImage = imageObject.firstElementChild
    // 
    itemImage.src = tileData.image_url
    itemImage.addEventListener('mouseover', () => {
        itemImage.src = tileData.alt_img
    })
    itemImage.addEventListener('mouseout', () => {
        itemImage.src = tileData.image_url
    })

    const commentDiv = document.querySelector('#item-comments-div')
    // commentDiv.style.display = "block"
    toggleShowComments(commentDiv)
    // const commentsHeader = commentDiv.querySelector('header').firstElementChild
    // commentsHeader.style.bottomBorder = "solid 3px #f56a6a"
    const commentList = commentDiv.querySelector('.features')

    tileData.comments.forEach(function(comment){
        const commentArticle = document.createElement('article')
        commentArticle.dataset.commentId = comment.id

        commentList.appendChild(commentArticle)
    
        const paperPlane = document.createElement('span')
        paperPlane.className = "icon solid fa-paper-plane"
        commentArticle.appendChild(paperPlane)
    
        const commentContentDiv = document.createElement('div')
        // commentArticle.appendChild(commentContentDiv)
    
        const commenterUsername = document.createElement('h3')
        // commenterUsername.innerText = `${comment.user_id}`
        fetch(`http://localhost:3000/users/${comment.user_id}`)
        .then(resource => resource.json())
        .then((user) => {
            commenterUsername.innerText = `${user.username}`
        })
        commentContentDiv.appendChild(commenterUsername)

        const commentContent = document.createElement('p')
        commentContent.innerText = comment.content

        cosnt 

        commentContentDiv.appendChild(commentContent)
        commentArticle.appendChild(commentContentDiv)
    })

    const commentForm = commentDiv.querySelector('form')
    const commentBodyInput = commentForm.firstElementChild
    const commentPostButton = commentForm.lastElementChild
    commentPostButton.addEventListener('click', function(event){
        event.preventDefault()
        const commentArticle = document.createElement('article')
        
        commentList.appendChild(commentArticle)
    
        const paperPlane = document.createElement('span')
        paperPlane.className = "icon solid fa-paper-plane"
        commentArticle.appendChild(paperPlane)
    
        const commentContentDiv = document.createElement('div')
        // commentArticle.appendChild(commentContentDiv)
    
        const commenterUsername = document.createElement('h3')
        commenterUsername.innerText = `${currentUser.username}`
        // fetch(`http://localhost:3000/users/${comment.user_id}`)
        // .then(resource => resource.json())
        // .then((user) => {
        //     commenterUsername.innerText = `${user.username}`
        // })
        commentContentDiv.appendChild(commenterUsername)

        const commentContent = document.createElement('p')
        commentContent.innerText = commentBodyInput.value
        commentContentDiv.appendChild(commentContent)
        commentArticle.appendChild(commentContentDiv)

        fetch(`http://localhost:3000/comments`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify({
                content: commentBodyInput.value,
                user_id: currentUser.id,
                shoe_id: tileData.id
            })
        })
        .then(response => response.json())
        .then(function(object){
            console.log(object)
            commentBodyInput.value = ""
        })
    })
    // commentBodyInput.value = ""
    // debugger
}

function toggleShowComments(commentDiv){
    if (commentDiv.style.display === "none"){
        commentDiv.style.display = "block"
    } else {
        commentDiv.style.display = "none"
    }
}

function renderDealOfTheDayItem(tileData){
    // 
    const banner = document.querySelector('#banner')
    // console.log(banner)
    let content = banner.querySelector('.content')
    // console.log(content)
    let header = content.querySelector('header')
    header.style.cursor = "pointer"

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
        decrementStock(tileData, renderDealOfTheDayItem)
    })

    let itemStockDisplay = content.querySelector('#item-stock-display')
    itemStockDisplay.innerText = `Remaining Stock: ${tileData.stock}`

    header.addEventListener('click', function(event){
        clearItemList()
        renderItemPage(tileData)
    })
    
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
    //     // 
    //     const newLikes = likes - 1
    //     // 
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
    //     // 
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
    //         // 
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
    //             // 
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
    //             // 
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
    //     // 
    //     const newLikes = likes + 1
    //     // 
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
    
// function deleteComment(commentArticle){
//     fetch(`http://localhost:3000/comments/${commentArticle.dataset.commentId}`, {
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
//     let commentParent = commentArticle.parentElement
//     commentParent.removeChild(commentArticle)
// }