import { CanvasElement } from './CanvasElement';
import Color from 'color';

export class Text extends CanvasElement {
	paint(ctx: CanvasRenderingContext2D) {
		if (this.done) return false;
		ctx.save();
		const textColor = Color(this.element.properties.color).alpha(
			this.style.opacity
		);
		ctx.fillStyle = textColor.rgb().string();
		ctx.font = `${this.element.properties.fontSize || 20}px ${
			this.element.properties.fontFamily
		}`;
		const lines = makeParagraph(
			ctx,
			this.element.value.textContent,
			this.element.properties.size.w
		);
		lines.forEach((line, i) => {
			ctx.fillText(
				line,
				this.position.x,
				this.position.y +
					i *
						(this.element.properties.fontSize +
							(this.element.properties.lineHeight || 4))
			);
		});
		ctx.restore();
		return true;
	}
}

const makeParagraph = (
	ctx: CanvasRenderingContext2D,
	text: string,
	width: number
) => {
	if (ctx.measureText(text).width <= width) return [text];
	else {
		let words = text.split(' ');
		let start = 0,
			pointer = words.length / 2,
			lines: string[] = [];
		while (true) {
			let currLine = words.slice(start, pointer);
			let w = ctx.measureText(currLine.join(' ')).width;
			let widthBuffer =
				ctx.measureText(currLine[currLine.length - 1]).width + 60;
			if (pointer > words.length) {
				lines.push(currLine.join(' '));
				break;
			}
			if (w > width) {
				pointer--;
			} else if (w < width - widthBuffer) {
				pointer++;
			} else {
				lines.push(currLine.join(' '));
				start = pointer;
				pointer = pointer + (pointer - start);
			}
		}

		return lines;
	}
};
