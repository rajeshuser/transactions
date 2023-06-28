import React from "react";
import styles from "./Pagination.module.css";

export default function Pagination({ page = 1, setPage, perPage = 10, isLastPage = false }) {
	return (
		<div class={styles.pagination}>
			<p>Page No: {page}</p>
			<p>
				<span onClick={() => page > 1 && setPage(page - 1)}>Previous</span> -{" "}
				<span onClick={() => setPage(page + 1)}>Next</span>
			</p>
			<p>Per Page: {perPage}</p>
		</div>
	);
}
