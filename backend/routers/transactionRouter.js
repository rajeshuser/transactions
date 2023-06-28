const express = require("express");
const axios = require("axios");
const TransactionModel = require("../models/transactionModel");

const baseURL = "http://localhost:3000";

const months = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December"
];

const transactionRouter = express.Router();

transactionRouter.get("/", async (req, res) => {
	try {
		const search = req.query.search;
		const month = req.query.month || "January";
		const page = +req.query.page || 1;
		const perPage = +req.query.perPage || 10;

		let filter = {};
		if (search) {
			filter = {
				$text: { $search: search }
			};
		} else {
			filter = {
				$expr: {
					$eq: [{ $month: "$dateOfSale" }, months.indexOf(month) + 1]
				}
			};
		}

		const transactions = await TransactionModel.find(filter)
			.skip((page - 1) * perPage)
			.limit(perPage);

		res.status(200).send(transactions);
	} catch (error) {
		res.status(500).send({ error: error.message });
	}
});

transactionRouter.get("/stats", async (req, res) => {
	try {
		const { month = "January" } = req.query;

		const transactions = await TransactionModel.find({
			$expr: {
				$eq: [{ $month: "$dateOfSale" }, months.indexOf(month) + 1]
			}
		});

		const stats = {
			totalSaleAmount: 0,
			totalSoldItems: 0,
			totalUnsoldItems: 0
		};

		for (let i = 0; i < transactions.length; i++) {
			if (transactions[i].sold) {
				stats.totalSaleAmount += transactions[i].price;
				stats.totalSoldItems++;
			} else {
				stats.totalUnsoldItems++;
			}
		}

		res.status(200).send(stats);
	} catch (error) {
		res.status(500).send({ error: error.message });
	}
});

transactionRouter.get("/salesDistribution", async (req, res) => {
	try {
		const { month = "January" } = req.query;

		const transactions = await TransactionModel.find({
			$expr: {
				$eq: [{ $month: "$dateOfSale" }, months.indexOf(month) + 1]
			}
		});

		const salesDistribution = [];
		for (let i = 100; i <= 1000; i += 100) {
			salesDistribution.push({
				range: {
					from: i === 100 ? 0 : i - 100 + 1,
					to: i === 1000 ? 10 ** 10 : i
				},
				count: 0
			});
		}

		for (let transaction of transactions) {
			if (transaction.price <= 100) {
				salesDistribution[0].count++;
			} else if (transaction.price >= 901) {
				salesDistribution[9].count++;
			} else if (transaction.price % 100 === 0) {
				salesDistribution[transaction.price / 100 - 1].count++;
			} else {
				salesDistribution[Math.floor(transaction.price / 100)].count++;
			}
		}

		res.status(200).send(salesDistribution);
	} catch (error) {
		res.status(500).send({ error: error.message });
	}
});

transactionRouter.get("/categoriesDistribution", async (req, res) => {
	try {
		const { month = "January" } = req.query;

		const transactions = await TransactionModel.find({
			$expr: {
				$eq: [{ $month: "$dateOfSale" }, months.indexOf(month) + 1]
			}
		});

		const categoriesDistribution = {};
		for (let transaction of transactions) {
			const { category } = transaction;
			categoriesDistribution[category] = categoriesDistribution[category] + 1 || 1;
		}

		res.status(200).send(categoriesDistribution);
	} catch (error) {
		res.status(500).send({ error: error.message });
	}
});

transactionRouter.get("/analysis", async (req, res) => {
	try {
		const statsResponse = await axios({
			method: "GET",
			baseURL,
			url: "/transactions/stats",
			params: req.query
		});

		const salesDistributionResponse = await axios({
			method: "GET",
			baseURL,
			url: "/transactions/salesDistribution",
			params: req.query
		});

		const categoriesDistributionResponse = await axios({
			method: "GET",
			baseURL,
			url: "/transactions/categoriesDistribution",
			params: req.query
		});

		res.status(200).send({
			stats: statsResponse.data,
			salesDistribution: salesDistributionResponse.data,
			categoriesDistribution: categoriesDistributionResponse.data
		});
	} catch (error) {
		res.status(500).send({ error: error.message });
	}
});

module.exports = transactionRouter;
