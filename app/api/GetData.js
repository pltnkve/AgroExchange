'use server'

import {getUSD} from "@/app/api/functions/getUSD";
import {getCNY} from "@/app/api/functions/getCNY";
import {getCNYData} from "@/app/api/functions/getCNYData";
import {getOil} from "@/app/api/functions/getOil";
import {getFuturesDates} from "@/app/api/functions/getFuturesDates";
import {getOilData} from "@/app/api/functions/getOilData";
import {getForecast} from "@/app/api/functions/getForecast";
import {getNews} from "@/app/api/functions/getNews";
import {getChangeFuturesStatus} from "@/app/api/functions/getChangeFuturesStatus";
import {getModels} from "@/app/api/functions/getModels";
import {getFutures} from "@/app/api/functions/getFutures";

async function GetData( onlyFutures = false ) {

	if (onlyFutures) { return await getFutures(); }

	const [currentFutures, nextFutures] = await getFutures();

	const [currentModels, nextModels] = await Promise.all([
		getModels(currentFutures),
		getModels(nextFutures),
	]);

	const [currentFuturesDates, nextFuturesDates] = await Promise.all([
		await getFuturesDates(currentModels[0], currentFutures),
		await getFuturesDates(nextModels[0], nextFutures),
	]);

	const [
		currentOil,
		cny,
		usd,
		oilData,
		cnyData,
		currentForecast,
		news,
		nextOil,
		changeFuturesStatus,
		nextForecast
	] = await Promise.all([
		getOil(currentFutures),
		getCNY(),
		getUSD(),
		getOilData(currentFutures),
		getCNYData(),
		getForecast(currentModels[0], currentFutures, currentFuturesDates[0].unix),
		getNews(),
		getOil(nextFutures),
		getChangeFuturesStatus(),
		getForecast(nextModels[0], nextFutures, nextFuturesDates[0].unix),
	]);

	return {
		'currentOil': currentOil,
		'cny': cny,
		'usd': usd,
		'oilData': oilData,
		'cnyData': cnyData,
		'currentForecast': currentForecast,
		'news': news,
		'nextOil': nextOil,
		'currentFutures': currentFutures,
		'nextFutures': nextFutures,
		'changeFuturesStatus': changeFuturesStatus,
		'currentFuturesDates': currentFuturesDates,
		'nextFuturesDates': nextFuturesDates,
		'nextForecast': nextForecast,
		'currentModels': currentModels,
		'nextModels': nextModels,
	};
}

export default GetData;