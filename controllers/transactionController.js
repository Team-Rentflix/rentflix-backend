const Transaction = require('../models/transaction.model')
const Post = require('../models/post.model')
const postHlp = require('../helper/transactionHlp');
const transactionHlp = require('../helper/transactionHlp');

require("dotenv").config({ path: "./config.env" });

exports.storeTransactionData = async (req, res) => {
    try {
        const transaction = new Transaction(req.body);
        await transaction.save();
        res.status(200).send({ status: true })
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: false, error: err })
    }
}

exports.decryptPassword = async (req, res) => {
    try {
        const post = await Post.findById(req.query.post_id)
        if (!post) throw "No Post Found"
        const acc_pass = transactionHlp.decrypt(post.acc_pass)
        if (acc_pass) {
            return res.status(200).send({ status: true, password: acc_pass, acc_id: post.acc_id })
        }
        return res.status(400).send({ status: false, error: "something went wrong" })
    } catch (err) {
        res.status(500).send({ status: false, error: err })
    }
}