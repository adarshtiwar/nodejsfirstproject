
const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const { log } = require("console");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.get("/", function (req, res) {
  fs.readdir("./files", function (err, files) {
    res.render("index", { files: files });
  });
});
app.get("/file/:filename", function (req, res) {
 res.render("edit")
});



app.get("/file/:filename", function (req, res) {
  fs.readFile(`./files/${req.params.filename}`, "utf-8", function (err, filedata) {
    if (err) {
      return res.status(500).send("Error reading the file");
    }
   
    res.render("show");  
   
  });
});


app.post("/create", function (req, res) {
  
  
  fs.writeFile(`./files/${req.body.title.split(" ").join("")}.txt`, req.body.detail, function (err) {
    res.redirect("/");
  });
}); 

app.listen(3000, function () {
  console.log("Server running on http://localhost:3000");
});
