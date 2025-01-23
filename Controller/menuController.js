const prisma = require('../prisma/client');

//menampilkan semua menu
const ShowMenu = async (req, res) => {
    try {
        const menu = await prisma.menus.findMany();
        res.status(200).json({message:"menu berhasil di tampilkan",menu});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Terjadi kesalahan server' });
    }
}

//menampilkan data menu berdasarkan id
const ShowMenuById = async (req, res) => {
    const { MenuID } = req.params;
    try {
        const menu = await prisma.menus.findUnique({
            where: { MenuID: parseInt(MenuID) },
        });
        res.status(200).json({message:"menu berhasil di tampilkan",menu});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Terjadi kesalahan server' });
    }
}

//membuat menu baru hanya bisa dilakukan oleh admin
const CreateMenu = async (req, res) => {
    const { MenuName, Price, Category} = req.body;
    try {
        const newMenu = await prisma.menus.create({
            data: {
                MenuName,
                Category,
                Price

                
            },
        });
        res.status(201).json({message:"menu berhasil di buat",newMenu});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Terjadi kesalahan server' });
    }
}

//update data menu hanya bisa di lakukan oleh admin
const UpdateMenu = async (req, res) => {
    const { MenuID } = req.params;
    const { MenuName, Price,Category } = req.body;
    try {
        const updatedMenu = await prisma.menus.update({
            where: { MenuID: parseInt(MenuID) },
            data: {
                MenuName,
                Category,
                Price
                
            },
        });
        res.status(200).json({message:"menu berhasil di update",updatedMenu});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Terjadi kesalahan server' });
    }
}

//hapus data menu hanya bisa di lakukan oleh admin
const DeleteMenu = async (req, res) => {
    const { MenuID } = req.params;
    try {
        await prisma.menus.delete({
            where: { MenuID: parseInt(MenuID) },
        });
        res.status(200).json({message:"menu berhasil di hapus"});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Terjadi kesalahan server' });
    }
}

module.exports = { ShowMenu, ShowMenuById, CreateMenu, UpdateMenu, DeleteMenu };