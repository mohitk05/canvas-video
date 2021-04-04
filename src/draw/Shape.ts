import { CanvasElement } from './CanvasElement';
import Color from 'color';

export class Shape extends CanvasElement {
	paint(ctx: CanvasRenderingContext2D) {
		if (this.done) return false;
		ctx.save();
		const shapeColor = Color(this.element.properties.color).alpha(
			this.style.opacity
		);
		ctx.fillStyle = shapeColor.rgb().string();
		ctx.fillRect(
			this.position.x,
			this.position.y,
			this.element.properties.size.w,
			this.element.properties.size.h
		);
		ctx.restore();
		return true;
	}
}
