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

    // localStorage.setItem(details.description, JSON.stringify(details));

    axios.post('https://crudcrud.com/api/ebd01ed641cc4c4c85192d4956462b48/expenseTracker',details)
     .then((response) => {
      addFront(response.data)
      console.log(response)
     })
     .catch((err) => {
      console.log(err)
     })

    amountInput.value="",
    descriptionInput.value="",
    categoryInput.value = ""

    // const decrypt = JSON.parse(localStorage.getItem(details.description));

    // addFront(decrypt);
    
})


function addFront(key) {
    const front = document.getElementById('content');

    const liItem = `<li id=${key._id}>${key.amount} - ${key.description} - ${key.category}<button onclick=remove('${key._id}')>Delete</button>
  <button onclick=edit('${key.amount}','${key.description}','${key.category}','${key._id}')>Edit</button>
  </li>`
  front.innerHTML += liItem;
}

function remove(key){
    // localStorage.removeItem(key);
    // removeFront(key);
    axios.delete(`https://crudcrud.com/api/ebd01ed641cc4c4c85192d4956462b48/expenseTracker/${key}`)
     .then((response) => {
      removeFront(key);
     })
     .catch((err) => {
      console.log(err)
     })
    // removeFront(key);
}

function removeFront(key) {
    const parentNode = document.getElementById("content");
  const childNode = document.getElementById(key);
  parentNode.removeChild(childNode);
}

function edit(amount,description,category,user) {
   amountInput.value = amount;
   descriptionInput.value = description;
   categoryInput.value = category;

   remove(user);
  }

  window.addEventListener("DOMContentLoaded", (e) => {
  // Object.keys(localStorage).forEach((key) => {
  //   if (key) {
  //     let stringified = localStorage.getItem(key);
  //     addFront(JSON.parse(stringified));
  //   }
  // });

  axios.get('https://crudcrud.com/api/ebd01ed641cc4c4c85192d4956462b48/expenseTracker')
  .then((response) => {
    for(let i =0; i<response.data.length;i++){
      addFront(response.data[i])
    }
  })
  .catch((err) => {
    console.log(err);
  })
});

