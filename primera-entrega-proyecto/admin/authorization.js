const express = require("express");

const admin = true;
const authorization = (req, res, next) => {
  if (admin) {
    next();
  } else {
    res.send({
      status: "error",
      error: `route /api/productos${req.url} unauthorized method: ${req.method}`,
    });
  }
};

module.exports = authorization;