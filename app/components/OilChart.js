'use client'

import React, {useEffect } from 'react';
import styles from "@/app/page.module.css";
import {TradingViewChart} from "@/app/components/TradingViewChart";
import useChartStore from "@/app/store";

function OilChart({ incomingData }) {

	const {
		data,
		selectedFutures,
		selectedModel,
		selectedDate,
		setSelectedFutures,
		setSelectedModel,
		setSelectedDate,
		initialize,
	} = useChartStore();

	useEffect(() => {
		initialize(incomingData);
	}, []);

	return (
		<div className={styles.boxChart}>
			<section className={styles.legend}>
				<p>Рапсовое масло</p>

				<select name={'futures'}
								className={styles.legendSelect}
								value={selectedFutures}
								onChange={(e) => setSelectedFutures(e.target.value)}
				>
					<option value={incomingData.currentFutures}>{incomingData.currentFutures}</option>
					<option value={incomingData.nextFutures}>{incomingData.nextFutures}</option>
				</select>

				<select name={'model'}
								className={styles.legendSelect}
								value={selectedModel}
								onChange={(e) => setSelectedModel(e.target.value)}
				>
					{data.models.map((model, index) => {
						return <option value={model} key={index}>{model}</option>
					})}
				</select>

				<select name={'date'}
								className={styles.legendSelect}
								value={selectedDate}
								onChange={(e) => setSelectedDate(e.target.value)}
				>
					{data.futuresDates.map((date) => {
						return (<option value={date.unix} key={date.unix}>{date.date}</option>);
					})}
				</select>
			</section>

			<TradingViewChart historyData={data.oilData} forecastData={data.forecast}/>
		</div>
	);
}

export default OilChart;