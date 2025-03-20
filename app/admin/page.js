'use client'
import styles from './page.module.css'
import {useRouter} from "next/navigation";
import React, {useEffect, useState} from "react";
import Authorise from "@/app/api/Authorise";
import getData from "@/app/api/GetData";
import ChangeFutures from "@/app/api/ChangeFutures";

function Admin() {
	const router = useRouter();

	const [futures, setFutures] = useState([null, null]);

	const checkAuth = async () => {
		const status = await Authorise();
		if (status !== 200) { router.push("/login"); }
	}

	const getFutures = async () => {
		setFutures(await getData(true));
	}

	useEffect(() => {
		void checkAuth();
		void getFutures();
	}, []);

	const [errorMessage, setErrorMessage] = useState('');
	const [successMessage, setSuccessMessage] = useState('');

	async function handleSubmit(event) {
		event.preventDefault();

		const formData = new FormData(event.currentTarget);
		const firstFutures = Number(formData.get('firstFutures').trim());
		const secondFutures = Number(formData.get('secondFutures').trim());

		if (firstFutures === futures[0] && secondFutures === futures[1]) {
			setErrorMessage(`Фьючерсы ${firstFutures} и ${secondFutures} уже на странице`);
		}
		else if (firstFutures % 2 !== 1 || secondFutures % 2 !== 1) {
			setErrorMessage('Несуществующие значения фьючерсов');
		}
		else if (firstFutures === secondFutures) {
			setErrorMessage('Первый и второй фьючерсы равны');
		}
		else {
			void ChangeFutures(firstFutures, secondFutures);
			setSuccessMessage('Переход запущен успешно');
			setTimeout(() => { router.push('/') }, 3000)
		}
	}

	return (
		<div className={styles.page}>
			<form className={styles.container} onSubmit={handleSubmit}>
				<h1 style={{textAlign: 'center'}}>Смена фьючерсов</h1>
				<input type={'number'} name={'firstFutures'} placeholder={'Первый'} defaultValue={futures[0]} required />
				<input type={'number'} name={'secondFutures'} placeholder={'Второй'} defaultValue={futures[1]} required />
				<button type={'submit'}>Запустить переход</button>
				{ errorMessage ? <p style={{color: 'var(--text-danger)'}}>{errorMessage}</p> : null }
				{ successMessage ? <p style={{color: 'var(--text-positive)'}}>{successMessage}</p> : null }
			</form>
		</div>
	);
}

export default Admin;