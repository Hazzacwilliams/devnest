import bcrypt from 'bcryptjs';

const hashedPassword = async (password) => {
    const rounds = 10;
    return await bcrypt.hash(password, rounds);
};

export default hashedPassword;