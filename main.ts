import VideoPlayer, { OverlayConfig } from './src/VideoPlayer';

customElements.define('canvas-video', VideoPlayer);

const sampleOverlayConfig: OverlayConfig = {
	'4.0': [
		{
			duration: 20000,
			elements: [
				{
					type: 'shape',
					properties: {
						position: {
							x: 75,
							y: 35,
						},
						size: {
							w: 450,
							h: 230,
						},
						color: 'brown',
						opacity: 0.8,
					},
					value: {
						textContent: 'Hello, world!',
					},
					entry: {
						type: 'fade',
						duration: 500,
					},
					exit: {
						type: 'fade',
						duration: 500,
					},
					// animate: ($anime, el) => {
					// 	setTimeout(() => {
					// 		$anime({
					// 			targets: el.position,
					// 			x: 300,
					// 			y: 500,
					// 			round: 10,
					// 			duration: 500,
					// 			easing: 'easeInQuad',
					// 		});
					// 	}, 4000);
					// },
				},
				{
					type: 'text',
					properties: {
						position: {
							x: 100,
							y: 100,
						},
						size: {
							w: 400,
							h: 200,
						},
						color: 'white',
						fontSize: 40,
						fontFamily: 'Prata',
					},
					value: {
						textContent: 'Hello, world!',
					},
					entry: {
						type: 'fade',
						duration: 500,
					},
					exit: {
						type: 'fade',
						duration: 500,
					},
				},
				{
					type: 'text',
					properties: {
						position: {
							x: 100,
							y: 150,
						},
						size: {
							w: 400,
							h: 200,
						},
						color: 'white',
						fontSize: 20,
						lineHeight: 5,
						fontFamily: 'Prata',
					},
					value: {
						textContent:
							'This text is dynamic! Go ahead and change it on the right and replay the video. It should also wrap around the edges properly.',
					},
					entry: {
						type: 'fade',
						duration: 500,
					},
					exit: {
						type: 'fade',
						duration: 500,
					},
				},
			],
		},
	],
	'10.0': [
		{
			duration: 20000,
			elements: [
				{
					type: 'shape',
					properties: {
						position: {
							x: 700,
							y: 450,
						},
						size: {
							w: 650,
							h: 140,
						},
						color: 'black',
						opacity: 0.7,
					},
					value: {
						textContent: 'Hello, world!',
					},
					entry: {
						type: 'fade',
						duration: 500,
					},
					exit: {
						type: 'fade',
						duration: 500,
					},
				},
				{
					type: 'text',
					properties: {
						position: {
							x: 725,
							y: 515,
						},
						size: {
							w: 400,
							h: 200,
						},
						color: 'white',
						fontSize: 40,
						fontFamily: 'Prata',
					},
					value: {
						textContent: 'Big Buck Bunny',
					},
					entry: {
						type: 'fade',
						duration: 500,
					},
					exit: {
						type: 'fade',
						duration: 500,
					},
				},
				{
					type: 'text',
					properties: {
						position: {
							x: 725,
							y: 550,
						},
						size: {
							w: 400,
							h: 200,
						},
						color: 'white',
						fontSize: 20,
						lineHeight: 5,
						fontFamily: 'Prata',
					},
					value: {
						textContent: 'Made using Blender',
					},
					entry: {
						type: 'fade',
						duration: 500,
					},
					exit: {
						type: 'fade',
						duration: 500,
					},
				},
			],
		},
	],
};

window.addEventListener('load', () => {
	const el: VideoPlayer = document.getElementById('cnvs-vid') as VideoPlayer;

	el.overlayConfig = sampleOverlayConfig;
	let updateButton = document.getElementById('update-config');
	(document.getElementById(
		'config'
	) as HTMLTextAreaElement).value = JSON.stringify(
		sampleOverlayConfig,
		null,
		2
	);
	updateButton.addEventListener('click', () => {
		try {
			let c: HTMLTextAreaElement = document.getElementById(
				'config'
			) as HTMLTextAreaElement;
			el.overlayConfig = JSON.parse(c.value);
		} catch (e) {
			console.error(e);
		}
	});
});
