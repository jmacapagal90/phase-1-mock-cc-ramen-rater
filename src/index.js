// write your code here
const divRamenMenu = document.getElementById('ramen-menu')
const ramenName = document.getElementById('ramenName')
const restaurantName = document.getElementById('restaurantName')
const detailImg = document.getElementById('detail-image')
const ratingDisplay = document.getElementById('rating-display')
const commentDisplay = document.getElementById('comment-display')
const form = document.querySelector('form')

//this renders the Ramen menu bar
function renderRamenMenu(noods){
    noods.forEach(ramen =>{
        let img = document.createElement('img')
        img.src = ramen.image
        img.alt = ramen.name
        //this adds an event listener to the cards
        img.addEventListener('click',()=>{
            renderRestaurant(ramen)
        });
        divRamenMenu.appendChild(img)
    });
};

//rendering restaurant
function renderRestaurant(ramen){
    ramenName.innerText = ramen.name
    restaurantName.innerText = ramen.restaurant
    detailImg.alt = ramen.name
    detailImg.src = ramen.image
    ratingDisplay.innerText = ramen.rating
    commentDisplay.innerText = ramen.comment
};

//this will handle the inputs of the form and put them in the menu bar
function handleInput(e){
    let newName = e.target['new-name'].value
    let newRestaurant = e.target['new-restaurant'].value
    let newImage = e.target['new-image'].value
    let newRating = e.target['new-rating'].value
    let newComment = e.target['new-comment'].value
    //make a new object with inputs
    let newObj = {
        name: `${newName}`,
        restaurant: `${newRestaurant}`,
        image: `${newImage}`,
        rating: `${newRating}`,
        comment: `${newComment}`
    }
    let newArray = [newObj]
    renderRamenMenu(newArray)
    renderRestaurant(newObj);
}

/// Fetch requests
//this renders the menu bar
function fetchRamen(){
    return fetch('http://localhost:3000/ramens')
        .then(res => res.json())
        .then(noods => renderRamenMenu(noods))
}

//this posts the data
function defaultImage(){
    return fetch('http://localhost:3000/ramens/1')
        .then(res => res.json())
        .then(ramen => renderRestaurant(ramen))
}

//init to kick start the load ;)
function init(){
    fetchRamen()
    defaultImage()
    form.addEventListener('submit',(e)=>{
        e.preventDefault()
        handleInput(e)
    })
}

document.addEventListener('DOMContentLoaded', init);