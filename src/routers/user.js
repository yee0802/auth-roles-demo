const express = require("express")
const {
  createUser,
  login,
  getUsers
} = require('../controllers/user')


const router = express.Router()

router.get("/", getUsers)
router.post("/", createUser)
router.post("/login", login)

module.exports = router
