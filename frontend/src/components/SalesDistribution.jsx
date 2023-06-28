import React from "react";
import { useEffect, useRef } from "react";
import axios from "axios";
import { baseURL } from "../contants";
import Chart from "chart.js/auto";
import styles from "./SalesDistribution.module.css";

export default function SalesDistribution({ month }) {
	const ref = useRef({
		canvas: null,
		chart: null
	});

	function handleRef(element) {
		ref.current.canvas = element;
		if (ref.current.chart) return;
		ref.current.chart = new Chart(ref.current.canvas, {
			type: "bar",
			data: {
				labels: [],
				datasets: [
					{
						label: "Sales distribution",
						data: [],
						borderWidth: 1,
						backgroundColor: "#55eeee"
					}
				]
			},
			options: {
				scales: {
					y: {
						beginAtZero: true
					}
				}
			}
		});
	}

	useEffect(() => {
		axios({
			method: "GET",
			baseURL,
			url: "/transactions/salesDistribution",
			params: { month }
		}).then((response) => updateChart(response.data));
	}, [month]);

	function updateChart(data) {
		ref.current.chart.data.labels = data.map((item) => `${item.range.from}-${item.range.to}`);
		ref.current.chart.data.datasets[0].data = data.map((item) => item.count);
		ref.current.chart.update();
	}

	return (
		<div class={styles.salesDistribution}>
			<h1>Bar Chart Stats - {month}</h1>
			<canvas ref={handleRef}>Sales Distribution</canvas>
		</div>
	);
}
