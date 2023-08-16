const express = require("express");
const app = express();
const users = [
  { id: 1, name: "user 1" },
  { id: 2, name: "user 2" },
  { id: 3, name: "user 3" },
  { id: 4, name: "user 4" },
  { id: 5, name: "user 5" },
  { id: 6, name: "user 6" },
  { id: 7, name: "user 7" },
  { id: 8, name: "user 8" },
  { id: 9, name: "user 9" },
];
const posts = [
  { id: 1, name: "post 1" },
  { id: 2, name: "post 2" },
  { id: 3, name: "post 3" },
  { id: 4, name: "post 4" },
  { id: 5, name: "post 5" },
  { id: 6, name: "post 6" },
  { id: 7, name: "post 7" },
  { id: 8, name: "post 8" },
  { id: 9, name: "post 9" },
];

app.use("/users", paginatedReuslt(users), (req, res) => {
  const result = res.pagenatedResult;
  console.log("result", result);
  res.status(200).json(result);
});
app.use("/posts", paginatedReuslt(posts), (req, res) => {
  const result = res.pagenatedResult;
  console.log("result", result);
  res.status(200).json(result);
});
function paginatedReuslt(model) {
  return (req, res, next) => {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    let startIndex = (page - 1) * limit;
    let endIdnex = page * limit;
    let result = {};
    if (startIndex > 0) {
      result.next = {
        page: page + 1,
        limit,
      };
    }
    if (endIdnex < model.length) {
      result.previous = {
        page: page - 1,
        limit,
      };
    }
    result.data = model.slice(startIndex, endIdnex);
    res.pagenatedResult = result;
    next();
  };
}
app.listen(3000);
