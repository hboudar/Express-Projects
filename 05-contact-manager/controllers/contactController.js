const asyncHandler = require('express-async-handler')
const Contact = require('../models/contactModel')

const getAllContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find({user_id: req.user.userId});
    res.status(200).json(contacts);
});

const createContact = asyncHandler(async (req, res) => {
    const {name, email, phone} = req.body;
    if(!name || !email || !phone) {
        res.status(400);
        throw new Error('All fields are mandatory')
    }

    const contact = await Contact.create({
        name,
        email,
        phone,
        user_id: req.user.userId,
    });


    res.status(200).json(contact);
});



const getContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact Not Found")
    }
    res.status(200).json(contact);
});



const updateContact = asyncHandler(async (req, res) => {
    const check = await Contact.findById(req.params.id);
    if (!check) {
        res.status(404);
        throw new Error("Contact Not Found")
    }

    if (check.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error('User don`t have permission to update this contact')
    }


    const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, {new: true});
    if (!contact) {
        res.status(404);
        throw new Error("Contact Not Found")
    }
    res.status(200).json(contact);
});



const deleteContact = asyncHandler(async (req, res) => {
    const check = await Contact.findById(req.params.id);
    if (!check) {
        res.status(404);
        throw new Error("Contact Not Found")
    }

    if (check.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error('User don`t have permission to update this contact')
    }

    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact Not Found")
    }
    res.status(200).json(contact);
});



module.exports = {
    getAllContacts,
    createContact,
    getContact,
    updateContact,
    deleteContact
};