const express = require ("express")
const app = express()
const port = 5000

const profs = require ("./routes/prof")
// ca nous permet d'acceder a req.body
app.use(express.json())
//  permet d'utiliser les route de mon fichier prof.js
app.use("/", profs)

app.listen(port, () => {
    console.log(`serveur started on port : ${port}`);
})