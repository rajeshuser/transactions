import { useState, useEffect } from "react";
import axios from "axios";
import { baseURL } from "../contants";
import Pagination from "./Pagination";
import styles from "./Transactions.module.css";

export default function Transactions({ search, month }) {
	const [transactions, setTransactions] = useState([]);
	const [page, setPage] = useState(1);
	const [perPage, setPerPage] = useState(10);

	useEffect(() => {
		axios({
			method: "GET",
			baseURL,
			url: "/transactions",
			params: {
				search,
				month,
				page,
				perPage
			}
		}).then(({ data }) => {
			if (data.length === 0) {
				data.push({}, {}, {});
			}
			setTransactions(data);
		});
	}, [search, month, page, perPage]);

	return (
		<>
			<table class={styles.transactions}>
				<thead>
					<tr>
						<th>ID</th>
						<th>Title</th>
						<th>Description</th>
						<th>Price</th>
						<th>Category</th>
						<th>Sold</th>
						<th>Image</th>
					</tr>
				</thead>
				<tbody>
					{transactions.map((transaction) => (
						<tr>
							<td>{transaction.id}</td>
							<td>{transaction.title}</td>
							<td>
								{transaction.description?.length <= 50
									? transaction.description
									: (transaction.description
											? transaction.description?.substring(0, 50)
											: "") + (transaction.description ? "..." : "")}
							</td>
							<td>{transaction.price}</td>
							<td>{transaction.category}</td>
							<td>{transaction.sold}</td>
							<td>
								<img src={transaction.image} alt={transaction.title} />
							</td>
						</tr>
					))}
				</tbody>
			</table>
			<Pagination page={page} setPage={setPage} perPage={perPage} />
		</>
	);
}
