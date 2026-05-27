const express = require('express');
const router = express.Router();
const cloudinary = require('cloudinary').v2;
require('dotenv').config();
const User = require('../model/User');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

//signup
router.post('/signup', (req, res) => {
    try {
        if (!req.body || !req.body.email) {
            return res.status(400).json({ error: 'missing email' });
        }

        if (!process.env.CLOUD_NAME || !process.env.API_KEY || !process.env.API_SECRET) {
            return res.status(500).json({
                error: 'cloudinary env vars missing on backend (CLOUD_NAME/API_KEY/API_SECRET)'
            });
        }

        if (!req.files || !req.files.image) {
            return res.status(400).json({ error: 'image file is required (req.files.image missing)' });
        }

        User.find({ email: req.body.email })
            .then(users => {
                if (users.length > 0) {
                    return res.status(400).json({ error: 'email already registered' });
                }

                cloudinary.uploader.upload(req.files.image.tempFilePath, (err, result) => {
                    if (err) {
                        console.error('cloudinary upload error:', err);
                        return res.status(500).json({ error: err });
                    }

                    bcrypt.hash(req.body.password, 10, (err, hash) => {
                        if (err) {
                            console.error('bcrypt hash error:', err);
                            return res.status(500).json({ error: err });
                        }

                        const newUser = new User({
                            _id: new mongoose.Types.ObjectId(),
                            fullName: req.body.fullName,
                            phone: req.body.phone,
                            email: req.body.email,
                            password: hash,
                            imageUrl: result.secure_url,
                            imageId: result.public_id
                        });

                        newUser.save()
                            .then(saved => {
                                res.status(200).json({ newUser: saved });
                            })
                            .catch(err => {
                                console.error('user save error:', err);
                                res.status(500).json({ error: err });
                            });
                    });
                });
            })
            .catch(err => {
                console.error('user find error:', err);
                res.status(500).json({ error: err });
            });
    } catch (err) {
        console.error('signup handler error:', err);
        res.status(500).json({ error: err && err.message ? err.message : err });
    }
});

//login
router.post('/login', (req, res) => {
    try {
        if (!req.body || !req.body.email) {
            return res.status(400).json({ error: 'missing email' });
        }

        User.find({ email: req.body.email })
            .then(users => {
                if (users.length === 0) {
                    return res.status(400).json({ error: 'email is not registered' });
                }

                bcrypt.compare(req.body.password, users[0].password, (err, isMatch) => {
                    if (err) {
                        console.error('bcrypt compare error:', err);
                        return res.status(500).json({ error: err });
                    }

                    if (!isMatch) {
                        return res.status(400).json({ error: 'invalid password' });
                    }

                    const token = jwt.sign(
                        {
                            uId: users[0]._id,
                            fullName: users[0].fullName,
                            phone: users[0].phone,
                            email: users[0].email
                        },
                        '123',
                        { expiresIn: '365d' }
                    );

                    res.status(200).json({
                        uId: users[0]._id,
                        fullName: users[0].fullName,
                        phone: users[0].phone,
                        email: users[0].email,
                        imageUrl: users[0].imageUrl,
                        imageId: users[0].imageId,
                        token
                    });
                });
            })
            .catch(err => {
                console.error('user find error:', err);
                res.status(500).json({ error: err });
            });
    } catch (err) {
        console.error('login handler error:', err);
        res.status(500).json({ error: err && err.message ? err.message : err });
    }
});

module.exports = router;