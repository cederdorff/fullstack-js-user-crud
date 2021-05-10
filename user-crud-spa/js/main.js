"use strict";

async function loadPersons() {
  let response = await fetch("http://localhost:3000/users");
  let users = await response.json();
  appendUsers(users);
}

loadPersons();

function appendUsers(users) {
  let htmlTemplate = "";
  for (let user of users) {
    htmlTemplate += /*html*/ `
      <article>
        <h3>${user.name}</h3>
        <p><a href="mailto:${user.mail}">${user.mail}</a></p>
        <button onclick="deleteUser('${user.id}')">Delete</button>
      </article>
      `;
  }
  document.querySelector("#grid-users").innerHTML = htmlTemplate;
  showLoader(false);
}

async function createUser() {
  showLoader(true);
  // references to input fields
  let nameInput = document.querySelector('#name');
  let mailInput = document.querySelector('#mail');

  let newUser = {
    name: nameInput.value,
    mail: mailInput.value
  };

  let response = await fetch("http://localhost:3000/users", {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newUser) // body data type must match "Content-Type" header
  });

  let users = await response.json();

  appendUsers(users);
  navigateTo("users");

  // //reset
  nameInput.value = "";
  mailInput.value = "";
}

async function deleteUser(id) {
  let response = await fetch(`http://localhost:3000/users/${id}`, {
    method: 'DELETE'
  });
  let users = await response.json();
  appendUsers(users);
}