export default function manifest() {
	return {
		name: 'AgroExchange',
		short_name: 'AgroExchange',
		description: 'Forecasting rapeseed oil',
		start_url: '/',
		display: 'standalone',
		background_color: '#fff',
		theme_color: '#fff',
		icons: [
			{
				src: '/web-app-manifest-192x192.png',
				sizes: '192x192',
				type: 'image/png',
			},
			{
				src: '/web-app-manifest-512x512.png',
				sizes: '512x512',
				type: 'image/png',
			},
		],
	}
}