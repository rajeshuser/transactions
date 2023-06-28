import React from "react";
import styles from "./SearchAndMonth.module.css";

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

export default function SearchAndMonth({ search, setSearch, month, setMonth }) {
	return (
		<div class={styles.searchAndMonth}>
			<input
				type="search"
				placeholder="Search transaction"
				onChange={({ target: { value } }) => setSearch(value)}
			/>
			<div>
				<select value={month} onChange={({ target: { value } }) => setMonth(value)}>
					{months.map((m) => (
						<option key={m} value={m}>
							{m}
						</option>
					))}
				</select>
			</div>
		</div>
	);
}
