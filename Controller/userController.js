const prisma = require("../prisma/client");
const bcrypt = require("bcrypt");

const { generateToken } = require("../middleware/verifyToken");

//new user register
const newUser = async (req, res) => {
  const { Username, Password, Email } = req.body;

  if (!Username || !Email || !Password) {
    return res.status(400).json({ message: "Semua field harus diisi" });
  }

  try {
    const existingAdmin = await prisma.users.findUnique({
      where: { Email },
    });

    if (existingAdmin) {
      return res.status(400).json({ message: "Email sudah terdaftar" });
    }

    const hashedPassword = await bcrypt.hash(Password, 10);

    const newUser = await prisma.users.create({
      data: {
        Username,
        Email,
        Password: hashedPassword,
        Role: "user",
      },
    });
    const token = generateToken({
      UserID: newUser.UserID,
      Username: newUser.Username,
    });

    res.status(201).json({
      message: "user berhasil dibuat",
      user: {
        UserID: newUser.UserID,
        Username: newUser.Username,
        Email: newUser.Email,
      },
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
};

//user login
const loginUser = async (req, res) => {
  const { Email, Password } = req.body;

  if (!Email || !Password) {
    return res.status(400).json({ message: "tidak boleh kosong!" });
  }

  try {
    const user = await prisma.users.findUnique({
      where: { Email },
    });

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

//update user sendiri
const updateUser = async (req, res) => {
  const id = req.user.UserID;
  console.log({id})
  const { Username, Email, Password } = req.body;
  const hashedPassword = await bcrypt.hash(Password, 10);
  const updatedUser = await prisma.users.update({
    where: { UserID: id },
    data: {
      Username,
      Email,
      Password: hashedPassword
    },
  });
  res.status(200).json({ message: "User berhasil di update", updatedUser });
};

//user logout
const logoutUser = async (req, res) => {
  res.status(200).json({ message: "Logout berhasil" });
};

module.exports = { newUser, loginUser, logoutUser , updateUser};
