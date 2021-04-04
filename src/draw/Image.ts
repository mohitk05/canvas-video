import { CanvasElement } from './CanvasElement';

export class CImage extends CanvasElement {
	image: HTMLImageElement;
	paint(ctx: CanvasRenderingContext2D) {
		if (this.done) return false;
		if (!this.image) {
			this.image = new Image(
				this.element.properties.size.w,
				this.element.properties.size.h
			);
			this.image.src = this.element.value.src;
		}
		ctx.drawImage(
			this.image,
			this.position.x,
			this.position.y,
			this.image.width,
			this.image.height
		);
		return true;
	}
}
