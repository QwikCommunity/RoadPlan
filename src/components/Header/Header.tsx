import { component$, useStylesScoped$ } from '@builder.io/qwik';
import style from './Header.scss?inline';
import { QwikIcon } from '../QwikIcon/QwikIcon';
import { GitHubIcon } from '../GitHubIcon/GitHubIcon';

export const Header = component$(() => {
	useStylesScoped$(style);
	return (
		<header class='class_1'>
			<div class='class_2'>
				<div class='class_3'>
					<button class='class_6'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							xmlns:xlink='http://www.w3.org/1999/xlink'
							role='img'
							class='icon'
							style=''
							width='1em'
							height='1em'
							viewBox='0 0 24 24'
						>
							<path
								fill='none'
								stroke='currentColor'
								stroke-linecap='round'
								stroke-linejoin='round'
								stroke-width='2'
								d='M4 6h16M4 12h16M4 18h16'
							></path>
						</svg>
					</button>
					<a href='/' class='class_6_1' aria-label='Docus'>
						<QwikIcon />
					</a>
				</div>
				<div class='class_4'>
					<div class='class_4_1'>
						<QwikIcon />
					</div>
				</div>
				<div class='class_5'>
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
		</header>
	);
});
