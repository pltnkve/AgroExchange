'use server'

export default async function MathForecast(oil, forecast) {
	function countValue(value) {
		let percent = ((value / oil - 1) * 100).toFixed(2);
		if (percent.charAt(0) === '-') {
			return [percent, value.toFixed().toString()];
		}
		return ['+' + percent, value.toFixed().toString()];
	}

	const today = Date.now();
	const targets = {
		tomorrow: today + 86400000,
		oneWeek: today + 86400000 * 7,
		twoWeeks: today + 86400000 * 14,
		month: today + 86400000 * 30
	};

	let result = { tomorrow: ['?', '?'], oneWeek: ['?', '?'], twoWeeks: ['?', '?'], month: ['?', '?'] };
	let closest = { tomorrow: null, oneWeek: null, twoWeeks: null, month: null };

	if (forecast && forecast.length > 0) {
		for (let i = 0; i < forecast.length; i++) {
			let forecastDate = new Date(forecast[i]['time'] * 1000);
			let forecastTimestamp = forecastDate.getTime();

			for (let key in targets) {
				if (forecastTimestamp >= targets[key] && (closest[key] === null || forecastTimestamp < closest[key].time)) {
					closest[key] = { time: forecastTimestamp, value: forecast[i]['value'] };
				}
			}
		}
	}

	for (let key in closest) {
		if (closest[key]) {
			result[key] = countValue(closest[key].value);
		}
	}

	return result;
}
