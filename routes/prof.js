const express = require ("express")
const app = express()
const { body, validationResult } = require('express-validator');

let profs = require ('../prof.json')

// route qui permet de voir tous les prof
app.get("/profs", (req,res) => {
    res.status(200).json(profs)
})
// route qui permet de selectionner un prof grace a url dynamique
app.get("/profs/:slug", (req, res) => {
    // avec cette ligne on recupère le parametre dynamique
    const {slug} = req.params
    
    const selectedProf = profs.find( prof => prof.slug === slug.toLowerCase())
    res.status(200).json(selectedProf)
})

// route qui permet de rajouter un nouveau prof dans mon fichier profs.json
app.post("/profs",
    body("name")
    .exists()
    .withMessage("clef name demender")
    .isLength({ min:4  })
    .withMessage("name trop court"),
    body("password")
    .exists()
    .withMessage("clef password demender")
    .isLength({ min:8 })
    .withMessage("password trop court"),
    body('city')
    .optional()
    .isIn(["paris", "tokyo", "los-angeles", "lisbonne"]).withMessage("valeur de la ville pas accepter"),
    body("email")
    .exists()
    .isEmail()
    .withMessage("votre email n'est pas valide"),
    (req, res) => {
        // je stock errors 
        const { errors } = validationResult(req)
        console.log(errors)
        // je dit si mon array d error est plus long que 0 alors renvoie moi l'erreur
        // sinon push moi mon prof dan le json profs
        if (errors.length > 0) {
            res.status(400).json({ errors })
        } else {
            // console.log("resulta de la reponse de postman=>", req.body);
            // je stock ma reponse de req.body dans une const
            const newProf = {
            ...req.body
            }
            // je push le nouveau prof dans mon json
            profs = [...profs, newProf ]
            res.status(200).json(newProf)
            // console.log(" resulta du post =>",heros);
        }
})


module.exports = app