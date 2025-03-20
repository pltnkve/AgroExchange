'use server'

export async function getNews() {
	return await fetch(`${process.env.BACKEND_URL}:8079/parsing/get_news`)
		.then(async data => {
			if (!data.ok) { return '?'; }
			data = await data.json();

			let res = [];
			for (let i = 0; i < data.length; i++) {
				res.push(
					<a key={i} href={data[i].link} target="_blank" rel="noopener noreferrer">
						<div className={'link-box'}>{data[i].title}<p className={'text-secondary'}>{data[i].date}</p></div>
					</a>
				);
			}
			return res;
		})
}