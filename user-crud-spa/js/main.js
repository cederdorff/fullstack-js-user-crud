"use strict";

// ========== GLOBAL VARS ==========

let _selectedUserId = "";

// ========== READ ==========

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
        <button onclick="selectUser('${user.id}','${user.name}', '${user.mail}')">Update</button>
        <button onclick="deleteUser('${user.id}')">Delete</button>
      </article>
      `;
  }
  document.querySelector("#grid-users").innerHTML = htmlTemplate;
  showLoader(false);
}

// ========== CREATE ==========

async function createUser() {
  showLoader(true);
  // references to input fields
  let nameInput = document.querySelector("#name");
  let mailInput = document.querySelector("#mail");

  let newUser = {
    name: nameInput.value,
    mail: mailInput.value
  };

  let response = await fetch("http://localhost:3000/users", {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newUser) // body data type must match "Content-Type" header
  });

  let users = await response.json();

  //updating the DOM
  appendUsers(users);
  //navigating back
  navigateTo("users");

  // reset
  nameInput.value = "";
  mailInput.value = "";
}

// ========== UPDATE ==========

function selectUser(id, name, mail) {
  // references to the input fields
  let nameInput = document.querySelector('#name-update');
  let mailInput = document.querySelector('#mail-update');
  nameInput.value = name;
  mailInput.value = mail;
  _selectedUserId = id;
  navigateTo("update");
}

async function updateUser() {
  showLoader(true);
  // references to input fields
  let nameInput = document.querySelector("#name-update");
  let mailInput = document.querySelector("#mail-update");

  let newUser = {
    name: nameInput.value,
    mail: mailInput.value
  };

  let response = await fetch(`http://localhost:3000/users/${_selectedUserId}`, {
    method: "PUT", // *GET, POST, PUT, DELETE, etc.
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newUser) // body data type must match "Content-Type" header
  });

  let users = await response.json();

  //updating the DOM
  appendUsers(users);
  //navigating back
  navigateTo("users");

  //reset
  nameInput.value = "";
  mailInput.value = "";
}

// ========== DELETE ==========
async function deleteUser(id) {
  let response = await fetch(`http://localhost:3000/users/${id}`, {
    method: "DELETE"
  });
  let users = await response.json();
  //updating the DOM
  appendUsers(users);
}