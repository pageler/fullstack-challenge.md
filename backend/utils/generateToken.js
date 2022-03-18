import jwt from "jsonwebtoken";

const generateToken = (id) => {
    const certifyId = process.env.JWT_SECRET;
    return jwt.sign({ id }, certifyId, { expiresIn: "30d" });
};

export default generateToken;
