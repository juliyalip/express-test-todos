const express = require("express");
const router = express.Router();
import { nanoid } from "nanoid";
const todos = require("../../data/todosArray");

//http://localhost:3000/todos

router.get("/", (req, res) => {
  res.json({
    status: "success",
    code: 200,
    data: { todos },
  });
});

module.exports = router;
