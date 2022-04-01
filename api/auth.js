// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const express = require("express");
const router = express.router();
const isEmail = require("validator/lib/isEmail");

router.post("/", async (req, res) => {
  const { name, email, username, password, bio } = req.body.user;
  if (!isEmail(email)) {
    return res.status(401).send("Invalid Email");
  }
  if (password.length < 8) {
    return res.status(401).send("Password must be atleast 8 characters");
  }

  try {
    let user;
    user = await UserModel.findone({ email: email.tolowercase() });
  } catch (error) {
    return res.status(500).send(error);
  }
});
