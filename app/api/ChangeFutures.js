'use server'

async function ChangeFutures(firstFutures, secondFutures) {
	return await fetch(`${process.env.BACKEND_URL}:8081/change_futures/${firstFutures}/${secondFutures}`);
}

export default ChangeFutures;