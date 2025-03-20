'use server'

export async function getFutures() {
	return await fetch(`${process.env.BACKEND_URL}:8081/get_data/current_futures_pair`)
		.then(async res => {
			if (!res.ok) { return ['?', '?']; }
			res = await res.json();
			return [res['first_futures'], res['second_futures']]
		})
}