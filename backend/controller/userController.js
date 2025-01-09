import hashedPassword from '../utils/hashedPassword.js';
import * as userModel from '../models/userModels.js';
import passport from '../config/authConfig.js';

const getAllUsers = async (req, res) => {
    try {
        const users = await userModel.getAllUsers();
        res.json(users);
    } catch (err) {
        console.error(`Unable to fetch users: ${err}`);
        res.status(500).json({ error: 'Failed to fetch users!'});
    }
}

const createUser = async (req, res) => {
    console.log(req.body);
    const {username, email, name, mobile, region, password} = req.body;
    const passwordHash = await hashedPassword(password);
    console.log(passwordHash);
    try {
        const newUser = await userModel.createUser(username, email, name, mobile, region, passwordHash);
        res.status(201).json(newUser)
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to create user!'});
    }
}

const updateUser = async (req, res) => {
    const { userID } = req.params;
    const {username, email, name, mobile, region, password} = req.body;
    const passwordHash = await hashedPassword(password);
    try {
        const updatedUser = await userModel.updateUser(userID, username, email, name, mobile, region, passwordHash);
        if(!updateUser) {
            return res.status(401).json({ error: "User not found!" });
        }
        res.json(updatedUser)
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to update user!" });
    }
}

const deleteUser = async (req, res) => {
    const { userID } = req.params;
    try {
        const deletedUser = await userModel.deleteUser(userID);
        if(!deletedUser){
            return res.status(401).json({ error: "User not found!"})
        }
        res.json({ message: `User ${userID} was successfully deleted!`});
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to delete user!"});
    }
}

const loginUser = async (req, res, next) => {
    console.log(req.body);
    passport.authenticate('local', (err, user, info) => {
        if(err) {
            return res.status(500).json({ error: "An error occured during login process" });
        } 
        if(!user) {
            return res.status(401).json({ error: info.message });
        }
        req.login(user, (err) => {
            console.log(user);
            if(err) {
                console.error(err);
                return res.status(500).json({ error: "Failed to login" });
            }
            res.json({ message: "Login successful", user});
        });
    })(req, res, next);
};

const logoutUser = async (req, res) => {
    req.logout(err => {
        if(err) {
            console.error(err);
            return res.status(500).json({ message: "Unable to logout." });
        }
        res.json({ message: "Logout Successful."});
    });
};

export {
    getAllUsers,
    createUser,
    updateUser,
    deleteUser,
    loginUser,
    logoutUser
};