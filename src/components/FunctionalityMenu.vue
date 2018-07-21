<template>
	<v-layout xs12 md12 class='row d-flex text-sm-right fmenu'>
		<v-flex>
			<v-spacer></v-spacer>
			<v-tooltip top  v-for='btn in icon_list' :key='btn.icon'>
				<v-btn v-on:click='setCurrentMenu(btn)' icon slot="activator">
					<v-icon
						medium
						color="primary"
						dark
					>{{btn.icon}}</v-icon>
				</v-btn>
				<span>{{btn.name}}</span>
			</v-tooltip>
		</v-flex>
	</v-layout>
</template>

<script>
export default {
	name: 'HelloWorld',
	data() {
		return{
			icon_list: [
				{icon: 'perm_device_information', name: 'Information'},
				{icon: 'control_point', name: 'Control Point'},
				{icon: 'zoom_in', name: 'Zoom In' },
				{icon: 'camera', name: 'Camera'},
				{icon: 'place', name: 'Place'},
				{icon: 'settings', name: 'Settings'},
				{icon: 'adjust', name: 'adjust'},
			]
		}
	},
	methods: {
		setCurrentMenu(option){
			this.$emit('setCurrentMenu', option)
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
