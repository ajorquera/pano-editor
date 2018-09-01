<template lang="pug">
	div(class="viewer")
		div(ref='domViewerContainer')
		canvas(class="canvas" ref="domCanvas" v-show="isGnomonicImageViewer")

</template>

<script>
import "pannellum/build/pannellum";

import EventBus, {events} from '@/EventBus';
import utils from '@/utils'
import {fabric} from 'fabric';

const pannellum = window.pannellum;

export default {
	name: 'PanoViewer',

	data() {
		return {
			panoViewer: null,
			objectUrl: null,
			img: null,
			fabricCanvas: null,
			currentViewer: null
		}
	},

	computed: {
		domViewerContainer() {
			return this.$refs.domViewerContainer;
		},

		domCanvas() {
			return this.$refs.domCanvas;
		},

		isGnomonicImageViewer() {
			return this.currentViewer === 'gnomonicViewer';
		}
	},
	
	mounted () {
		EventBus.$on(events.SELECT_IMG, this.onSelectImg);
		EventBus.$on(events.SET_GNOMONIC_PROJECTION, this.onGnomonicProjection);
	},

	methods: {
		onSelectImg(img) {
			if(img !== this.img) {
				this.img = img;
				this.loadPanoViewer();
			}
		},

		loadPanoViewer() {
			this.destroy();

			this.setObjectUrl();
			this.panoViewer = pannellum.viewer(this.domViewerContainer, {
				type: "equirectangular",
				autoLoad: true,
				panorama: this.objectUrl
			});

			this.currentViewer = 'panoViewer';
		},

		onGnomonicProjection(isGnomonic) {
			if(isGnomonic) {
				this.loadGnomonicImageViewer();
			} else {
				this.loadPanoViewer();
			}
		},

		loadGnomonicImageViewer() {
			this.destroy();

			const width = 800;
			const height = 800;

			if(!this.fabricCanvas) {
				this.fabricCanvas = new fabric.Canvas(this.domCanvas, {
					width,
					height
				});
			} 
			const fabricCanvas = this.fabricCanvas;
			this.fabricCanvas.clear();
			this.setObjectUrl();

			fabric.Image.fromURL(this.objectUrl, (img) => {
				img.set({
					width,
					height
				});
				//this.fabricCanvas.setBackgroundImage(img);

				const ctx = this.fabricCanvas.getContext('2d');
				const imgData = ctx.getImageData(0, 0, width, height);

				const newImgData = utils.changeImgProjection(imgData, 'gnomonic');
				this.fabricCanvas.clear();

				const canvas = document.createElement('canvas');

				canvas.width = width;
				canvas.height = height;

				canvas.getContext('2d').putImageData(newImgData, 0, 0);

				fabric.Image.fromURL(canvas.toDataURL(), function(img) {
					img.left = width;
					img.top = height;
					img.bringToFront();
					fabricCanvas.add(img);
					fabricCanvas.renderAll();
				});



			});

			this.currentViewer = 'gnomonicViewer';

			//utils.changeImgProjection();
		},

		setObjectUrl() {
			if(this.objectUrl) {
				URL.revokeObjectURL(this.objectUrl);
			}

			this.objectUrl = URL.createObjectURL(this.img.file);
		},

		destroy() {
			this.destroyPanoViewer();
		},

		destroyPanoViewer() {
			if(this.panoViewer) {
				this.panoViewer.destroy();
				this.panoViewer = null;
			}
		}
	}
}
</script>

<style lang="scss" scoped>
.viewer {
	height: calc(60vh - 48px);
	
	.canvas {
		width: 100%;
		height:100%;
	}
}
</style>
