const express = require('express')
const router = express.Router()
const {getAllMember, getMemberPinjam} = require('../controllers/memberController')

router.get('/', getAllMember)
router.get('/pinjam', getMemberPinjam)

module.exports = router;