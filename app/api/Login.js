'use server'

import {cookies} from "next/headers";


async function Login(props) {
	const response = await fetch(`${process.env.BACKEND_URL}:8079/auth/login`, {
		mode: 'cors',
		credentials: 'include',
		method: 'POST',
		headers: {'Content-Type': 'application/x-www-form-urlencoded', 'accept': 'application/json'},
		body: `grant_type=password&username=${props.username}&password=${props.password}&scope=&client_id=&client_secret=`
	});

	if (response.ok) {
		const cookie = response.headers.get('set-cookie').split('; ');
		const cookieStore = await cookies();
		cookieStore.set({
			name: cookie[0].split('=')[0],
			value: cookie[0].split('=')[1],
			httpOnly: true,
			maxAge: parseInt(cookie[2].split('=')[1]),
			sameSite: 'lax',
			secure: false,
		})
	} else {
		return { message: 'Неверные данные' };
	}

	return { message: 'passed' };
}

export default Login;