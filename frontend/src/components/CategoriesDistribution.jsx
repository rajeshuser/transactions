import React from "react";
import { useEffect, useRef } from "react";
import axios from "axios";
import { baseURL } from "../contants";
import Chart from "chart.js/auto";
import styles from "./CategoriesDistribution.module.css";

export default function CategoriesDistribution({ month }) {
	const ref = useRef({
		canvas: null,
		chart: null
	});

	function handleRef(element) {
		ref.current.canvas = element;
		if (ref.current.chart) return;
		ref.current.chart = new Chart(ref.current.canvas, {
			type: "pie",
			data: {
				labels: [],
				datasets: [
					{
						label: "Categories distribution",
						data: [],
						backgroundColor: [],
						hoverOffset: 1
					}
				]
			}
		});
	}

	useEffect(() => {
		axios({
			method: "GET",
			baseURL,
			url: "/transactions/categoriesDistribution",
			params: { month }
		}).then((response) => {
			const data = [];
			for (let category in response.data) {
				data.push({
					category,
					count: response.data[category]
				});
			}
			updateChart(data);
		});
	}, [month]);

	function updateChart(data) {
		ref.current.chart.data.labels = data.map((item) => item.category);
		ref.current.chart.data.datasets[0].data = data.map((item) => item.count);
		ref.current.chart.data.datasets[0].backgroundColor = data.map((item) => randomColor());
		ref.current.chart.update();
	}

	return (
		<div class={styles.categoriesDistribution}>
			<h1>Pie Chart Stats - {month}</h1>
			<canvas ref={handleRef}>Categories Distribution</canvas>
		</div>
	);
}

function randomColor() {
	const red = Math.floor(Math.random() * 255);
	const green = Math.floor(Math.random() * 255);
	const blue = Math.floor(Math.random() * 255);
	return `rgb(${red},${green},${blue})`;
}
