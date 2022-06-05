const express = require("express");
const router = express.Router();
const { nanoid } = require("nanoid");
const todos = require("../../data/todosArray");

router.use((req, res, next) => {
  console.log("Time: ", Date.now());
  next();
});

router.get("/", (req, res) => {
  res.json({ message: "Weather home page" });
  // http://localhost:3000/weather
});

router.get("/about", (req, res) => {
  res.json({ message: "it is /about page" });
  //http://localhost:3000/weather/about
});

////////////////////////////////////////////////////////////////////////////
router.get("/todos", (req, res) => {
  res.json({
    status: "success",
    code: 200,
    data: { todos },
  });
  //http://localhost:3000/weather/todos
});

router.get("/todos/:todoId", async (req, res) => {
  // http://localhost:3000/weather/todos/03
  const { todoId } = req.params;
  const todo = await todos.find((item) => item.id === todoId);
  res.json({
    status: "success",
    code: 200,
    data: { todo },
  });
});

router.post("/todos", (req, res) => {
  const { title, text } = req.body;
  const newTodo = {
    id: nanoid(),
    title,
    text,
    done: false,
  };
  todos.push(newTodo);
  res.json({
    status: "success",
    code: 201,
    data: {
      newTodo,
    },
  });
});

router.put("/todos/:todoId", async (req, res) => {
  const { todoId } = req.params;
  const { title, text } = req.body; // пришел запрос
  const todo = await todos.find((item) => item.id === todoId);
  todo.title = title;
  todo.text = text;
  res.json({
    status: "success",
    code: 200,
    data: { todo },
  });
});

router.patch("/todos/:todoId/status", async (req, res, next) => {
  const { todoId } = req.params;
  const { done } = req.body;
  const todo = await todos.find((item) => item.id === todoId);
  todo.done = done;
  res.json({
    status: "success",
    code: 200,
    data: { todo },
  });
});

router.delete("/todos/:todoId", async (req, res) => {
  const { todoId } = req.params;
  const filterTodos = await todos.filter((item) => item.id !== todoId);
  todos = [...filterTodos];
  res.status(204).json();
});

module.exports = router;
// module with his routers
