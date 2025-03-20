'use server'

export async function getModels(futures) {
	return await fetch(`${process.env.BACKEND_URL}:8081/get_data/available_model/${futures}`)
		.then(async res => {
			return await res.json();
		})
}