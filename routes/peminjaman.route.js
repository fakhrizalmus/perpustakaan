const express = require('express')
const router = express.Router()
const {postPeminjaman, updatePengembalian} = require('../controllers/peminjamanController')

router.post('/', postPeminjaman)
router.post('/pengembalian', updatePengembalian)

module.exports = router;