const { Router } = require("express");
const route = Router();
const userController = require("../controllers/userController");
const auth = require('../middlewares/auth')
const admin = require('../middlewares/admin')

route.post("/api/auth/register", userController.register);
route.post("/api/auth/signin", userController.signing);
route.get("/api/auth/infor", auth , userController.getUser);
route.post('/api/auth/logout', userController.logout);
route.get("/api/admin/getAllUsers" , auth , userController.getAllUsers);

module.exports = route;