import * as userModel from '../models/userModels.js';

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
    const {username, email, name, mobile, region, password} = req.body;
    try {
        const newUser = await userModel.createUser(username, email, name, mobile, region, password);
        res.status(201).json(newUser)
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to create user!'});
    }
}

const updateUser = async (req, res) => {
    const { userID } = req.params;
    const {username, email, name, mobile, region, password} = req.body;
    try {
        const updatedUser = await userModel.updateUser(userID, username, email, name, mobile, region, password);
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

export {
    getAllUsers,
    createUser,
    updateUser,
    deleteUser
};