import History from "../models/historyModel.js";

export const getHistories = async (req, res) => {
    const histories = await History.find().populate("userId", "name").sort({ claimedAt: -1 });
    res.json(histories);
};
