const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const createToken = require("../helpers/createToken");
const User = require("../models/userModel");
const pool = require("../DBPool")

const userController = {
    register: async (req, res) => {
        try {
            const { name, email, gender, password, role } = req.body;

            // check fields
            if (!name || !email || !password || !gender || !role)
                return res.status(400).json({ message: "Please fill in all fields." });

            // check email
            if (!validateEmail(email))
                return res
                    .status(400)
                    .json({ message: "Please enter a valid email address." });

            // Check user
            const [users] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
            if (users.length > 0)
            return res.status(400).json({ message: "This email is already registered in our system." });

            // check password
            if (password.length < 6)
                return res
                    .status(400)
                    .json({ message: "Password must be at least 6 characters." });

            // hash password
            const salt = await bcrypt.genSalt();
            const hashPassword = await bcrypt.hash(password, salt);

            // Insert user into database
            await pool.query(
                'INSERT INTO users (name, gender, email, password, role) VALUES (?, ?, ?, ?, ?)',
                [name, gender, email, hashPassword, role]
            );

            res.status(200).json({
                message: "User Registartion Succeessfull !!!",
                success: true,
            });


        } catch (error) {
            res.status(500).json({
                message: error.message,
                success: false
            });
        }
    },
    signing: async (req, res) => {
        try {
            // Get credentials from request body
            const { email, password } = req.body;
           
            // Check if email exists in the database
            const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
            const user = rows[0];
            console.log(user);

            if (!user)
              return res.status(400).json({ msg: "This email is not registered in our system." });
        
            // Check if password matches
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch)
              return res.status(400).json({ msg: "This password is incorrect." });
        
            // Create a token
            const token = createToken.access({ id: user.id });
        
            // Signing success
            res.status(200).json({ msg: "Signing success", token });
          } catch (err) {
            console.error("🚀 ~ file: userController.js ~ line 80 ~ signing: ~ err", err);
            res.status(500).json({ msg: err.message });
          }
    },
    getUser: async (req, res) => {
        try {
            const userId = req.user.id;
            // Query the database to get the user by id
            const [rows] = await pool.query('SELECT id, name, gender, email, role, created_at, updated_at FROM users WHERE id = ?', [userId]);
        
            // Check if the user exists
            if (rows.length === 0) {
              return res.status(400).json({ msg: "User does not exist." });
            }
        
            // Respond with the user data (excluding the password)
            res.json(rows[0]);
          } catch (err) {
            return res.status(500).json({ msg: err.message });
          }
    },
    logout: async (req, res) => {

        const token = createToken.access({id: 'asdjkasdasdhashdkasd' });
        res.status(200).json({ msg: "Signout success" });
    },
    getAllUsers :async(req,res)=>{
        try {
            // Query the database to get all users
            const [rows] = await pool.query('SELECT id, name, gender, email, role, created_at, updated_at FROM users');
        
            // Respond with the user data
            res.status(200).json({ users: rows });
          } catch (error) {
            console.error("🚀 ~ file: userController.js ~ line 132 ~ getAllUsers: ~ error", error);
            res.status(500).json({ msg: error.message });
          }
    }
};

const validateEmail = (email) => {
    const re =  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

module.exports = userController;