const prisma = require('../prisma/client');

const checkAdmin = async (req, res, next) => {
    const { UserID } = req.user;
    try {
        const user = await prisma.users.findUnique({
            where: { UserID },
        });
        if (user.Role === 'admin') {
            next();
        } else {
            res.status(403).json({ message: 'Anda tidak memiliki akses' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Terjadi kesalahan server' });
    }
};

module.exports = checkAdmin;