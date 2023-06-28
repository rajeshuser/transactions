const fs = require("fs");

async function insertData(TransactionModel) {
	const transactions = JSON.parse(fs.readFileSync("./data.json"));
	for (let i = 0; i < transactions.length; i++) {
		const transactionDoc = new TransactionModel(transactions[i]);
		await transactionDoc.save();
		console.log(`Done ${i + 1}/${transactions.length}`);
	}
}

module.exports = insertData;
