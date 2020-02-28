const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const jokes = require('../jokes/jokes-model')

router.post('/register', (req, res) => {
  let user = req.body
  
  const hash = bcrypt.hashSync(user.password, 10)

  user.password = hash

  jokes.add(user)
    .then(newUser => {
      res.status(200).json({message: `Succesfully Registered, ${newUser}`})
    })
    .catch(err => {
      res.status(500).json({message: "Something went wrong while trying to log in"})
    })
});

router.post('/login', (req, res) => {
  let { username, password } = req.body;

  jokes.findBy({ username })
    .first()
    .then(user => {
      if(user && bcrypt.compareSync(password, user.password)){
        const token = generateToken(user)

        res.status(200).json({message: `Welcome ${user.username}`, token, department: user.department})
      } else {
        res.status(400).json({message: "Couldn't find that user"})
      }
    })
});

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
    department: user.department,
    role: user.role || "user"
  }

  const secret = "keep it secret, keep it safe"

  const options = {
    expiresIn: "1h",
  }
  return jwt.sign(payload, secret, options)
}

module.exports = router;
