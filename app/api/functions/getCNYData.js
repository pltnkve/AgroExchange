'use server'

export async function getCNYData() {
	return await fetch(`${process.env.BACKEND_URL}:8079/parsing/get_all_cny`)
		.then(async res => {
			if (!res.ok) { return '?'; }
			return await res.json();
		})
}