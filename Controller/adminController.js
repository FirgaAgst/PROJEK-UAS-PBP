const prisma = require("../prisma/client");
const bcrypt = require("bcrypt");
const { generateToken } = require("../middleware/verifyToken");

//register admin
const newAdmin = async (req, res) => {
    const { Username, Password, Email, } = req.body;

   
    if (!Username || !Email || !Password) {
        return res.status(400).json({ message: 'Semua field harus diisi' });
    }

    try {
        
        const existingAdmin = await prisma.users.findUnique({
            where: { Email } 
        });

        if (existingAdmin) {
            return res.status(400).json({ message: 'Email sudah terdaftar' });
        }

        
        const hashedPassword = await bcrypt.hash(Password, 10);
        
       
        const newUser = await prisma.users.create({
            data: {
                Username,
                Email,
                Password: hashedPassword,
                Role:'admin' 
            }
        
            
        });
        const adminBaru= await prisma.admins.create({
            data:{
                UserID: newUser.UserID,
                AdminName: Username
            }
        })
         const token = generateToken({ UserID: newUser.UserID, Username: newUser.Username });

         res.status(201).json({
            message: 'user berhasil dibuat',
            user: {
                UserID: newUser.UserID,
                Username: newUser.Username,
                Email: newUser.Email
            },
            token
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Terjadi kesalahan server' });
    }
};

//login admin
const loginAdmin = async (req, res) => {
    const { Email, Password } = req.body;
  
    if  (!Email || !Password) {
      return res.status(400).json({ message: "tidak boleh kosong!" });
    }
  
    try {
      const user = await prisma.users.findUnique({
        where: { Email },
      });
      console.log({user})
      if (!user) {
        return res.status(404).json({ message: "Email tidak terdaftar" });
      }
  
      const isPasswordMatch = await bcrypt.compare(Password, user.Password);
  
      if (!isPasswordMatch) {
        return res.status(400).json({ message: "Password salah" });
      }
  
      const token = generateToken({
        UserID: user.UserID,
        Username: user.Username,
      });
      console.log({token})
      res.status(200).json({
        message: "Login berhasil",
        user: {
          UserID: user.UserID,
          Username: user.Username,
          Email: user.Email,
        },
        token,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Terjadi kesalahan server" });
    }
  };

//logout admin
const logoutAdmin = async (req, res) => {
    res.status(200).json({ message: "Logout berhasil" });
  };

//show all user
const ShowUser = async (req, res) => {
    try {
        const user = await prisma.users.findMany();
        res.status(200).json({message:"user berhasil di tampilkan",user});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Terjadi kesalahan server' });
    }
}
//show user by id
const ShowUserById = async (req, res) => {
    const { UserID } = req.params;
    try {
        const user = await prisma.users.findUnique({
            where: { UserID: parseInt(UserID) },
        });
        res.status(200).json({message:"user berhasil di tampilkan",user});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Terjadi kesalahan server' });
    }
}

//update user by id
const UpdateUserAdmin = async (req, res) => {
    const { UserID } = req.params;
    const { Username, Password, Email } = req.body;
    try {
        const updatedUser = await prisma.users.update({
            where: { UserID: parseInt(UserID) },
            data: {
                Username,
                Password,
                Email,
            },
        });
        res.status(200).json({message:"user berhasil di update",updatedUser});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Terjadi kesalahan server' });
    }
}

//delete user by id
const DeleteUser = async (req, res) => {
    const { UserID } = req.params;
    try {
        await prisma.users.delete({
            where: { UserID: parseInt(UserID) },
        });
        res.status(200).json({message:"user berhasil di hapus"});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Terjadi kesalahan server' });
    }
}
module.exports = {newAdmin,loginAdmin,logoutAdmin,ShowUser,ShowUserById, UpdateUserAdmin, DeleteUser};