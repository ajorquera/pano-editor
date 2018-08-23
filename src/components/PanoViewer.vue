<template>
	<div ref='viewer'>
	</div>
</template>

<script>
import "pannellum/build/pannellum";
import EventBus, {events} from '@/EventBus';

const pannellum = window.pannellum;

export default {
	name: 'PanoViewer',

	data() {
		return {
			viewer: null,
			objectUrl: null,
			img: null
		}
	},
	
	mounted () {
		EventBus.$on(events.SELECT_IMG, this.onSelect);
	},

	methods: {
		onSelect(img) {
			if(img !== this.img) {
				this.img = img;
				this.loadImg();
			}
		},

		loadImg() {
			if(this.viewer) {
				this.destroy();
			}

			this.objectUrl = URL.createObjectURL(this.img.file);
			this.viewer = pannellum.viewer(this.$refs.viewer, {
				type: "equirectangular",
				autoLoad: true,
				panorama: this.objectUrl
			});
		},

		destroy() {
			URL.revokeObjectURL(this.objectUrl);
			this.viewer.destroy();
		}
	}
}
</script>

<style scoped>
#panorama {
	height: Calc(60vh - 48px);
}
</style>
