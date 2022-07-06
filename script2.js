const amountInput = document.getElementById("amount");
const descriptionInput = document.getElementById("description");
const categoryInput = document.getElementById("category");
const btn = document.getElementById("btn");

btn.addEventListener("click", async function (e) {
  e.preventDefault();
  let details = {
    amount: amountInput.value,
    description: descriptionInput.value,
    category: categoryInput.value,
  };
  const postCall = await axios.post(
    "https://crudcrud.com/api/900bbe23b3cf40288af4c79dc31bcf7e/expenseTracker",
    details
  );
  try {
    addFront(postCall.data);
    (amountInput.value = ""),
      (descriptionInput.value = ""),
      (categoryInput.value = "");
  } catch (error) {
    console.log(error);
  }
});

function addFront(key) {
  const front = document.getElementById("content");

  const liItem = `<li id=${key._id}>${key.amount} - ${key.description} - ${key.category}<button onclick=remove('${key._id}')>Delete</button>
  <button onclick=edit('${key.amount}','${key.description}','${key.category}','${key._id}')>Edit</button>
  </li>`;
  front.innerHTML += liItem;
}

async function remove(key) {
  const deleteCall = await axios.delete(
    `https://crudcrud.com/api/900bbe23b3cf40288af4c79dc31bcf7e/expenseTracker/${key}`
  );
  try {
    removeFront(key);
  } catch (error) {
    console.log(error);
  }
}

function removeFront(key) {
  const parentNode = document.getElementById("content");
  const childNode = document.getElementById(key);
  parentNode.removeChild(childNode);
}

function edit(amount, description, category, user) {
  amountInput.value = amount;
  descriptionInput.value = description;
  categoryInput.value = category;

  remove(user);
}

window.addEventListener("DOMContentLoaded", async (e) => {
  const getCall = await axios.get(
    "https://crudcrud.com/api/900bbe23b3cf40288af4c79dc31bcf7e/expenseTracker"
  );
  try {
    for (let i = 0; i < getCall.data.length; i++) {
      addFront(getCall.data[i]);
    }
  } catch (error) {
    console.log(err);
  }
});
