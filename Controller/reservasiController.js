const prisma = require('../prisma/client');


//membuat reservasi baru
const CreateReservasi = async (req, res) => {
    const { UserID, TableID, ReservationDate, NumberOfGuests ,} = req.body;
    try {
        const newReservasi = await prisma.reservations.create({
            data: {
                UserID,
                TableID,
                ReservationDate: new Date(ReservationDate),
                NumberOfGuests,
                Status: "pending",
            },
        });
        res.status(201).json({message:"reservasi berhasil di buat",newReservasi});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Terjadi kesalahan server' });
    }
}

//menapilkan semua reservasi
const ShowReservasi = async (req, res) => {
    try {
        const reservasi = await prisma.reservations.findMany();
        res.status(200).json({message:"reservasi berhasil di tampilkan",reservasi});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Terjadi kesalahan server' });
    }
}

//menampilkan data reservasi berdasarkan id
const ShowReservasiById = async (req, res) => {
    const { ReservationID } = req.params;
    try {
        const reservasi = await prisma.reservations.findUnique({
            where: { ReservationID: parseInt(ReservationID) },
        });
        res.status(200).json({message:"reservasi berhasil di tampilkan",reservasi});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Terjadi kesalahan server' });
    }
}

//update data reservasi hanya bisa di lakukan oleh admin
const UpdateReservasi = async (req, res) => {
    const { ReservationID } = req.params;
    const { UserID, TableID, ReservationDate, NumberOfGuests, Status } = req.body;
    try {
        const updatedReservasi = await prisma.reservations.update({
            where: { ReservationID: parseInt(ReservationID) },
            data: {
                UserID,
                TableID,
                ReservationDate: new Date(ReservationDate),
                NumberOfGuests,
                Status
            },
        });
        res.status(200).json({message:"reservasi berhasil di update",updatedReservasi});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Terjadi kesalahan server' });
    }
}

//delete data reservasi hanya bisa di lakukan oleh admin
const DeleteReservasi = async (req, res) => {
    const { ReservationID } = req.params;
    try {
        const deletedReservasi = await prisma.reservations.delete({
            where: { ReservationID: parseInt(ReservationID) },
        });
        res.status(200).json({message:"reservasi berhasil di delete",deletedReservasi});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Terjadi kesalahan server' });
    }
}

module.exports = {
    CreateReservasi,
    ShowReservasi,
    ShowReservasiById,
    UpdateReservasi,
    DeleteReservasi
};