import mongoose from "mongoose";

const contactSchema = mongoose.Schema({
    firstName: {
        type: "string",
        required: true,
    },
    lastName: {
        type: "string",
        required: true,
    },
    email: {
        type: "string",
        required: true,
    },
    phoneNumber: {
        type: "string",
        required: true,
    },
    age: {
        type: "string",
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
});

const Contact = mongoose.model("Contact", contactSchema);

export default Contact;
