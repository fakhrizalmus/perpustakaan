const { Peminjaman, Book, Member } = require('../models')
const model = require('../models');
var moment = require('moment-timezone');
const datenow = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')

const postPeminjaman = async (req, res) => {
    const { bookId, memberId } = req.body
    const peminjamanData = {
        bookId: bookId,
        memberId: memberId,
        tglPinjam: datenow
    }
    const cariBuku = await Book.findOne({
        where: {
            id: bookId
        }
    })
    console.log(cariBuku);
    const cariMember = await Peminjaman.findAll({
        where: {
            memberId: memberId,
            tglPengembalian: null
        }
    })
    const cariMember2 = await Member.findOne({
        where: {
            id: memberId
        }
    })
    const startDate = new Date(moment(cariMember2.updatedAt).format('YYYY-MM-DD'))
    const currentDate = new Date()
    const timeDifference = currentDate - startDate
    const dayDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    if (cariMember2.isPenalty == true && dayDifference >= 3) {
        const ubahIsPenalty = await Member.update(
            {isPenalty: false},
            {
                where: {
                    id: memberId
                }
            }
        )
    }
    const cariMember3 = await Member.findOne({
        where: {
            id: memberId
        }
    })
    if (cariBuku.isPinjam === false && cariMember.length < 2 && cariMember3.isPenalty == false) {
        const tambahPeminjaman = await Peminjaman.create(peminjamanData)
        const ubahStatusBuku = await Book.update(
            {isPinjam: true},
            {
                where: {
                    id: bookId
                }
            }
        )
        res.status(200).json({
            status: 'Success',
            data: peminjamanData
        })
    } else if (cariMember3.isPenalty == true) {
        res.status(400).json({
            status: 'Error',
            message: 'Sedang dalam masa penalti'
        })
    } else if (cariBuku.isPinjam === true) {
        res.status(400).json({
            status: 'Error',
            message: 'Buku sedang di pinjam'
        })
    } else if (cariMember.length >= 2) {
        res.status(400).json({
            status: 'Error',
            message: 'Maksimal meminjam 2 buku'
        })
    }
}

const updatePengembalian = async (req, res) => {
    const { memberId, bookId } =  req.body
    const cariPinjaman = await Peminjaman.findOne({
        where: {
            memberId: memberId,
            bookId: bookId,
            tglPengembalian: null
        }
    })
    if (cariPinjaman == undefined || cariPinjaman == null) {
        res.status(400).json({
            status: 'Error',
            message: 'Peminjaman tidak ditemukan'
        })
    } else {
        const startDate = new Date(moment(cariPinjaman.tglPinjam).format('YYYY-MM-DD'))
        const currentDate = new Date()
        const timeDifference = currentDate - startDate
        const dayDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        console.log(dayDifference);
        if (dayDifference > 7) {
            const cariMember = await Member.update(
                {isPenalty: true},
                {
                    where: {
                        id: memberId
                    }
                }
            )
        }
        const updatePeminjaman = await Peminjaman.update(
            {tglPengembalian: datenow},
            {
                where: {
                    memberId: memberId,
                    bookId: bookId,
                    tglPengembalian: null
                }
            }
        )
        const updateBook = await Book.update(
            {isPinjam: false},
            {
                where: {
                    id: bookId
                }
            }
        )
        res.status(200).json({
            status: 'Success',
            data: 'Data berhasil di update'
        })
    }
}

module.exports = {
    postPeminjaman,
    updatePengembalian
}