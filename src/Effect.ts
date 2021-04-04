import { CanvasElement, CanvasElementObject } from './draw/CanvasElement';
import { Shape } from './draw/Shape';
import { Text } from './draw/Text';
import { CImage } from './draw/Image';

export interface EffectObject {
	duration: number;
	elements: CanvasElementObject[];
}

export interface EffectInterface {
	effect: EffectObject;
	startedAt: number;
	paint: (ctx: CanvasRenderingContext2D) => void;
}

class Effect implements EffectInterface {
	effect: EffectObject;
	startedAt: number;
	elements: CanvasElement[];

	constructor(effect: EffectObject, startedAt: number) {
		this.effect = effect;
		this.startedAt = startedAt;
		this.elements = this.createElements();
	}

	createElements() {
		// this.effect.type -> create elements
		return this.effect.elements.map((el) => {
			switch (el.type) {
				case 'text':
					return new Text(el, this.effect.duration);
				case 'shape':
					return new Shape(el, this.effect.duration);
				case 'image':
					return new CImage(el, this.effect.duration);
				default:
					return new CanvasElement(el, this.effect.duration);
			}
		});
	}

	paint = (ctx: CanvasRenderingContext2D) => {
		let doneElementIds: number[] = [];
		this.elements.forEach((el, i) => {
			if (!el.paint(ctx)) {
				doneElementIds.push(i);
			}
		});
		this.elements = this.elements.filter(
			(_, i) => doneElementIds.indexOf(i) === -1
		);
	};
}

export default Effect;
