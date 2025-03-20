'use server'

export async function getFuturesDates(model, futures) {
	return await fetch(`${process.env.BACKEND_URL}:8081/get_data/available_dates/${model}/${futures}`)
		.then(async data => {
			data = await data.json();
			[].sort.call( data, (a, b) => b['date_of_prediction'] - a['date_of_prediction'] )
			let res = [];
			for (let i = 0, l = data.length; i < l; ++i) {
				let date = new Date(data[i]['date_of_prediction'] * 1000);

				res.push({
					'unix': data[i]['date_of_prediction'],
					'date': `${
						date.getDate().toString().length === 1 ? '0' + date.getDate() : date.getDate()
					}.${
						(date.getMonth() + 1).toString().length === 1 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
					}.${
						date.getFullYear()
					}`
				})
			}

			return res;
		})
}