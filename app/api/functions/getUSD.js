'use server'

export async function getUSD() {
	return await fetch(`${process.env.BACKEND_URL}:8079/parsing/get_usd`)
		.then(async res => {
			if (!res.ok) { return '?'; }
			return (await res.json())['USD'];
		})
}