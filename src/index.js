const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

// YOUR CODE HERE




const createToyCollectionHTML = (toyCard) => {
   return `<div class="card">
      <h2>${toyCard.name}</h2>
      <img src=${toyCard.image} class="toy-avatar" />
      <p data-id="${toyCard.id}" data-like-count="${toyCard.likes}">Like: ${toyCard.likes}</p>
    <button class="like-btn">Like <3</button>
  </div>`
};

const divTag = document.querySelector('#toy-collection');
const cardTag = divTag.getElementsByClassName("card")

const getAllToys = document.addEventListener('DOMContentLoaded', () => {
  fetch (`http://localhost:3000/toys`)
    .then(response => response.json())
    .then(parsedJSON => {

      parsedJSON.forEach((toyCard) => {
        divTag.innerHTML += createToyCollectionHTML(toyCard);

      })
    })
});




const formTag = toyForm.querySelector('.add-toy-form');
// submit listener here
formTag.addEventListener('submit', function(event) {
  event.preventDefault()

  // debugger
  const toyName = event.target.name.value;
  const toyUrl = event.target.image.value;

  fetch(`http://localhost:3000/toys`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "name": `${toyName}`,
      "image": `${toyUrl}`,
      "likes": 0
    })
    })
    .then(resp => resp.json())
    .then(toyObj => {
      divTag.innerHTML += createToyCollectionHTML(toyObj);
    })
  // showAddedCard(toyName, toyUrl);
  // debugger
})



// OR HERE!
addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {toyForm.style.display = 'block'

  } else {

    toyForm.style.display = 'none'
  }

})

divTag.addEventListener('click', (event) => {
// debugger
 if (event.target.tagName === 'BUTTON') {
    let pTag = event.target.parentElement.querySelector('p')

  let updatedLikeCount = parseInt(pTag.dataset.likeCount) + 1
  const likeId = pTag.dataset.id;

  updateLikeCount(likeId, updatedLikeCount)
  // debugger
  .then(updatedLikes => {
    pTag.dataset.likeCount = updatedLikeCount;
    pTag.innerText = `Like: ${updatedLikeCount}`;
   })
}
})

const updateLikeCount = (likeId, likeCount) => {
  return fetch(`http://localhost:3000/toys/${likeId}`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({"likes": likeCount})
  })
  .then(response => response.json())
}
