const prisma = require('../prisma/client');
const express = require('express');


//membuat table baru hanya bisa dilakukan oleh admin
const CreateTable = async (req, res) => {    
    const { TableNumber, Capacity } = req.body;
    try {
        const newTable = await prisma.tables.create({
            data: {
                TableNumber,
                Capacity,
            },
        });
        res.status(201).json({message:"table berhasil di buat",newTable});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Terjadi kesalahan server' });
    }
}

//menapilkan semua table
const ShowTable = async (req, res) => {
    try {
        const table = await prisma.tables.findMany();
        res.status(200).json({message:"table berhasil di tampilkan",table});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Terjadi kesalahan server' });
    }
}

//menampilkan data table berdasarkan id
const ShowTableById = async (req, res) => {
    const { TableID } = req.params;
    try {
        const table = await prisma.tables.findUnique({
            where: { TableID: parseInt(TableID) },
        });
        res.status(200).json({message:"table berhasil di tampilkan",table});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Terjadi kesalahan server' });
    }
}

//update data table hanya bisa di lakukan oleh admin
const UpdateTable = async (req, res) => {
    const { TableID } = req.params;
    const { TableNumber, Capacity } = req.body;
    try {
        const updatedTable = await prisma.tables.update({
            where: { TableID: parseInt(TableID) },
            data: {
                TableNumber,
                Capacity,
            },
        });
        res.status(200).json({message:"table berhasil di update",updatedTable});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Terjadi kesalahan server' });
    }
}   

//mengahpus data table hanya bisa dilakukan oleh admin
const DeleteTable = async (req, res) => {
    const { TableID } = req.params;
    try {
        await prisma.tables.delete({
            where: { TableID: parseInt(TableID) },
        });
        res.status(200).json({message:"table berhasil di hapus"});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Terjadi kesalahan server' });
    }
}   


module.exports = { CreateTable, ShowTable, ShowTableById, UpdateTable, DeleteTable };