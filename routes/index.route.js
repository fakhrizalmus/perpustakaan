const express = require('express')
const router = express.Router();
const member = require('./member.route');
const book = require('./book.route');
const peminjaman = require('./peminjaman.route');

router.use('/member' , member)
router.use('/book' , book)
router.use('/peminjaman' , peminjaman)

module.exports = router;