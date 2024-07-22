const User = require("../models/user_model");

const { parseUtil } = require("../utils/jwt_util");

const addPlaylistController = async (req, res, next) => {
    try {
        const { gameId } = req.body;
        const { id } = parseUtil(req);

        const user = await User.findById(id);

        if (!user.toPlay)
            user.toPlay = [];

        if (user.toPlay.includes(gameId))
            return res.status(400).json({ error: "game already exists in playlist" });

        if (user.finished.includes(gameId))
            await User.findByIdAndUpdate(id, { $pull: { finished: gameId } });

        await User.findByIdAndUpdate(id, { $push: { toPlay: gameId } });

        return res.status(200).json({ message: "Playlist updated" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Error in adding game into playlist" });
    }
};

const delPlaylistController = async (req, res, next) => {
    try {
        const { gameId } = req.body;
        const { id } = parseUtil(req);

        const user = await User.findById(id);

        if (!user.toPlay.includes(gameId))
            return res.status(400).json({ error: "Does not exist in playlist" });

        await User.findByIdAndUpdate(id, { $pull: { toPlay: gameId } });

        return res.status(200).json({ message: "Playlist updated" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Error in deleting game from playlist" });
    }
};

module.exports = { addPlaylistController, delPlaylistController };