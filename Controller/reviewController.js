const prisma = require('../prisma/client');

const AddReview = async (req, res) => {
    const {UserID, ReservationID, Rating, Comment, ReviewDate} = req.body;

    try {
        const existingReview = await prisma.reviews.findFirst({
            where: {
                UserID,
            }
        });

        if (existingReview) {
            return res.status(400).json({ message: 'Anda sudah memberikan review' });
        }

        const newReview = await prisma.reviews.create({
            data: {
                UserID,
                ReservationID,
                Rating,
                Comment,
                ReviewDate: new Date(ReviewDate)

            }
        });

        res.status(201).json({
            message: 'Review berhasil ditambahkan',
            review: newReview
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Terjadi kesalahan server' });
    }
}

const ShowReview = async (req, res) => {
    try {
        const review = await prisma.reviews.findMany();
        res.status(200).json({
            message: 'Review berhasil ditampilkan',
            review
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Terjadi kesalahan server' });
    }
}

module.exports = { AddReview, ShowReview };