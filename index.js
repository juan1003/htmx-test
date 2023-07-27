const express = require("express")
const logger = require("morgan")('dev')
const path = require("path")
const port = process.env.PORT || 3000

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, "public")))
app.use(logger)

let counter = 0;

app.get("/", function(req, res, next) {
    res.sendFile(path.join(__dirname, "/index.html"))
})

app.get("/home", function(req, res, next) {
    res.send(`
        <h1>Home</h1>
    `)
})

app.get("/about", function(req, res, next) {
    res.send(`
        <h1>About</h1>
    `)
})

app.get("/contact", function(req, res, next) {
    res.send(`
        <h1>Contact</h1>
    `)
})

app.get("/clicked", function(req, res, next){
    const template = `
        <div class="p-3 rounded bg-[#454545] mt-5 ml-3 w-[350px]">
            <h1>Clicked</h1>
            <span id="counter">${counter} times</span>
            <button class="px-3 bg-red-700" hx-post="/clicked" hx-swap="innerText" hx-target="#counter">Increase</button>
        </div>
    `

    res.send(template)
})

app.post("/clicked", function(req, res, next){
    counter++

    if(counter === 1) {
        res.send(`${counter} click`)
        return
    }

    res.send(`${counter} clicks`);
})

app.listen(port, function(){
    console.log(`Listening on http://localhost:${port}`)
})
