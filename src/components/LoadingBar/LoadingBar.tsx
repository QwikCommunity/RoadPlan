import {
	$,
	component$,
	useSignal,
	useStylesScoped$,
	useVisibleTask$,
} from '@builder.io/qwik';
import { config } from '../../../road-plan.config';
import style from './LoadingBar.scss?inline'

export const LoadingBar = component$(() => {
	useStylesScoped$(style);
	useStylesScoped$(`
		.progress-bar {
			height: ${config.loadingBar.height};
		}	
	`);
	const scrolledSig = useSignal(0);

	const caluclateScroll = $(() => {
		const winScroll =
			document.body.scrollTop || document.documentElement.scrollTop;
		const height =
			document.documentElement.scrollHeight -
			document.documentElement.clientHeight;
		scrolledSig.value = (winScroll / height) * 100;
	});

	useVisibleTask$(() => {
		window.onscroll = () => {
			caluclateScroll();
		};
		caluclateScroll();
	});

	return (
		<div class='progress-bar' style={{ width: `${scrolledSig.value}%` }}></div>
	);
});
