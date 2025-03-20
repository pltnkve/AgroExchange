import styles from "@/app/loading.module.css";

export default function Loading() {
	return (
		<div className={styles.page}>
			<img className={styles.logo} src={'/logo.svg'} alt={''}/>
			<h1>AgroExchange</h1>
		</div>
	)
}