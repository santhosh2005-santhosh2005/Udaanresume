function rgbToHsv(color) {
	const r = color.r / 255;
	const g = color.g / 255;
	const b = color.b / 255;
	const max = Math.max(r, g, b);
	const diff = max - Math.min(r, g, b);
	let h = 0;
	if (diff !== 0) switch (max) {
		case r:
			h = (g - b) / diff % 6;
			break;
		case g:
			h = (b - r) / diff + 2;
			break;
		case b:
			h = (r - g) / diff + 4;
			break;
	}
	h = Math.round(h * 60);
	if (h < 0) h += 360;
	const s = max === 0 ? 0 : diff / max;
	const v = max;
	return {
		h,
		s: Math.round(s * 100),
		v: Math.round(v * 100),
		a: color.a
	};
}
function hsvToRgb(hsv) {
	const h = hsv.h / 360;
	const s = hsv.s / 100;
	const v = hsv.v / 100;
	const i = Math.floor(h * 6);
	const f = h * 6 - i;
	const p = v * (1 - s);
	const q = v * (1 - f * s);
	const t = v * (1 - (1 - f) * s);
	let r;
	let g;
	let b;
	switch (i % 6) {
		case 0:
			r = v;
			g = t;
			b = p;
			break;
		case 1:
			r = q;
			g = v;
			b = p;
			break;
		case 2:
			r = p;
			g = v;
			b = t;
			break;
		case 3:
			r = p;
			g = q;
			b = v;
			break;
		case 4:
			r = t;
			g = p;
			b = v;
			break;
		case 5:
			r = v;
			g = p;
			b = q;
			break;
		default:
			r = 0;
			g = 0;
			b = 0;
	}
	return {
		r: Math.round(r * 255),
		g: Math.round(g * 255),
		b: Math.round(b * 255),
		a: hsv.a
	};
}
function parseRgbString(value) {
	const trimmed = value.trim();
	const rgbMatch = trimmed.match(/^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*([\d.]+))?\s*\)$/);
	if (rgbMatch) return {
		r: Number.parseInt(rgbMatch[1] ?? "0", 10),
		g: Number.parseInt(rgbMatch[2] ?? "0", 10),
		b: Number.parseInt(rgbMatch[3] ?? "0", 10),
		a: rgbMatch[4] ? Number.parseFloat(rgbMatch[4]) : 1
	};
	if (trimmed.startsWith("#")) {
		const hexMatch = trimmed.match(/^#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})$/i);
		if (hexMatch) return {
			r: Number.parseInt(hexMatch[1] ?? "0", 16),
			g: Number.parseInt(hexMatch[2] ?? "0", 16),
			b: Number.parseInt(hexMatch[3] ?? "0", 16),
			a: 1
		};
		const hexMatch3 = trimmed.match(/^#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])$/i);
		if (hexMatch3) return {
			r: Number.parseInt((hexMatch3[1] ?? "0") + (hexMatch3[1] ?? "0"), 16),
			g: Number.parseInt((hexMatch3[2] ?? "0") + (hexMatch3[2] ?? "0"), 16),
			b: Number.parseInt((hexMatch3[3] ?? "0") + (hexMatch3[3] ?? "0"), 16),
			a: 1
		};
	}
	return null;
}
function rgbToString(color) {
	return color.a < 1 ? `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})` : `rgb(${color.r}, ${color.g}, ${color.b})`;
}
function hexToRgb(hex, alpha = 1) {
	const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	return result ? {
		r: Number.parseInt(result[1] ?? "0", 16),
		g: Number.parseInt(result[2] ?? "0", 16),
		b: Number.parseInt(result[3] ?? "0", 16),
		a: alpha
	} : {
		r: 0,
		g: 0,
		b: 0,
		a: alpha
	};
}
export { rgbToString as a, rgbToHsv as i, hsvToRgb as n, parseRgbString as r, hexToRgb as t };
