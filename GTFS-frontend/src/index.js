document.addEventListener("DOMContentLoaded", function() {
    fetch('http://localhost:3000/users')
    .then(resource => resource.json())
    .then((data) => {
        // addPictureToPage(data)
        // renderComments(data)
        // console.log(data)
        addTilesToPage(data)
    })
});

function addTilesToPage(tiles){
    const shoeTileParent = document.querySelector(".shoe-tiles")
    tiles.forEach(renderTile())

    function renderTile(tileData){
        const shoeTile = document.createElement('article')
        const shoeName = document.createElement('p')
        const shoePrice = document.createElement('p')
    }
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
    
    
    // function removeAllChildNodes(parent) {
    //     while (parent.firstChild) {
    //         parent.removeChild(parent.firstChild);
    //     }
    // }
    
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