const login_btn = document.getElementById("admin_login");
login_btn.addEventListener("click", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const loginData = { name, email, password };

  fetch("http://localhost:4000/admin/login", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(loginData),
  })
    .then((res) => {
      if (res.ok) console.log("sent data successful");
      else console.log("failed to send data");

      return res.json();
    })
    .then((data) => {
      console.log(data);
      const email = data.email;
      if (!email) {
        console.log("please register as admin");
      } else {
        console.log(`${email}: logged in `);
        alert("Login successful");

        fetch("http://localhost:4000/dash")
          .then((res) => {
            if (res.ok) {
              console.log("Access granted");
              window.location.href = "dashboard.html";
            } else {
              console.log("please login");
              window.location.href = "adminLogin.html";
            }
          })
          .catch((err) => {
            console.error("Error:", err);
          });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});
