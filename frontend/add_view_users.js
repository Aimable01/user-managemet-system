const addUser_btn = document.getElementById("addUser");
const body = document.getElementById("body");
addUser_btn.addEventListener("click", () => {
  const tableView = document.getElementById("tableView");
  body.removeChild(tableView);

  //Add a button to go back
  const backbtn = document.createElement("button");
  backbtn.innerHTML = `        <p
  id="back"
  class="bg-sky-800 text-white text-lg px-2 py-1 rounded-lg hover:bg-sky-900 duration-500 m-5"
>
  Back
</p>`;
  body.appendChild(backbtn);

  //add event listener to the back button
  const back = document.getElementById("back");
  back.addEventListener("click", () => {
    console.log("back clicked");

    back.classList.add("hidden");
    //remove the form
    const form = document.getElementById("form_div");
    body.removeChild(form);

    body.appendChild(tableView);
  });

  //make a form to add user
  const div = document.createElement("div");
  div.setAttribute("id", "form_div");
  div.innerHTML = `      <form
  id="admin_reg_form"
  class="flex justify-center items-center flex-col mt-5 bg-sky-700 rounded-lg p-5 mx-96"
>
  <label class="m-1" for="name">Name</label>
  <input
    type="text"
    name="name"
    id="name1"
    placeholder="Enter name..."
    required="true"
    class="p-2 rounded-md"
  />
  <label class="m-1" for="email">Email</label>
  <input
    type="email"
    name="email"
    id="email1"
    placeholder="Enter email..."
    required="true"
    class="p-2 rounded-md"
  />
  <button
    id="createUser"
    class="bg-sky-800 text-white text-lg px-2 py-1 rounded-lg hover:bg-sky-900 duration-500 m-5"
  >
    Add user
  </button>
</form>`;

  body.appendChild(div);

  const createUser_btn = document.getElementById("createUser");
  createUser_btn.addEventListener("click", (e) => {
    e.preventDefault();
    create_user();
  });
});

const viewUsers_btn = document.getElementById("viewUsers");
viewUsers_btn.addEventListener("click", viewUsers);

function viewUsers() {
  fetch("http://localhost:4000/users")
    .then((res) => {
      if (res.ok) {
        console.log("fetch successful");
        return res.json();
      } else {
        console.log("failed to fetch");
      }
    })
    .then((users) => {
      console.log(users);
      users.forEach((user) => {
        const tbody = document.getElementById("tbody");
        console.log(` The table: ${tbody}`);
        const tr = document.createElement("tr");
        tr.innerHTML = `
      <td class="ml-5">${user.name}</td>
      <td class="ml-5">${user.email}</td>
      <td>
      <button
        data_id = "${user._id}"
          class="updateBtn bg-sky-800 text-white text-sm px-2 py-1 rounded-lg hover:bg-sky-900 duration-500 m-1">
          Update</button>
          <button 
          data_id="${user._id}"
           class="delBtn bg-sky-800 text-white text-sm px-2 py-1 rounded-lg hover:bg-sky-900 duration-500">
           Delete</button>
           </td>`;
        tbody.appendChild(tr);
      });

      const updateBtns = document.querySelectorAll(".updateBtn");
      updateBtns.forEach((updBtn) => {
        updBtn.addEventListener("click", () => {
          const userId = updBtn.getAttribute("data_id");
          console.log(`updating user: ${userId}`);
          showForm(userId);
        });
      });

      const delBtns = document.querySelectorAll(".delBtn");
      delBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
          const id = btn.getAttribute("data_id");
          console.log(`Deleting user with id: ${id}`);
          deleteUser(id);
        });
      });
    })
    .catch((err) => {
      console.log(`Error in fetching data: ${err}`);
    });
}

//function to delete a user
function deleteUser(id) {
  alert("Are you sure you want to delete this user?");
  fetch(`http://localhost:4000/users/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (res.ok) {
        console.log("The user deleted");
        alert("User deleted successfully");
        location.reload();
      } else {
        console.log("Failed to delete the user");
      }
    })
    .catch((err) => {
      console.log(`Error in deleting :${err}`);
    });
}

//the function to create a user
function create_user() {
  console.log("creating user");

  const name = document.getElementById("name1").value;
  const email = document.getElementById("email1").value;

  const userData = { name, email };
  console.log(userData);

  fetch("http://localhost:4000/users/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  })
    .then((res) => {
      if (res.ok) {
        console.log("fetched sucess");
        return res.json();
      } else {
        console.log("sent request but failed to response");
      }
    })
    .then((user) => {
      console.log(user);
      alert("User created successfully");
      location.reload();
    })
    .catch((err) => {
      console.log(err);
    });
}

//function to show form
function showForm(userId) {
  fetch(`http://localhost:4000/users/${userId}`)
    .then((res) => {
      if (res.ok) {
        console.log(`fetch sucessful`);
        return res.json();
      } else {
        console.log("Failed to get user");
      }
    })
    .then((data) => {
      const body = document.getElementById("realBody");
      console.log(body);
      console.log(`----------------------------------------`);
      console.log(data);
      const div = document.createElement("div");
      div.innerHTML = `
      <form
  id="user_login"
  class="flex justify-center items-center flex-col mt-5 bg-sky-700 rounded-lg p-5 mx-96"
>
  <label class="m-1" for="name">Name</label>
  <input
    type="text"
    name="name"
    id="nameU"
    value = "${data.user.name}"
    class="p-2 rounded-md"
  />
  <label class="m-1" for="email">Email</label>
  <input
    type="email"
    name="email"
    id="emailU"
    value = "${data.user.email}"
    class="p-2 rounded-md"
  />
  <button type = "submit"
    data_id = "${data.user._id}"
    class="bg-sky-800 text-white text-lg px-2 py-1 rounded-lg hover:bg-sky-900 duration-500 m-5"
  >
    Update
  </button>
</form>`;
      body.appendChild(div);

      const form = document.getElementById("user_login");
      form.addEventListener("submit", (e) => {
        e.preventDefault();

        const nameU = document.getElementById("nameU").value;
        const emailU = document.getElementById("emailU").value;

        const updatingUserData = { name: nameU, email: emailU };
        console.log(` updating the user ${updatingUserData.name}`);

        updatedUser(userId, updatingUserData);
      });
    })
    .catch((err) => {
      console.log(err);
    });
}

//function post the updates
function updatedUser(userId, updatingUserData) {
  fetch(`http://localhost:4000/users/${userId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatingUserData),
  })
    .then((res) => {
      if (res.ok) {
        console.log("user updated successfully");
        alert("User updated successfully");
        location.reload();
      } else {
        console.log("failed to update user");
      }
    })
    .catch((err) => {
      console.log(`${err} in updating user`);
    });
}
