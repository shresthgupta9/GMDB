const User = require("../models/user_model");

const { parseUtil } = require("../utils/jwt_util");

const addCompletedListController = async (req, res, next) => {
    try {
        const { gameId } = req.body;
        const { id } = parseUtil(req);

        const user = await User.findById(id);

        if (!user.finshed)
            user.finished = [];

        if (user.finished.includes(gameId))
            return res.status(400).json({ error: "game already exists in completed list" });

        if (user.toPlay.includes(gameId))
            await User.findByIdAndUpdate(id, { $pull: { toPlay: gameId } });

        await User.findByIdAndUpdate(id, { $push: { finished: gameId } });

        return res.status(200).json({ message: "Completed list updated" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Error in adding game into completed list" });
    }
};

const delCompletedListController = async (req, res, next) => {
    try {
        const { gameId } = req.body;
        const { id } = parseUtil(req);

        const user = await User.findById(id);

        if (!user.finished.includes(gameId))
            return res.status(400).json({ error: "Does not exist in completed list" });

        await User.findByIdAndUpdate(id, { $pull: { finished: gameId } });

        return res.status(200).json({ message: "Completed list updated" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Error in deleting game from completed list" });
    }
};

module.exports = { addCompletedListController, delCompletedListController };