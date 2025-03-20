'use server'

export async function getChangeFuturesStatus() {
	return await fetch(`${process.env.BACKEND_URL}:8081/change_futures/status`)
		.then(async res => {
			return await res.json();
		})
}