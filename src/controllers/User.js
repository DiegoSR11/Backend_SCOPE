const User = require("../db/Schemas/User");

const register = async (req, res) => {
    try {
        return res.status(200).json({ ok: 'Successful' });
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = {
    register
}

