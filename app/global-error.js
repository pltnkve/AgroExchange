'use client'

import localFont from "next/font/local";
import styles from './page.module.css';


const fontInterVariable = localFont({
	src: "./fonts/InterVariable.woff2",
	variable: "--font-interVariable",
});

export default function GlobalError() {
	return (
		<html lang="ru" className={fontInterVariable.className}>
			<body>
				<div className={styles.page} style={{ flexDirection: 'column', alignItems: 'center', justifyContent: "center", gap: '15px' }}>
					<img src={'/503.svg'} alt={'503'} style={{ position: 'absolute', width: '95%', zIndex: -1 }} />
					<h2>Сервис временно недоступен</h2>
					<button onClick={() => window.location.reload()}>Попробовать снова</button>
				</div>
			</body>
		</html>
	)
};