// Import the necessary function for preloading images
import { preloadImages, getGrid } from './utils.js';

// Define a variable that will store the Lenis smooth scrolling object
let lenis;

// Function to initialize Lenis for smooth scrolling
const initSmoothScrolling = () => {
	// Instantiate the Lenis object with specified properties
	lenis = new Lenis({
		lerp: 0.1, // Lower values create a smoother scroll effect
		smoothWheel: true // Enables smooth scrolling for mouse wheel events
	});

	// Update ScrollTrigger each time the user scrolls
	lenis.on('scroll', () => ScrollTrigger.update());

	// Define a function to run at each animation frame
	const scrollFn = (time) => {
		lenis.raf(time); // Run Lenis' requestAnimationFrame method
		requestAnimationFrame(scrollFn); // Recursively call scrollFn on each frame
	};
	// Start the animation frame loop
	requestAnimationFrame(scrollFn);
};

// All elements with class .grid
const grids = document.querySelectorAll('.grid');

// Function to apply scroll-triggered animations to a given gallery
const applyAnimation = (grid, animationType) => {
	// Child elements of grid
	const gridWrap = grid.querySelector('.grid-wrap');
	const gridItems = grid.querySelectorAll('.grid__item');
	const gridItemsInner = [...gridItems].map(item => item.querySelector('.grid__item-inner'));
	
	// Define GSAP timeline with ScrollTrigger
	const timeline = gsap.timeline({
	  	defaults: { ease: 'none' },
	  	scrollTrigger: {
			trigger: gridWrap,
			start: 'top bottom+=5%',
			end: 'bottom top-=5%',
			scrub: true
	  	}
	});
	
	// Apply different animations based on type
	switch(animationType) {
		
		case 'type1':

			// Set some CSS related style values
			grid.style.setProperty('--perspective', '1000px');
			grid.style.setProperty('--grid-inner-scale', '0.5');

			timeline
			.set(gridWrap, {
				rotationY: 25
			})
			.set(gridItems, {
				z: () => gsap.utils.random(-1600,200)
			})
			.fromTo(gridItems, {
				xPercent: () => gsap.utils.random(-1000,-500)
			}, {
				xPercent: () => gsap.utils.random(500,1000)
			}, 0)
			.fromTo(gridItemsInner, {
				scale: 2
			}, {
				scale: .5
			}, 0)
			
			break;

	  	case 'type2':
			
			// Set some CSS related style values
			grid.style.setProperty('--grid-width', '160%');
			grid.style.setProperty('--perspective', '2000px');
			grid.style.setProperty('--grid-inner-scale', '0.5');
			grid.style.setProperty('--grid-item-ratio', '0.8');
			grid.style.setProperty('--grid-columns', '6');
			grid.style.setProperty('--grid-gap', '14vw');

		  	timeline
		  	.set(gridWrap, {
				rotationX: 20
			})
			.set(gridItems, {
				z: () => gsap.utils.random(-3000,-1000)
			})
			.fromTo(gridItems, {
				yPercent: () => gsap.utils.random(100,1000),
				rotationY: -45,
				filter: 'brightness(200%)'
			}, {
				ease: 'power2',
				yPercent: () => gsap.utils.random(-1000,-100),
				rotationY: 45,
				filter: 'brightness(0%)'
			}, 0)
			.fromTo(gridWrap, {
				rotationZ: -5,
			}, {
				rotationX: -20,
				rotationZ: 10,
				scale: 1.2
			}, 0)
			.fromTo(gridItemsInner, {
				scale: 2
			}, {
				scale: 0.5
			}, 0)

			break;
	  
		case 'type3':
			
			// Set some CSS related style values
			grid.style.setProperty('--grid-width', '105%');
			grid.style.setProperty('--grid-columns', '8');
			grid.style.setProperty('--perspective', '1500px');
			grid.style.setProperty('--grid-inner-scale', '0.5');
			
			timeline
			.set(gridItems, {
				transformOrigin: '50% 0%',
				z: () => gsap.utils.random(-5000,-2000),
				rotationX: () => gsap.utils.random(-65,-25),
				filter: 'brightness(0%)'
			})	
			.to(gridItems, {
				xPercent: () => gsap.utils.random(-150,150),
				yPercent: () => gsap.utils.random(-300,300),
				rotationX: 0,
				filter: 'brightness(200%)'
			}, 0)
			.to(gridWrap, {
				z: 6500
			}, 0)
			.fromTo(gridItemsInner, {
				scale: 2
			}, {
				scale: 0.5
			}, 0);
			
			break;

		case 'type4':
			
			// Set some CSS related style values
			grid.style.setProperty('--grid-width', '50%');
			grid.style.setProperty('--perspective', '3000px');
			grid.style.setProperty('--grid-item-ratio', '0.8');
			grid.style.setProperty('--grid-columns', '3');
			grid.style.setProperty('--grid-gap', '1vw');

			timeline
			.set(gridWrap, {
				transformOrigin: '0% 50%',
				rotationY: 30,
				xPercent: -75
			})
			.set(gridItems, {
				transformOrigin: '50% 0%'
			})
			.to(gridItems, {
				duration: 0.5,
				ease: 'power2',
				z: 500,
				stagger: 0.04
			}, 0)
			.to(gridItems, {
				duration: 0.5,
				ease: 'power2.in',
				z: 0,
				stagger: 0.04
			}, 0.5)
			.fromTo(gridItems, {
				rotationX: -70,
				filter: 'brightness(120%)'
			}, {
				duration: 1,
				rotationX: 70,
				filter: 'brightness(0%)',
				stagger: 0.04
			}, 0)
			
			break;

		case 'type5':

			// Set some CSS related style values
			grid.style.setProperty('--grid-width', '120%');
			grid.style.setProperty('--grid-columns', '8');
			grid.style.setProperty('--grid-gap', '0');
			
			const gridObj = getGrid(gridItems);

			timeline
			.set(gridWrap, {
				rotationX: 50
			})
			.to(gridWrap, {
				rotationX: 30
			})
			.fromTo(gridItems, {
				filter: 'brightness(0%)'
			}, {
				filter: 'brightness(100%)'
			}, 0)
			.to(gridObj.rows('even'), {
				xPercent: -100,
				ease: 'power1'
			}, 0)
			.to(gridObj.rows('odd'), {
				xPercent: 100,
				ease: 'power1'
			}, 0)
			.addLabel('rowsEnd', '>-=0.15')
			.to(gridItems, {
				ease: 'power1',
				yPercent: () => gsap.utils.random(-100, 200),
			}, 'rowsEnd');
			break;

		case 'type6':

			// Set some CSS related style values
			grid.style.setProperty('--perspective', '2500px');
			grid.style.setProperty('--grid-width', '100%');
			grid.style.setProperty('--grid-gap', '6');
			grid.style.setProperty('--grid-columns', '3');
			grid.style.setProperty('--grid-item-ratio', '1');
			
			timeline
			.fromTo(gridItems, {
				transformOrigin: '50% 200%',
				rotationX: 0,
				yPercent: 400,
			}, {
				yPercent: 0,
				rotationY: 360,
				opacity: 0.2,
				scale: 0.8,
				stagger: 0.03,
			})

			break;
	  	
		default:
			console.error('Unknown animation type.');
			break;
	}
}

// Apply animations to each grid
const scroll = () => {
	grids.forEach((grid, i) => {
		// Determine animation type
		let animationType;
		switch (i % 6) {
			case 0:
				animationType = 'type1';
				break;
			case 1:
				animationType = 'type2';
				break;
			case 2:
				animationType = 'type3';
				break;
			case 3:
				animationType = 'type4';
				break;
			case 4:
				animationType = 'type5';
				break;
			case 5:
				animationType = 'type6';
				break;
		}
		applyAnimation(grid, animationType);
	});
}

// Preload images, initialize smooth scrolling, apply scroll-triggered animations, and remove loading class from body
preloadImages('.grid__item-inner').then(() => {
	initSmoothScrolling();
	scroll();
	document.body.classList.remove('loading');
});