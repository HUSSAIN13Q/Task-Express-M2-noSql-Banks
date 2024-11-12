let Accounts = require("../models/Account");

exports.accountCreate = async (req, res) => {
  try {
    const newAccount = await Accounts.create(req.body);
    res.status(201).json(newAccount);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.accountDelete = async (req, res) => {
  try {
    const { accountId } = req.params;
    const foundAccount = await Accounts.findById(accountId);
    if (foundAccount) {
      await foundAccount.deleteOne();
      res.status(204).end();
    } else {
      res.status(404).json({ message: "Account not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.accountUpdate = async (req, res) => {
  try {
    const { accountId } = req.params;
    const foundAccount = await Accounts.findById(accountId);
    if (foundAccount) {
      await foundAccount.updateOne(req.body);
      res.status(204).end();
    } else {
      res.status(404).json({ message: "Account not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.accountsGet = async (req, res) => {
  try {
    const account = await Accounts.find();
    res.json(account);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAccountByUsername = async (req, res) => {
  const { username } = req.params;
  const foundAccount = await Accounts.find(username);
  if (req.query.currency === "usd") {
    const accountInUsd = { ...foundAccount, funds: foundAccount.funds * 3.31 };
    res.status(201).json(accountInUsd);
  }
  res.status(201).json(foundAccount);
};
exports.getAccountByUsername = async (req, res) => {
  try {
    const { username } = req.params;
    const foundAccount = await Accounts.findOne({ username });

    if (!foundAccount) {
      return res.status(404).json({ message: "Account not found" });
    }

    if (req.query.currency === "usd") {
      const accountInUsd = {
        ...foundAccount._doc,
        funds: foundAccount.funds * 3.31,
      };
      return res.status(200).json(accountInUsd);
    }

    res.status(200).json(foundAccount);
  } catch (error) {
    console.error("Error fetching account:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
