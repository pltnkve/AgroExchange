'use server'

export async function getOilData(futures) {
	return await fetch(`${process.env.BACKEND_URL}:8079/parsing/get_all_oil/${futures}`)
		.then(async res => {
			if (!res.ok) { return ''; }
			return await res.json();
		})
}