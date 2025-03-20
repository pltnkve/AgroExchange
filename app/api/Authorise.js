'use server'
import {cookies} from 'next/headers';


async function Authorise() {
	const cookie = (await cookies()).toString();

	const response = await fetch(`${process.env.BACKEND_URL}:8079/protected-route`, {
		credentials: "include",
		headers: { Cookie: cookie, 'accept': 'application/json' },
	});

	return response.status;
}


export default Authorise;