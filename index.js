const express = require("express")
const cors = require("cors")

const { connection } = require("./config/db")
const {adRouter} = require("./routes/classifiedRoutes")

const app = express()
app.use(cors({
    origin: "*"
}))

app.use(express.json())

app.get("/", (req, res) => {
    res.send("Welcome to Backend")
})

app.use("/classifieds", adRouter)

app.listen(8013, async () => {
    try{
        await connection
        console.log("Connected to DB")
    }catch(err){
        console.log("Error while connection to DB", err)
    }
    console.log("listening on port 8013")
})