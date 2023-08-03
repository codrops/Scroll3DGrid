// Preload images
const preloadImages = (selector = 'img') => {
    return new Promise((resolve) => {
        imagesLoaded(document.querySelectorAll(selector), {background: true}, resolve);
    });
};


// Helper function that lets you dynamically figure out a grid's rows/columns as well as further refine those with "odd" or "even" ones
// https://greensock.com/forums/topic/34808-how-can-i-animate-the-odd-and-even-columns-rows-of-a-grid-with-gsapto/?do=findComment&comment=174346
const getGrid = selector => {
	let elements = gsap.utils.toArray(selector),
		bounds,
		getSubset = (axis, dimension, alternating, merge) => {
		  	let a = [], 
			  	subsets = {},
			  	onlyEven = alternating === "even",
			  	p;
			bounds.forEach((b, i) => {
				let position = Math.round(b[axis] + b[dimension] / 2),
					subset = subsets[position];
				subset || (subsets[position] = subset = []);
				subset.push(elements[i]);
			});
			for (p in subsets) {
				a.push(subsets[p]);
			}
			if (onlyEven || alternating === "odd") {
				a = a.filter((el, i) => !(i % 2) === onlyEven);
			}
		  	if (merge) {
				let a2 = [];
				a.forEach(subset => a2.push(...subset));
				return a2;
		  	}
		  	return a;
		};
	elements.refresh = () => bounds = elements.map(el => el.getBoundingClientRect());
	elements.columns = (alternating, merge) => getSubset("left", "width", alternating, merge);
	elements.rows = (alternating, merge) => getSubset("top", "height", alternating, merge);
	elements.refresh();

	return elements;
}

export {
    preloadImages,
    getGrid,
};