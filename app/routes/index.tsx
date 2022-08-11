import { json } from "@remix-run/node";
import { useLoaderData, useSearchParams } from "@remix-run/react";
import { useState, useMemo } from 'react';
//import Innertube from 'youtubei.js';

export const loader: LoaderFunction = async ({ request }) => {
	const url = new URL(request.url)
	const search = new URLSearchParams(url.search);

	const Innertube = require('youtubei.js');
	const youtube = await new Innertube();
	return await youtube.search(search.get('query'));
 	//return json({ "test": "test" });
};

const Index = () => {
	const data = useLoaderData();
	console.log(data);
	const [params] = useSearchParams();

  return (
		<>
			<form>
				<input type="text" name="query" placeholder="Search..." defaultValue={params.get("query")} />
			</form>
			<div>
			{data.videos.map(({ id, url, title, metadata }) => (
				<div key={id}>
					<a href={url}>
						<img src={metadata.thumbnails[0].url} />
						<span>{title}</span>
					</a>
				</div>
			))}
			</div>
		</>
  );
}

export default Index;
