<template lang="pug">
	div(class="text-xs-right")
		v-tooltip(top v-for='btn in funcList' :key='btn.icon')
			v-btn(@click='setCurrentPanel(btn)' icon slot="activator" :disabled="isDisabled")
				v-icon(medium color="primary" dark) {{btn.icon}}
			span {{btn.name}}

</template>

<script>
import EventBus, {events} from '@/EventBus';

export default {
	name: 'HelloWorld',
	data() {
		return {
			funcList: [
				{icon: 'perm_device_information', name: 'Information', eventId: 'INFORMATION'},
				{icon: 'adjust',                  name: 'Nadir',       eventId: 'NADIR'},
				{icon: 'control_point',           name: 'Control Point'},
				{icon: 'zoom_in',                 name: 'Zoom In' },
				{icon: 'camera',                  name: 'Camera'},
				{icon: 'place',                   name: 'Place'},
				{icon: 'settings',                name: 'Settings'},
			],
			panoFile: null
		}
	},

	computed: {
		isDisabled() {
			return !this.panoFile;
		}
	},

	mounted() {
		EventBus.$on(events.SELECT_IMG, this.onSelectImg);
	},

	methods: {
		setCurrentPanel(option) {
			EventBus.$emit(events.SELECT_PANEL, option.eventId);
		},

		onSelectImg(panoFile) {
			this.panoFile = panoFile;
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.fmenu{
	max-height: 10vh;
}
</style>
