const crypto = require('crypto')
require("dotenv").config({ path: "./config.env" });

const algorithm = 'aes-256-ctr';

const key = crypto.createHash('sha256').update(String(process.env.SECRET)).digest('base64').substr(0, 32)


module.exports = {
    encrypt: (text) => {
        const iv = crypto.randomBytes(16).toString('hex').slice(0, 16);

        const cipher = crypto.createCipheriv(algorithm, key, iv)
        const encrypted = Buffer.concat([cipher.update(text), cipher.final()])
        return {
            iv: iv.toString('hex'),
            content: encrypted.toString('hex')
        }
    },
    decrypt: (hash) => {
        try {
            const decipher = crypto.createDecipheriv(algorithm, key, hash.iv)
            const decrypted = Buffer.concat([decipher.update(Buffer.from(hash.content, 'hex')), decipher.final()])

            return decrypted.toString()
        } catch (err) {
            console.log(err)
            return null
        }
    }
}