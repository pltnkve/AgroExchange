import styles from "./AlertChangeFutures.module.css";

function AlertChangeFutures() {
	return (
		<div className={styles.changeFuturesAlert}>
			<h2>Происходит смена фьючерсов</h2>
			<p>Пожалуйста, подождите...</p>
		</div>
	);
}

export default AlertChangeFutures;