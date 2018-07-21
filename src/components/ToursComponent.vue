<template>
	<v-layout row wrap class='tours' v-bind:class='{extend : extend}'>
		<v-btn v-if='items && items.length > 0' class='extend_button' icon small dark color='primary' @click='extend =! extend' >
			<v-icon v-if='extend'>keyboard_arrow_down</v-icon>
			<v-icon v-else>keyboard_arrow_up</v-icon>
		</v-btn>
		<v-flex xs12 v-if='extend' class='pt-5 tours__extended_container'>
			<v-layout class='tours__extended_view' row wrap>
				<single-tour-component
					v-for='(item,index) in items'
					:key='index'
					:tour='item'
					class='ma-2'
				/>
			</v-layout>
			<v-btn fab @click='dialog = true' v-if='extend' class='primary tours__extended_container__addtour' icon><v-icon>add</v-icon></v-btn>
			<v-dialog content-class='addtour' v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
				<v-btn absolute fab icon dark @click.native="dialog = false">
					<v-icon>close</v-icon>
				</v-btn>
				<file-drop :extend='true' @uploadedFiles='addFilesToTours' />
			</v-dialog>
		</v-flex>
		<v-flex xs12 v-else class='pt-2 tours__non_extend_container'>
			<v-layout v-if='items && items.length' row class='tours__non_extend_view'>
				<v-flex xs1 class='d-flex align_items_center'>
					<v-btn  @click='moveLeft'  class='left_button' icon small dark color='primary' >
						<v-icon>keyboard_arrow_left</v-icon>
					</v-btn>
				</v-flex>
				<v-flex xs10 class='d-flex tours__non_extend_view__display'>
					<div ref='slider' class='d-flex tours__non_extend_view__display__slider'>
						<single-tour-component
							v-for='(item,index) in items'
							:key='index'
							:tour='item'
							class='px-1'
						/>
					</div>
				</v-flex>
				<v-flex xs1 class='d-flex align_items_center'>
					<v-btn @click='moveRight' class='right_button' icon small dark color='primary' >
						<v-icon>keyboard_arrow_right</v-icon>
					</v-btn>
				</v-flex>
			</v-layout>
			<v-layout v-if='!items || items.length == 0'>
				<file-drop :extend='false'  @uploadedFiles='addFilesToTours'></file-drop>
			</v-layout>
		</v-flex>
	</v-layout>
</template>

<script>
import SingleTourComponent from '@/components/SingleTourComponent'
import FileDrop from '@/components/FileDrop'
export default {
	name: 'ToursComponent',
	components: {
		SingleTourComponent,
		FileDrop
	},
	mounted () {

	},
	watch: {
	},
	data () {
		return {
			dialog: false,
			extend: false,
			items: [],
			// items: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
			moves: 0,
			hide_left: true,
			hide_right: false,
		}
	},
	methods: {
		addFilesToTours (e) {
			this.dialog = false
			this.items = this.items.concat(e)
		},
		moveLeft () {
			if(this.items.length < 8){
				return
			}

			this.moves --
			let total = this.items.length
			let distance = this.moves * 10
			this.$refs.slider.style.transform = 'translateX('+ distance +'vw)'
			if(this.moves + total <= 8){
				this.hide_left = false
			}
			if(this.moves < 0){
				this.hide_right = true
			}
		},
		moveRight () {
			if(this.items.length < 8){
				return
			}
			this.moves ++
			let total = this.items.length
			let distance = this.moves * 10
			this.$refs.slider.style.transform = 'translateX('+ distance +'vw)'
			if(this.moves >= 0){
				this.hide_right = false
			}
			if(this.moves + total >= 8){
				this.hide_left = true
			}
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.addtour {
	}
	.tours{
		height: 30vh;
		transition-property: all;
		transition-duration: 1s;
		transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
	}
	.extend{
		min-height: 80vh;
		position: absolute;
		transform: translate(0vh,-55vh);
		width: 100%;
		z-index: 2;
		background-color: white;
	}
	.extend_button{
		position: absolute;
		z-index: 3;
		left: 50%;
	}
	.left_button{
		position: absolute;
		z-index: 3;
		left: 3%;
	}
	.right_button{
		position: absolute;
		z-index: 3;
		right: 3%;
	}
	.tours__non_extend_container{
		height: 28vh;
	}

	.tours__extended_container {
		min-height: fit-content;
		position: relative;
	}
	.tours__non_extend_view__display {
		overflow: hidden;
	}
	.tours__non_extend_view__display__slider {
		transition-property: all;
		transition-duration: 1s;
		transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
	}
	.tours__extended_container__addtour{
		position: absolute;
		right: 1vw;
		bottom: 0vh;
	}
	.align_items_center {
		align-items: center;
	}

</style>
