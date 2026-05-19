const Utilisateur = require("../models/Utilisateur")
const Note = require("../models/Note")
const asyncHandler = require("express-async-handler")
const bcrypt = require("bcrypt")

// @desc Récupère tous les utilisateurs
// @route GET /users
// @access Private
const getAllUsers = asyncHandler(async (req, res) => {
    const users = await Utilisateur.find().select('-password').lean();
});

// @desc Crée un utilisateur
// @route POST /users
// @access Private
const createUser = asyncHandler(async (req, res) => {

});

// @desc Met à jour un utilisateur
// @route PATCH /users
// @access Private
const updateUser = asyncHandler(async (req, res) => {

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