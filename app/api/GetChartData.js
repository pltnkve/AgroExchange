'use server'

import {getFuturesDates} from "@/app/api/functions/getFuturesDates";
import {getModels} from "@/app/api/functions/getModels";
import {getOilData} from "@/app/api/functions/getOilData";
import {getForecast} from "@/app/api/functions/getForecast";

async function GetChartData(changed, selectedFutures, selectedModel, selectedDate, oldData) {

	let models, futuresDates, oilData, forecast;

	switch (changed) {
		case 'futures':
			models = await getModels(selectedFutures);
			futuresDates = await getFuturesDates(models[0], selectedFutures);
			[oilData, forecast] =
				await Promise.all([
					getOilData(selectedFutures),
					getForecast(models[0], selectedFutures, futuresDates[0].unix),
			]);
			break;
		case 'model':
			models = oldData.models;
			futuresDates = await getFuturesDates(selectedModel, selectedFutures);
			oilData = oldData.oilData;
			forecast = await getForecast(selectedModel, selectedFutures, futuresDates[0].unix);
			break;
		case 'date':
			models = oldData.models;
			futuresDates = oldData.futuresDates;
			oilData = oldData.oilData;
			forecast = await getForecast(selectedModel, selectedFutures, selectedDate);
			break;
		default:
			break;
	}

	return {
		'oilData': oilData,
		'forecast': forecast,
		'futuresDates': futuresDates,
		'models': models,
	};
}

export default GetChartData;