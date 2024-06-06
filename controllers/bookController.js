const { Book } = require('../models')
const model = require('../models');

const getAllBook = async (req, res) => {
    let { page, row } = req.query
    page -= 1
    const options = {
        attributes: ['id', 'code', 'title', 'author', 'stock'],
        where: {
            isPinjam: 0
        }
        // include: [{
        //         model: model.transaksi,
        //         attributes: ['jenis_transaksi','tanggal','jumlah']},
        //     {
        //         model: model.rekening,
        //         attributes: ['pin','cabang_bank_id','saldo']}
        // ],
    };
    if (page) options.offset = page;
    if (row) options.limit = row
    const allBook = await Book.findAll(options);
    res.status(200).json({
        status: 'Success',
        data: allBook,
        total: allBook.length
    })
    if (!allBook) {
        res.status(400).json({
            status: 'Error',
            message: error
        })
    }
}

const getBookPinjam = async (req, res) => {
    let { page, row } = req.query
    page -= 1
    const options = {
        attributes: ['id', 'code', 'title', 'author', 'stock'],
        where: {
            isPinjam: 1
        }
        // include: [{
        //         model: model.transaksi,
        //         attributes: ['jenis_transaksi','tanggal','jumlah']},
        //     {
        //         model: model.rekening,
        //         attributes: ['pin','cabang_bank_id','saldo']}
        // ],
    };
    if (page) options.offset = page;
    if (row) options.limit = row
    const allBook = await Book.findAll(options);
    res.status(200).json({
        status: 'Success',
        data: allBook,
        total: allBook.length
    })
    if (!allBook) {
        res.status(400).json({
            status: 'Error',
            message: error
        })
    }
}

module.exports = {
    getAllBook,
    getBookPinjam
}