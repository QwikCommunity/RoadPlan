import { component$, useStylesScoped$ } from '@builder.io/qwik';
import style from './Footer.scss?inline';
import { GitHubIcon } from '../GitHubIcon/GitHubIcon';

export const Footer = component$(() => {
	useStylesScoped$(style);
	return (
		<footer class='footer_class_1'>
			<div class='footer_class_2'>
				<div class='footer_class_2_left' />
				<div class='footer_class_2_center' />
				<div class='footer_class_2_right'>
					<a
						href='https://github.com/QwikDev/RoadPlan'
						rel='noopener noreferrer'
						target='_blank'
						title='QwikDev/RoadPlan'
						aria-label='QwikDev/RoadPlan'
					>
						<GitHubIcon />
					</a>
				</div>
			</div>
		</footer>
	);
});
