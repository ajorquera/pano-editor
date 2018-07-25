<template>
	<v-layout row wrap class='tours' v-bind:class='{extend : extend}'>
		<!-- <v-btn v-if='items && items.length > 0' class='extend_button' icon small dark color='primary' @click='extend =! extend' >
			<v-icon v-if='extend'>keyboard_arrow_down</v-icon>
			<v-icon v-else>keyboard_arrow_up</v-icon>
		</v-btn> -->
		<i v-if='!extend' class="fas fa-arrow-alt-circle-up extend_button"  @click='extend =! extend'></i>
		<i v-if='extend' class="fas fa-arrow-alt-circle-down extend_button"  @click='extend =! extend'></i>
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
			<v-layout row class='tours__non_extend_view'>
				<v-flex xs1 class='d-flex align_items_center'>
					<i @click='moveLeft' class="left_button btn far fa-arrow-alt-circle-left"></i>
				</v-flex>
				<v-flex  v-if='items && items.length'  xs10 class='d-flex tours__non_extend_view__display'>
					<div ref='slider' class='d-flex tours__non_extend_view__display__slider'>
						<single-tour-component
							v-for='(item,index) in items'
							:key='index'
							:tour='item'
							class='px-1'
						/>
					</div>
				</v-flex>
				<v-flex v-else class='mt-3'>
					<file-drop :extend='false'  @uploadedFiles='addFilesToTours'></file-drop>
				</v-flex>
				<v-flex xs1 class='d-flex align_items_center'>
					<i @click='moveRight' class="right_button btn far fa-arrow-alt-circle-right"></i>
				</v-flex>
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
		font-size: 2rem;
		line-height: 5px;
		cursor: pointer;
	}
	.left_button{
		position: absolute;
		z-index: 3;
		left: 3%;
		font-size: 2rem;
		cursor: pointer;
	}
	.right_button{
		position: absolute;
		z-index: 3;
		right: 3%;
		font-size: 2rem;
		cursor: pointer;
	}
	.tours__non_extend_container{
		height: 28vh;
		box-shadow: 0 -5px 4px -5px rgba(0,0,0,0.2);
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
