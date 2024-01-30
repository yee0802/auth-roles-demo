const posts = require('../data/posts.js')

const getPosts = (req, res) => {
    res.json({ posts })
}

module.exports = {
    getPosts
}