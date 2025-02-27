const express = require("express");
const router = express.Router();
const { OpenAI } = require('openai');
const fecthuer = require("../middleware/fecthuser");
const Chathistory = require("../models/Chathistory");
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });


router.post("/userquestion", async (req, res) => {
    const { question } = req.body;
    const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [{ role: "user", content: question }],
    });

    return res.status(200).json({ answer: response.choices[0].message.content });
})
router.post("/addchathistory", fecthuer, async (req, res) => {
    try {
        const { message, response } = req.body;
        const user = req.user;
        const chat = new Chathistory({ user, message, response });
        return res.status(200).json({ "message":chat})
    } catch (error) {
        console.log(error)
        return res.status(500).json({ "error": "Internal server error" })

    }


})
module.exports = router;
