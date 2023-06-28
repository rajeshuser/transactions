import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import SearchAndMonth from "./components/SearchAndMonth";
import Transactions from "./components/Transactions";
import Stats from "./components/Stats";
import SalesDistribution from "./components/SalesDistribution";
import CategoriesDistribution from "./components/CategoriesDistribution";

function App() {
	const [search, setSearch] = useState("");
	const [month, setMonth] = useState("March");

	const headingStyle = {
		backgroundColor: "white",
		borderRadius: "500px",
		padding: "40px 15px",
		margin: "20px auto",
		width: "fit-content",
		fontSize: "1.3rem"
	};

	return (
		<div className="App">
			<h1 style={headingStyle}>
				Transaction <br />
				Dashboard
			</h1>
			<SearchAndMonth {...{ search, setSearch, month, setMonth }} />
			<Transactions search={search} month={month} />
			<Stats month={month} />
			<SalesDistribution month={month} />
			<CategoriesDistribution month={month} />
		</div>
	);
}

export default App;
