import styles from "./page.module.css";
import {TradingViewChart} from "@/app/components/TradingViewChart";
import Card from "@/app/components/Card/Card";
import Authorise from "@/app/api/Authorise";
import {redirect} from "next/navigation";
import GetData from "@/app/api/GetData";
import MathForecast from "@/app/api/MathForecast";
import OilChart from "@/app/components/OilChart";
import AlertChangeFutures from "@/app/components/AlertChangeFutures/AlertChangeFutures";


export default async function Home() {
	const status = await Authorise()

	if (status !== 200) {
		redirect('/login')
	} else {

		const data = await GetData();

		const [currentForecastCards, nextForecastCards] = await Promise.all([
			await MathForecast(parseInt(data.currentOil['Oil'], 10), data.currentForecast),
			await MathForecast(parseInt(data.nextOil['Oil'], 10), data.nextForecast),
		])

		return (
			<div className={styles.page}>
				<div className={styles.infoContainer}>

					{
						data.changeFuturesStatus
							? <AlertChangeFutures />
							: null
					}

					<div className={styles.infoMain}>
						<div className={styles.infoRow}>
							<Card header={'Рапсовое масло'}
										value={data.currentOil['Oil'] + ' ¥'}
										headerExtra={data.currentFutures}
							/>
							<Card header={'Курс юаня'}
										value={data.cny + ' ₽'}
										headerExtra={'Мосбиржа'}
							/>
						</div>
						<div className={styles.infoRow}>
							<Card header={'Курс доллара'}
										value={data.usd + ' ₽'}
										headerExtra={'ЦБ'}
							/>
							<Card header={'Цена на заключение'}
										value={data.currentOil['Conclusion'] + ' ¥'}
										headerExtra={data.currentFutures}
							/>
						</div>
					</div>

					<div className={styles.infoFutures}>
						<h1>Прогнозы на фьючерс {data.currentFutures}</h1>
						<div className={styles.infoCards}>
							<div className={styles.infoRow}>
								<Card header={'Завтра'}
											value={currentForecastCards['tomorrow'][1] + ' ¥'}
											valuePercent={currentForecastCards['tomorrow'][0] + '%'}
								/>
								<Card header={'Одна неделя'}
											value={currentForecastCards['oneWeek'][1] + ' ¥'}
											valuePercent={currentForecastCards['oneWeek'][0] + '%'}
								/>
							</div>
							<div className={styles.infoRow}>
								<Card header={'Две недели'}
											value={currentForecastCards['twoWeeks'][1] + ' ¥'}
											valuePercent={currentForecastCards['twoWeeks'][0] + '%'}
								/>
								<Card header={'Месяц'}
											value={currentForecastCards['month'][1] + ' ¥'}
											valuePercent={currentForecastCards['month'][0] + '%'}
								/>
							</div>
						</div>
					</div>

					<div className={styles.infoFutures}>
						<h1>Прогнозы на фьючерс {data.nextFutures}</h1>
						<div className={styles.infoCards}>
							<div className={styles.infoRow}>
								<Card header={'Сегодня'}
											value={data.nextOil['Oil'] + ' ¥'}
											valuePercent={''}
											state={'neutral'}
								/>
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

					<div className={styles.infoNews}>
						<h1>Новости</h1>
						{data.news}
					</div>
				</div>

				<div className={styles.chartContainer}>

					<OilChart incomingData={data}/>

					<div className={styles.newsYuanContainer}>
						<div className={styles.infoNews}>
							<h1>Новости</h1>
							{data.news}
						</div>

						<div className={styles.boxChart}>
							<p className={styles.legend}>Курс юаня к рублю</p>
							<TradingViewChart yuanData={data.cnyData}/>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
