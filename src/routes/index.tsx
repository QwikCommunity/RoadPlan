import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';

export default component$(() => {
	return (
		<div style={{ height: '1600px', width: '10px' }}>
			<h1>Hi 👋</h1>
			<p>
				Can't wait to see what you build with qwik!
				<br />
				Happy coding.
			</p>
		</div>
	);
});

export const head: DocumentHead = {
	title: 'Welcome to Qwik',
	meta: [
		{
			name: 'description',
			content: 'Qwik site description',
		},
	],
};
