const express = require("express")
const app = express();
const cartRoutes = require("./routes/cart")
const ExpressError = require("./expressError")

app.use(express.json());
app.use("/items", cartRoutes);



app.get("/favicon.ico", (req, res, next) => {
    return res.sendStatus(204);
});



// app.use((req, res, next) => {
//     return new ExpressError("Not Found", 404);
//   });

app.use((err, req, res, next) => {
    res.status(err.status || 500);
  
    return res.json({
      error: err.message,
    });
  });

module.exports = app;