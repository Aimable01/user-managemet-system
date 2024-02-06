const express = require("express");
const router = express.Router();

const controllers = require("../controllers/controllers");

router.get("/admin/register", controllers.adminRegisterGet);
router.post("/admin/register", controllers.adminRegisterPost);

router.get("/admin/login", controllers.adminLoginGet);
router.post("/admin/login", controllers.adminLoginPost);

router.get("/dash", controllers.dashGet);

//the user routes
router.get("/users", controllers.usersGet);
router.post("/users/register", controllers.userRegister);
router.put("/users/:id", controllers.userUpdate);
router.delete("/users/:id", controllers.userDelete);
