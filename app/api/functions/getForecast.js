'use server'

export async function getForecast(model, futures, date) {
	return await fetch(`${process.env.BACKEND_URL}:8081/get_data/predicted_values/${model}/${futures}/${date}`)
		.then(async res => {
			if (!res.ok) { return ''; }
			return (await res.json())['predictions'];
		})
}