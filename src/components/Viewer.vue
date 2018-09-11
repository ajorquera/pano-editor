<template lang="pug">
	div(class="viewer")
		div(ref='domViewerContainer' :style="domViewerStyle" v-show="isPanoViewer")
		canvas(class="canvas" ref="domCanvas" v-show="isGnomonicImageViewer" :width="width" :height="height")

</template>

<script>
import "pannellum/build/pannellum";

import EventBus, {events} from '@/EventBus';
import utils from '@/utils'

const pannellum = window.pannellum;

export default {
	name: 'PanoViewer',

	data() {
		return {
			panoViewer: null,
			objectUrl: null,
			img: null,
			fabricCanvas: null,
			currentViewer: null,
			width: 1024,
			height: 500
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
		},

		isPanoViewer() {
			return this.currentViewer === 'panoViewer';
		},

		domViewerStyle() {
			return {
				width: this.width + 'px',
				height: this.height + 'px'
			}
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
			this.destroyPanoViewer();

			const ctx = this.domCanvas.getContext('2d');
			const img = new Image();

			img.onload = () => {	
				utils.changeImgProjection({
					image       : img, 
					context     : ctx, 
					projection  : 'gnomonic', 
					width       : this.width, 
					height      : this.height
				});
			}

			img.src = this.img.preview;

			this.currentViewer = 'gnomonicViewer';

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
	
}
</style>
