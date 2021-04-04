class Canvas {
	canvas: HTMLCanvasElement;
	ctx: CanvasRenderingContext2D;
	constructor(scale: number) {
		this.canvas = document.createElement('canvas');
		this.ctx = this.canvas.getContext('2d');
	}

	paint = () => {
		this.ctx.fillStyle = '#000';
		this.ctx.fillRect(100, 100, 200, 200);
	};

	drawVideo = (
		video: HTMLVideoElement,
		position: { x: number; y: number }
	) => {
		this.ctx.drawImage(video, position.x, position.y);
	};
}

export default Canvas;
