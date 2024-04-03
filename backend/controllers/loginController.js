require("dotenv").config();
const userModel = require("../models/userSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const express = require("express");
const dotenv = require("dotenv");

const loginController = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(404).json({
      message: "fields still missing..",
    });
    return;
  }

  const emailExist = await userModel.findOne({ email });
  console.log(emailExist);

  if (emailExist === null) {
    res.status(404).json({
      message: "Invalid credentials..",
      data: null,
      status: false,
    });
    return;
  }

  const comparePassword = await bcrypt.compare(password, emailExist.password);

  if (!comparePassword) {
    res.status(404).json({
      message: "Invalid credentials..",
      data: null,
      status: false,
    });
    return;
  }

  const obj = {
    _id: emailExist._id,
    email: emailExist.email,
    first_name: emailExist.first_name,
    last_name: emailExist.last_name,
  };

  const token = jwt.sign(obj, process.env.SECRET_KEY_TOKEN);
  res.status(200).json({
    message: "login successfully..",
    data: emailExist,
    status: true,
    token,
  });
};

module.exports = loginController;
