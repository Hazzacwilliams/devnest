import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import * as userModel from "../models/userModels.js";


const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.getUserByEmail(email);
        if(!user){
            return res.status(401).json({ error: 'Invalid Email!' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(401).json({ error: 'Invalid Password!' });
        }
        const token = jwt.sign(
            { id: user.userid, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        const { password:_, ...safeUser } = user;
        res.json({ message: "Login Successful!", token, user: safeUser });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: `Unable to login user ${err.message}` });
    }

}

export { loginUser };