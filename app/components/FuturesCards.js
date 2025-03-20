'use client'

import styles from "@/app/page.module.css";
import Card from "@/app/components/Card/Card";

function FuturesCards({ incomingData, type = 'currentFutures' }) {

	function getFirstCard() {
		if (type === 'nextFutures') {
			return (
				<Card header={'Сегодня'}
							value={incomingData.nextOil['Oil'] + ' ¥'}
							valuePercent={''}
							state={'neutral'}
				/>
			);
		}

		return (
			<Card header={'Завтра'}
						value={currentForecastCards['tomorrow'][1] + ' ¥'}
						valuePercent={currentForecastCards['tomorrow'][0] + '%'}
			/>
		);
	}

	return (
		<div className={styles.infoFutures}>
			<h1>Прогнозы на фьючерс {incomingData.nextFutures}</h1>
			<div className={styles.infoCards}>
				<div className={styles.infoRow}>
					{ getFirstCard() }
					<Card header={'Одна неделя'}
								value={nextForecastCards['oneWeek'][1] + ' ¥'}
								valuePercent={nextForecastCards['oneWeek'][0] + '%'}
					/>
				</div>
				<div className={styles.infoRow}>
					<Card header={'Две недели'}
								value={nextForecastCards['twoWeeks'][1] + ' ¥'}
								valuePercent={nextForecastCards['twoWeeks'][0] + '%'}
					/>
					<Card header={'Месяц'}
								value={nextForecastCards['month'][1] + ' ¥'}
								valuePercent={nextForecastCards['month'][0] + '%'}
					/>
				</div>
			</div>
		</div>
	);
}

export default FuturesCards;