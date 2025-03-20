'use server'

export async function getOil(futures) {
	return await fetch(`${process.env.BACKEND_URL}:8079/parsing/get_oil/${futures}`)
		.then(async res => {
			if (!res.ok) { return {'Oil': '?', 'Conclusion': '?'}; }
			return await res.json();
		})
}