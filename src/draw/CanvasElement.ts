import anime, { AnimeAnimParams, AnimeInstance, AnimeParams } from 'animejs';

export interface Position {
	x: number;
	y: number;
	z?: number;
}

export interface Size {
	w: number;
	h: number;
}

export interface CanvasElementObject {
	type: 'shape' | 'text' | 'image';
	properties: {
		position: Position;
		size: Size;
		color?: string;
		fontSize?: number;
		lineHeight?: number;
		fontFamily?: string;
		opacity?: number;
	};
	value?: Value;
	entry?: Transition;
	exit?: Transition;
	animate?: AnimateFunction;
}

export interface Value {
	textContent?: string;
	src?: string;
}

export interface Transition {
	type: 'fade' | 'pop';
	duration: number;
}

export type AnimateFunction = (
	$anime: (params: AnimeParams) => AnimeInstance,
	elementInstance: CanvasElement
) => void;

export class CanvasElement {
	element: CanvasElementObject;
	position: Position;
	parentDuration: number;
	style: { opacity: number };
	done: boolean;

	constructor(el: CanvasElementObject, parentDuration: number) {
		this.element = el;
		this.position = el.properties.position;
		this.parentDuration = parentDuration;
		this.style = { opacity: el.properties.opacity || 0 };
		this.done = false;
		this.attachTransitions();
	}

	attachTransitions() {
		if (this.element.entry) {
			if (this.element.entry.type === 'fade') {
				this.style.opacity = 0;
				anime({
					targets: this.style,
					opacity: this.element.properties.opacity || 1,
					round: 10,
					duration: this.element.entry.duration,
					easing: 'easeInQuad',
				});
			}
		}
		if (
			this.element.animate &&
			typeof this.element.animate === 'function'
		) {
			this.element.animate(anime, this);
		}

		if (this.element.exit) {
			if (this.element.exit.type === 'fade') {
				setTimeout(() => {
					const animation = anime({
						targets: this.style,
						opacity: 0,
						round: 10,
						duration: this.element.entry.duration,
						easing: 'easeOutQuad',
					});
					animation.finished.then(() => {
						this.done = true;
					});
				}, this.parentDuration - this.element.entry.duration);
			}
		}
	}

	move(newPosition: Position) {
		this.position = newPosition;
	}

	// To be implemented by each type
	paint(ctx: CanvasRenderingContext2D) {
		if (this.done) return false;
		ctx.fillRect(this.position.x, this.position.y, 100, 100);
		return true;
	}
}
