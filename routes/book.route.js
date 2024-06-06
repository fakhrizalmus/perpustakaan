const express = require('express')
const router = express.Router()
const {getAllBook, getBookPinjam} = require('../controllers/bookController')

router.get('/', getAllBook)
router.get('/pinjam', getBookPinjam)

module.exports = router;