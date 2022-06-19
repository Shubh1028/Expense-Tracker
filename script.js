const amountInput = document.getElementById('amount');
const descriptionInput = document.getElementById('description');
const categoryInput = document.getElementById('category');
const btn = document.getElementById('btn');


btn.addEventListener('click',function(e) {
    e.preventDefault();
    let details = {
        amount: amountInput.value,
        description:descriptionInput.value,
        category: categoryInput.value
    }

    localStorage.setItem(details.description, JSON.stringify(details));

    amountInput.value="",
    descriptionInput.value="",
    categoryInput.value = ""

    const decrypt = JSON.parse(localStorage.getItem(details.description));

    addFront(decrypt);
    
})


function addFront(key) {
    const front = document.getElementById('content');

    const liItem = `<li id=${key.description}>${key.amount} - ${key.description} - ${key.category}<button onclick=remove('${key.description}')>Delete</button>
  <button onclick=edit('${key.amount}','${key.description}','${key.category}')>Edit</button>
  </li>`
  front.innerHTML += liItem;

}

function remove(key){
    localStorage.removeItem(key);
    removeFront(key);
}

function removeFront(key) {
    const parentNode = document.getElementById("content");
  const childNode = document.getElementById(key);
  parentNode.removeChild(childNode);
}

function edit(amount,description,category) {
   amountInput.value = amount;
   descriptionInput.value = description;
   categoryInput.value = category;

   remove(description);
  }

  window.addEventListener("DOMContentLoaded", (e) => {
  Object.keys(localStorage).forEach((key) => {
    if (key) {
      let stringified = localStorage.getItem(key);
      addFront(JSON.parse(stringified));
    }
  });
});

