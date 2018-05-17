var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var app = express();

// App Config
mongoose.connect("mongodb://localhost/restfull_blog_app");

app.set("view engine", "ejs")
app.use(express.static("public"))
app.use(bodyParser.urlencoded( { extended: true } ) )

// Mongoose/Model Config
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: { type: Date, default: Date.now }
})

// Compile to model
var Blog = mongoose.model("Blog", blogSchema);

// RESTFUL Routes
app.get("/", (req, res) => {
    res.redirect("/blogs")
})

app.get("/blogs", (req, res) => {
    // Retrive the blogs from the DB
    Blog.find({}, (err, blogs) => {
        if (err) { console.log("error")}
        else { res.render("index", { blogs: blogs }) }
    })
})

app.get('/about', (req, res) => {
    res.send('about');
});

app.get('/contact', (req, res) => {
    res.send('contact');
});

app.get('/pricing', (req, res) => {
    res.send('pricing');
});

app.get('/careers', (req, res) => {
    res.send('careers');
});


app.listen(process.env.PORT || 3000, () => {
    console.log("blog is running");
})