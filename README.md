# canvas-video

Create visual animations over HTML video on the fly

---

## Usage

This package isn't yet bundled as a npm package as it is still in development. It can be run on local by cloning this repository and running

```
npm install
npm start
```

This is a custom web component and hence is independent of any framework. It can be registered as a custom element.

```ts
import VideoPlayer from './src/VideoPlayer';

customElements.define('canvas-video', VideoPlayer);
```

## Configuration

The component uses a configuration object to display visuals. A sample object looks like this:

```js
{
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
					animate: ($anime, el) => {
						setTimeout(() => {
							$anime({
								targets: el.position,
								x: 300,
								y: 500,
								round: 10,
								duration: 500,
								easing: 'easeInQuad',
							});
						}, 4000);
					},
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
	]
}
```

This renders a text block as follows:

![Demo](assets/img/demo.gif)

## Supported Elements

-   Text
-   Shape
-   Image
