import * as d3Geo from "d3-geo";

const capitalize = (str) => {
	return str.charAt(0).toUpperCase() + str.slice(1);
}

export const changeImgProjection = ({context, image, projection, width, height}) => {

	const projectionFn = d3Geo[`geo${capitalize(projection)}`]()
		.rotate([0, 90]);

	var dx = image.width;
	var	dy = image.height;
		
	context.drawImage(image, 0, 0, dx, dy);
	const imgData = context.getImageData(0, 0, dx, dy);
	var sourceData = imgData.data,
		target = context.createImageData(width, height),
		targetData = target.data;

	for (var y = 0, i = -1; y < height; ++y) {
		for (var x = 0; x < width; ++x) {
			var p = projectionFn.invert([x, y]), λ = p[0], φ = p[1];
			if (λ > 180 || λ < -180 || φ > 90 || φ < -90) { i += 4; continue; }
			var q = ((90 - φ) / 180 * dy | 0) * dx + ((180 + λ) / 360 * dx | 0) << 2;
			targetData[++i] = sourceData[q];
			targetData[++i] = sourceData[++q];
			targetData[++i] = sourceData[++q];
			targetData[++i] = 255;
		}
	}

	context.clearRect(0, 0, width, height);
	context.putImageData(target, 0, 0);
}
export default {
	changeImgProjection
}
