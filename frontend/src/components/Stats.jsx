import { useState, useEffect } from "react";
import axios from "axios";
import { baseURL } from "../contants";
import styles from "./Stats.module.css";

export default function Stats({ month }) {
	const [stats, setStats] = useState({
		totalSaleAmount: 0,
		totalSoldItems: 0,
		totalUnsoldItems: 0
	});

	useEffect(() => {
		axios({
			method: "GET",
			baseURL,
			url: "/transactions/stats",
			params: { month }
		}).then((response) => setStats(response.data));
	}, [month]);

	return (
		<div class={styles.stats}>
			<h1>Statistics - {month}</h1>
			<table>
				<tr>
					<td>Total sale</td>
					<td>{stats.totalSaleAmount}</td>
				</tr>
				<tr>
					<td>Total sold items</td>
					<td>{stats.totalSoldItems}</td>
				</tr>
				<tr>
					<td>Total unsold items</td>
					<td>{stats.totalUnsoldItems}</td>
				</tr>
			</table>
		</div>
	);
}
