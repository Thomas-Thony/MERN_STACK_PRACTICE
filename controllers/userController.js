const Utilisateur = require("../models/Utilisateur")
const Note = require("../models/Note")
const asyncHandler = require("express-async-handler")
const bcrypt = require("bcrypt")

// @desc Récupère tous les utilisateurs
// @route GET /users
// @access Private
const getAllUsers = asyncHandler(async (req, res) => {
    const users = await Utilisateur.find().select('-password').lean();
    if (!users) {
        return res.status(400).json({ message: "Aucun utilisateur trouvé !" });
    }
    res.json(users);
});

// @desc Crée un utilisateur
// @route POST /users
// @access Private
const createUser = asyncHandler(async (req, res) => {
    const { username, password, roles } = req.body;
    if (!username || !password || !Array.isArray(roles) || !roles.length) {
        return res.status(400).json({ message: "Un ou plusieurs champs sont manquants !" });
    }

    const duplicate = await Utilisateur.findOne({ username }).lean().exec();
    if (duplicate) {
        return res.status(409).json({ message: "Impossible de crée cet utilisateur, il existe déjà !" }); // Note : Erreur HTTP 409 => La demande n'a pas pu être exécutée car conflit de ressources
    }

    const hashedPassword = await bcrypt.hash(password, 10); // Tours de sel (oui c'est mieux en anglais: 'Salt rounds')
    
    const userObject = { username, "password": hashedPassword, roles }
    
    const user = await Utilisateur.create(userObject);

    if (user) { //Si la création est réussie
        res.status(201).json({message: `Le nouvel utilisateur ${username} a été créé avec succès !`})
    } else {
        res.status(400).json({ message: "Données reçues invalides !"});
    }
});

// @desc Met à jour un utilisateur
// @route PATCH /users
// @access Private
const updateUser = asyncHandler(async (req, res) => {
    const { id, username, roles, active, password } = req.body;

    if (!id || !username || !Array.isArray(roles) || roles.length || typeof(active) !== 'boolean') {
        return res.status(400).json({ message: "Tous les champs sont requis !" });
    }
});

// @desc Supprime un utilisateur
// @route DELETE /users
// @access Private
const deleteUser = asyncHandler(async (req, res) => {

});

module.exports = {
    getAllUsers,
    createUser,
    updateUser,
    deleteUser
}