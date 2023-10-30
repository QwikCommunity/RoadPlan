import {
	$,
	component$,
	useSignal,
	useStylesScoped$,
	useVisibleTask$,
} from '@builder.io/qwik';
import { config } from '../../road-plan.config';

export const LoadingBar = component$(() => {
	const scrolledSig = useSignal(0);
	useStylesScoped$(`
    .progress-bar {
      display: ${config.loadingBar.enabled ? 'block' : 'none'};
      position: fixed;
      top: 0;
      z-index: 1;
      width: 0%;
      height: ${config.loadingBar.height};
      background: rgb(25,182,246);
      background: -moz-linear-gradient(0deg, rgba(25,182,246,1) 0%, rgba(172,126,244,1) 100%);
      background: -webkit-linear-gradient(0deg, rgba(25,182,246,1) 0%, rgba(172,126,244,1) 100%);
      background: linear-gradient(0deg, rgba(25,182,246,1) 0%, rgba(172,126,244,1) 100%);
      filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#19b6f6",endColorstr="#ac7ef4",GradientType=1);
    }
  `);

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
