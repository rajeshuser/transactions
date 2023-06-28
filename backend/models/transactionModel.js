const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
	id: Number,
	title: String,
	price: Number,
	description: String,
	category: String,
	image: String,
	sold: Boolean,
	dateOfSale: Date
});

transactionSchema.index({
	title: "text",
	price: "text",
	description: "text"
});

const TransactionModel = mongoose.model("transaction", transactionSchema);

module.exports = TransactionModel;
