import express from "express";
import {
    createContact,
    deleteContact,
    getContactById,
    getContacts,
    updateContact,
} from "../controllers/contactController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(protect, getContacts);
router.route("/create").post(protect, createContact);
router
    .route("/:id")
    .get(getContactById)
    .put(protect, updateContact)
    .delete(protect, deleteContact);

export default router;
