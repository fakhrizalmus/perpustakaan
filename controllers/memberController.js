const { Member } = require('../models')
const model = require('../models');

const getAllMember = async (req, res) => {
    let { page, row } = req.query
    page -= 1
    const options = {
        attributes: ['id', 'code', 'name'],
    };
    if (page) options.offset = page;
    if (row) options.limit = row
    const allMember = await Member.findAll(options);
    console.log(allMember.length);
    res.status(200).json({
        status: 'Success',
        data: allMember
    })
    if (!allMember) {
        res.status(400).json({
            status: 'Error',
            message: error
        })
    }
}

const getMemberPinjam = async (req, res) => {
    let { page, row } = req.query
    page -= 1
    const options = {
        attributes: ['id', 'code', 'name'],
        include: [
        {
            model: model.Peminjaman,
            where: {
                tglPengembalian: null
            },
            attributes: ['memberId', 'bookId'],
            include: [
                {
                    model: model.Book,
                    attributes: ['code', 'title', 'author']
                }
            ]
        }
    ]
    };
    if (page) options.offset = page;
    if (row) options.limit = row
    const allMember = await Member.findAll(options);
    console.log(allMember);
    res.status(200).json({
        status: 'Success',
        data: allMember
    })
    if (!allMember) {
        res.status(400).json({
            status: 'Error',
            message: error
        })
    }
}

module.exports = {
    getAllMember,
    getMemberPinjam
}