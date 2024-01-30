const users = require('../data/users.js')
const jwt = require('jsonwebtoken')

const getUsers = (req, res) => {
  res.json({ users })
}

const createUser = (req, res) => {
  const {
    username,
    password
  } = req.body

  if (!username || !password) {
    return res.status(400).json({
      error: "Missing fields in request body"
    })
  }

  if (users.find(u => u.username === username)) {
    return res.status(409).json({ error: "A user with the provided username already exists" })
  }

  const createdUser = { username, password, role: 'USER' }

  users.push(createdUser)

  return res.status(201).json({ user: createdUser })
}

const login = (req, res) => {
  const {
    username,
    password
  } = req.body

  if (!username || !password) {
    return res.status(400).json({
      error: "Missing fields in request body"
    })
  }

  const foundUser = users.find(u => u.username === username)

  if (!foundUser || foundUser.password !== password) {
    return res.status(404).json({ error: "Invalid username or password" })
  }

  const token = jwt.sign({ username }, 'secret')

  res.status(200).json({ token })
}

module.exports = {
  createUser,
  login,
  getUsers
}
