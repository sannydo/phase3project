document.addEventListener("DOMContentLoaded", function() {
    fetch('http://localhost:3000/shoes')
    .then(resource => resource.json())
    .then((data) => {
        // addPictureToPage(data)
        // renderComments(data)
        // console.log(data)
        addTilesToPage(data)
    })
});

function addTilesToPage(tiles){
    const shoeTileParent = document.querySelector(".posts")
    // console.log(tiles)
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
        shoeImage.src = `${tileData.image_url}`

        shoeName.addEventListener('click', function(event){
                //Sanny
            console.log(event.target)
            clearPage()
            renderItemPage(tileData)//event.target.item
        })

        shoeTile.appendChild(shoeImage)
        shoeTile.appendChild(shoeName)
        shoeTile.appendChild(shoePrice)
        shoeTile.appendChild(addToCartButton)
        // debugger
        shoeTileParent.appendChild(shoeTile)
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

    let itemPrice = header.querySelector('p')
    itemPrice.innerText = `${tileData.price}`

    let itemDescription = content.querySelector('#item-description')
    itemDescription.innerText = `placeholder item description`

    let buttonParentUl = content.querySelector('ul')

    let addToCartButton = buttonParentUl.querySelector('a')
    addToCartButton.innerText = "Add To Cart"

    // const shoeTile = document.createElement('article')
        
    // const shoeName = document.createElement('h3')
    // shoeName.innerText = `${tileData.name}`

    // const shoePrice = document.createElement('p')
    // shoePrice.innerText = `${tileData.price}`
    // const addToCartButton = document.createElement('button')
    // addToCartButton.innerText = "Add To Cart"
    // addToCartButton.addEventListener('click', function(event){
    //     console.log(event.target)
    // })

    // const shoeImage = document.createElement('img')
    // shoeImage.src = `${tileData.image_url}`
    // shoeTile.appendChild(shoeImage)
    // shoeTile.appendChild(shoeName)
    // shoeTile.appendChild(shoePrice)
    // shoeTile.appendChild(addToCartButton)
    // // debugger
    // shoeTileParent.appendChild(shoeTile)
}
    
function clearPage(){
    console.log("You made it")
    
    // removeAllChildNodes(banner)
    const productList = document.querySelector('#product-list')
    removeAllChildNodes(productList)
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
    // }
    
    
    
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