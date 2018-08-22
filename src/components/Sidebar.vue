<template lang="pug">
	transition(name="slide-fade" mode="out-in")
		v-layout(class='sidebar-container pa-4' color='white')
			v-flex
				div(:is="currentPanel" v-bind="props" :key="id")


</template>

<script>
import EventBus, {events} from '@/EventBus';
import Ads from '@/components/Ads';
import Information from '@/components/Information';

export default {
	name: 'Sidebar',

	components: {
		Ads,
		Information
	},
	data () {
		return {
			currentPanel: null,
			props: null,
			img: null,
			panels: {
				INFORMATION: 'information',
				ADS: 'ads',
				NADIR: 'NADIR'
			},
			counter: 0
		}
	},

	computed: {
		id() {
			return this.img && this.img.id;
		}
	},

	mounted() {
		EventBus.$on(events.SELECT_IMG, this.onSelectImg);
		EventBus.$on(events.SELECT_PANEL, this.onSelectPanel);
		this.setPanel('ADS');
	},

	methods: {
		onSelectImg(img) {
			this.img = img;
			
			if(this.isPanel('ADS')) {
				this.setPanel('INFORMATION');
			}
		},

		onSelectPanel(panelID) {
			this.setPanel(panelID);
		},

		setPanel(id) {
			const props = {};

			if(id === 'INFORMATION') {
				props.file = this.img.file;
			}

			this.props = props;
			this.currentPanel = this.panels[id];
		},

		isPanel(id) {
			return this.currentPanel === this.panels[id];
		}
	}

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.sidebar-container{
	min-height: Calc(70vh - 48px);
	background-color: white;
}
.slide-fade-enter-active {
	transition: all .3s ease;
}
.slide-fade-leave-active {
	transition: all .5s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to{
	transform: translateX(10px);
	opacity: 0;
}
</style>
