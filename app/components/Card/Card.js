import React from 'react';
import styles from "./card.module.css";

function Card({ header, headerExtra, value, valuePercent, state }) {
	let cardState

	if (valuePercent) {
		if (valuePercent.charAt(0) === '+') {
			cardState = 'positive'
		} else { cardState = 'danger' }
	} else { cardState = 'neutral' }

	let textColor = `var(--text-${cardState})`
	if (state) { cardState = state }
	let cardColor = `var(--${cardState})`

	return (
		<div className={styles.card} style={{ backgroundColor: cardColor }} >
			<div className={styles.cardHeader}>
				<p>{header}</p>
				<p className={'text-secondary'}>{headerExtra}</p>
			</div>
			{valuePercent && <h1 style={{color: textColor}}>{valuePercent}</h1>}
			<h1>{value}</h1>
		</div>
	);
}

export default Card;