import Canvas from './Canvas';
import Effect, { EffectObject } from './Effect';

export interface OverlayConfig {
	[time: string]: EffectObject[];
}

export interface PlayerConfig {
	scale: number;
}

class VideoPlayer extends HTMLElement {
	canvasRenderer: Canvas;
	overlayConfig: OverlayConfig;
	playerConfig: PlayerConfig;
	video: HTMLVideoElement;
	controls: HTMLDivElement;
	paused: boolean = false;
	currentTime: string = '0:00';
	paintRaf: number;
	activeEffects: Effect[] = [];

	constructor() {
		super();
		const shadow = this.attachShadow({ mode: 'open' });
		this.playerConfig = {
			scale: 1,
		};
		this.canvasRenderer = new Canvas(this.playerConfig.scale);
		this.overlayConfig = {};
		this.createVideoElement().then((vid) => {
			this.video = vid;
			const player = document.createElement('div');
			player.style.position = 'relative';
			this.canvasRenderer.canvas.setAttribute(
				'style',
				'position: absolute; top: 0; left: 0'
			);
			player.appendChild(this.canvasRenderer.canvas);
			this.controls = this.createPlayerControls();
			player.appendChild(this.controls);
			player.appendChild(this.video);
			shadow.appendChild(player);
		});
	}

	createVideoElement = () => {
		return new Promise<HTMLVideoElement>((res) => {
			setTimeout(() => {
				let video: HTMLVideoElement;
				video = document.createElement('video');
				video.src = this.dataset.video;

				video.addEventListener('loadedmetadata', () => {
					this.canvasRenderer.canvas.width =
						this.video.videoWidth * this.playerConfig.scale;
					this.canvasRenderer.canvas.height =
						this.video.videoHeight * this.playerConfig.scale;
					this.controls.style.width =
						this.video.videoWidth * this.playerConfig.scale + 'px';
					this.controls.style.height =
						this.video.videoHeight * this.playerConfig.scale + 'px';

					this.canvasRenderer.ctx.scale(
						this.playerConfig.scale,
						this.playerConfig.scale
					);
				});

				video.addEventListener('play', (e) => {
					this.paint();
				});
				res(video);
			});
		});
	};

	createPlayerControls = () => {
		const overlay = document.createElement('div');
		const playButton = document.createElement('button');
		const pauseButton = document.createElement('button');
		playButton.textContent = 'Play';
		playButton.addEventListener('click', () => {
			this.play();
		});

		pauseButton.textContent = 'Pause';
		pauseButton.addEventListener('click', () => {
			this.pause();
		});

		overlay.append(playButton, pauseButton);
		overlay.style.position = 'absolute';
		overlay.style.top = '0px';
		overlay.style.left = '0px';
		return overlay;
	};

	play = () => {
		this.paused = false;
		return this.video.play();
	};

	pause = () => {
		this.paused = true;
		this.video.pause();
	};

	progress = (time: number): boolean => {
		if (this.currentTime !== time.toFixed(1).toString()) {
			this.currentTime = time.toFixed(1).toString();
			return true;
		}
		return false;
	};

	paint = () => {
		if (!this.paused) {
			this.paintRaf = requestAnimationFrame(this.paint);
		} else {
			cancelAnimationFrame(this.paintRaf);
		}

		// Check if there are new effects for current time, if yes then add them to the effects array
		const tick = this.progress(this.video.currentTime);
		if (tick) {
			this.addNewEffects();
		}

		// Clear before repaint
		this.canvasRenderer.ctx.clearRect(
			0,
			0,
			this.canvasRenderer.ctx.canvas.width,
			this.canvasRenderer.ctx.canvas.height
		);

		// Draw active effects
		this.drawActiveEffects();
	};

	drawActiveEffects = () => {
		this.activeEffects.forEach((effect) => {
			effect.paint(this.canvasRenderer.ctx);
		});
	};

	addNewEffects = () => {
		if (this.overlayConfig[this.currentTime]) {
			this.overlayConfig[this.currentTime].forEach((eff) => {
				this.createAndAddEffect(eff);
			});
		}
	};

	createAndAddEffect = (effect: EffectObject) => {
		const newEffect = new Effect(effect, Number(this.currentTime));
		this.activeEffects.push(newEffect);
	};
}

export default VideoPlayer;
