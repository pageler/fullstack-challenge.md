import Contact from "../models/contactModel.js";
import asyncHandler from "express-async-handler";

const getContacts = async (req, res) => {
    const contacts = await Contact.find({ user: req.user._id });
    res.json(contacts);
};

const createContact = asyncHandler(async (req, res) => {
    const { firstName, lastName, email, phoneNumber, age } = req.body;

    if (!firstName || !lastName || !email || !phoneNumber || !age) {
        res.status(400);
        throw new Error("Please fill all fields");
        return;
    } else {
        const contact = new Contact({
            user: req.user._id,
            firstName,
            lastName,
            email,
            phoneNumber,
            age,
        });
        const createContact = await contact.save(); // Saved to database
    }
});

const getContactById = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);

    if (contact) {
        res.json(contact);
    } else {
        res.status(404).json({ message: "Contact not found" });
    }
});

const updateContact = asyncHandler(async (req, res) => {
    const { firstName, lastName, email, phoneNumber, age } = req.body;

    const contact = await Contact.findById(req.params.id);

    if (contact.user.toString() !== req.user._id.toString()) {
        res.status(401);
        throw new Error("Not authorized, user id failed");
    }
    if (contact) {
        contact.firstName = firstName;
        contact.lastName = lastName;
        contact.email = email;
        contact.phoneNumber = phoneNumber;
        contact.age = age;

        const updatedContact = await contact.save();
        res.json(updatedContact);
    } else {
        res.status(404);
        throw new Error("Contact not found");
    }
});

const deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);

    if (contact.user.toString() !== req.user._id.toString()) {
        res.status(401);
        throw new Error("Not authorized, user id failed");
    }

    if (contact) {
        await contact.remove();
        res.json({ message: "Contact Removed" });
    } else {
        res.status(404);
        throw new Error("Contact not found");
    }
});

export {
    getContacts,
    createContact,
    getContactById,
    updateContact,
    deleteContact,
};
