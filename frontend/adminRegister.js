const reg_btn = document.getElementById("register_btn");

reg_btn.addEventListener("click", () => {
  const div = document.createElement("div");
  div.setAttribute("id", "reg_form");
  const container = document.querySelector(".home_container");
  const landon = document.getElementById("landon");
  container.removeChild(landon);
  div.innerHTML = `
  <div class="bg-sky-700 rounded-lg m-5 p-4">
        <form
          id="admin_reg_form"
          class="flex justify-center items-center flex-col"
        >
          <label class="m-1 text-white" for="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Enter name..."
            required = "true"
            class="p-2 rounded-md"
          />
          <label class="m-1 text-white" for="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter email..."
            required = "true"
            class="p-2 rounded-md"
          />
          <label class="m-1 text-white" for="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter password..."
            required = "true"
            class="p-2 rounded-md"
          />
          <button id="admin_reg_submit"
            class="bg-blue-900 text-white text-lg px-2 py-1 rounded-lg hover:bg-sky-900 duration-500 m-5"
          >
            Register
          </button>
        </form>
      </div>`;
  container.appendChild(div);

  const adminReg_btn = document.getElementById("admin_reg_submit");
  adminReg_btn.addEventListener("click", (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const adminData = { name, email, password };
    console.log(adminData);

    fetch("http://localhost:4000/admin/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(adminData),
    })
      .then((res) => {
        if (res.ok) {
          registerSuccess();
        } else {
          console.log(`Error in login after register `);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  });
});

//the function to deal with the register sucess
function registerSuccess() {
  alert("Admin registered successfully");
  const reg_form = document.getElementById("reg_form");
  const container = document.querySelector(".home_container");
  container.removeChild(reg_form);
  const login_div = document.createElement("div");
  login_div.innerHTML = `
    <p>Admin registration successfull. Please login to access the dashboard</p>
  <a href="adminLogin.html"  class="bg-sky-400 text-lg px-2 py-1 rounded-lg hover:bg-sky-700 duration-500">login</a>`;
  container.appendChild(login_div);
}
