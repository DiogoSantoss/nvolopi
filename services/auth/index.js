const express = require("express")
const bodyParser = require("body-parser")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");

const { User } = require("./models")
require("./db").connect();

// openssl rand -base64 512
// fake key, only for development
const PRIV_KEY = "gV+SOO3f9+f/Go8ZdP0oRbVKMkkLPEf0Tb9vOnNs9R0L5azqpR+GRD7YvLh2Psbs8jbDPI/UEQoIqnQfUPXtiBqUp9G0Fh+2eFuwHk98eHOigUnEJADaMMf5JVcIZljoUBZM3xHJMA3+gDLUBEc6jK7zWPBmPbq7utohx53HVrkfHf2h2un52SAxqeHNkjG9dmImmAyF16JEzlTPjnWNBC9DFak2tMtytPMg+d1poxh8m7rXO2a3keEXtgSTH7jJYhjik3JdkWOnBWRiY1vQ9HU8iaOO1kpDiymcULVZu+Suy/hkYjhFIsNkQB3iuNVPOGRTJBAduBzuq22PSDC3LO7qLX3TMT0cDNoFGrHh+D7Gu4oebkAYjKOwrsgqZW6yGstEC64UwK1CpsZFssZZi50MTqe/OKNT1qCJbTbuKFmfDQ4vIIN7D/5oOqLgeS8m7KWq7rv8rZmtNaGmsblrCRhe3OaDDUu34O9QyaWd+k9AEiqMNxCfT152osMtkgKh0bKu6wgCZPr7OP0CDAjdYgvdsbHyHyQrevC/gpgiGTlXpDMf6RFkQP7q1yGNB8zFFbP9izRJeBQOTzMqCQoYCCWKBlRTvat2nYMsLs71Yan4xYNGpl79MtfgYzgapbKWmdf3PVw781zkCAW8ZE6swMVx73vvP/yNqK56lMaII5Y=" 
const JWT_EXPIRATION = 30 * 60 * 1000;

const port = 3000
const app = express()
app.use(bodyParser.json())

app.post("/create", async (req, res) => {
  // assume request is correct, might be problematic
  const {email, password} = req.body;
    bcrypt.hash(password).then(async hashedPwd => {
      // always try to create user
      // if email already in DB throw error
      User.create({
        email,
        password: hashedPwd,
      }).then(() => {
        res.status(200).send()
      }).catch(err => {
        res.status(400).send({"error": err})
      })
    }).catch(err => res.status(400).send({"error": err}))
})

app.post("/auth", async (req, res) => {
  // assume request is correct, might be problematic
  const {email, password} = req.body;
  User.findOne({"email": email})
    .then(user => {
      bcrypt.compare(password, user.password)
        .then(valid => {
          if (valid) {
            // generate jwt and send it back to the user
            const expiresAt = new Date();
            expiresAt.setTime(expiresAt.getTime() + JWT_EXPIRATION)
            const token = jwt.sign({
              "email": user.email,
              "expiresAt": expiresAt.getTime(),
            }, PRIV_KEY);
            res.status(200).send(token)
          } else {
            res.status(400).send({"error": "Authentication"})
          }
        })
        .catch(err => res.status(400).send({"error": err}))
    }).catch(err => res.status(400).send({"error": err}))
})

// TODO: should be sent on login
// set as an http only cookie
// maybe store it in the DB
app.post("/refresh", (req, res) => {
  console.log(req.body)
  res.send({ "token": "token" })
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
