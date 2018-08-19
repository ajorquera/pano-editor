<template>
	<v-app>
		<v-toolbar
			dense
			app
			color='primary'
			dark
			class='pl-0'
			fixed
			:clipped-left="clipped"
		>
			<!-- <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon> -->
			<v-toolbar-title v-text="title"></v-toolbar-title>
			<v-spacer></v-spacer>
			<v-btn icon >
				<v-icon medium>cloud_download</v-icon>
			</v-btn>
			<v-btn icon >
				<v-icon medium>cloud_upload</v-icon>
			</v-btn>
		</v-toolbar>
		<v-content>
			<v-layout row class='upper_portion'>
				<v-flex xs3 md3>
					<sidebar :currentitem='fselectedmenu' />
				</v-flex>
				<v-flex xs9 md9 class='pa-2'>
					<functionality-menu v-on:setCurrentMenu='itemSelected($event)' />
					<pano-viewer />
				</v-flex>
			</v-layout>
			<v-layout row class='lower_portion'>
				<v-flex>
					<tours-component />
				</v-flex>
			</v-layout>
		</v-content>
		<!-- <v-footer :fixed="fixed" app>
			<span>&copy; 2017</span>
		</v-footer> -->
	</v-app>
</template>

<script>
import FunctionalityMenu from './components/FunctionalityMenu'
import PanoViewer from './components/PanoViewer'
import Sidebar from './components/Sidebar'
import ToursComponent from './components/ToursComponent'

export default {
	name: 'App',
	components: {
		FunctionalityMenu,
		Sidebar,
		PanoViewer,
		ToursComponent
	},
	data () {
		return {
			fselectedmenu: null,
			clipped: false,
			drawer: true,
			fixed: false,
			items: [{
				icon: 'bubble_chart',
				title: 'Inspire'
			}],
			miniVariant: false,
			right: true,
			rightDrawer: false,
			title: 'Pano Editor'
		}
	},
	methods: {
		itemSelected (option) {
			this.fselectedmenu = option
		}
	}
}
</script>

<style>
	.upper_portion{
		height: Calc(70vh - 48px);
	}
	.lower_portion{
		height: 30vh;
		position: relative;
	}
	.justify-content-center{
		justify-content: center;
	}
</style>
