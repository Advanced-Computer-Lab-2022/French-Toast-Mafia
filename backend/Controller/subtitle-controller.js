const Subtitle = require("../Models/Subtitle");

function getAllSubtitles (req,res) {
    Subtitle.find({}).then (function (Subtitle) {
    res.status(200).json(Subtitle)
    });
};

module.exports = {getAllSubtitles};