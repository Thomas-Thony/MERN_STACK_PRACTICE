const express = require("express")
const {logger} = require("./core/logger.js") 
const app = express()
const path = require("path")
const cookieParser = require("cookie-parser")
const errorHandler = require("./core/errorHandler.js")
const cors = require("cors")
const corsOptions = require("./core/config/corsOptions.js")

require("dotenv").config()

const PORT = process.env.PORT || 3500

app.use(express.json())
app.use(logger)
app.use(cookieParser())
app.use(cors(corsOptions))
app.use(errorHandler)
app.use('/', express.static(path.join(__dirname, '/public')));
app.use('/', require('./routes/root.js'))
app.all('/{*any}', (req, res) => {
    res.status(404)
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views/Errors/', '404.html'))
    } else if(req.accepts('json')){
        res.json({message: "404 Non trouvé"})
    } else {
        res.type("txt").send("404 Non trouvé")
    }
});
app.listen(PORT, () => console.log(`Le serveur est lancé sur le port: ${PORT}`));