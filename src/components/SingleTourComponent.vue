<template>
	<v-card flat class='single-tour-container'>
		<!-- <v-card-media
			class='rounded_image'
			src="https://cdn.vuetifyjs.com/images/cards/desert.jpg"
			height="10vh"
		></v-card-media> -->
		<div class='rounded_image' v-bind:style="{ 'background-image': 'url(https://cdn.vuetifyjs.com/images/cards/desert.jpg)' }">
			<i class="far fa-times-circle remove_icon"></i>
		</div>
		<div>
			<v-text-field class="subheading mb-0"
				flat
				v-model='name'
			></v-text-field>
		</div>
	</v-card>
</template>

<script>
// import * as pannellum from 'pannellum'
export default {
	props: ['tour'],
	name: 'SingleTourComponent',
	mounted () {
		if(this.tour && this.tour.name){
			this.name = this.name_ext(this.tour.name)
		}
	},
	data () {
		return {
			no_tour: {
				name: 'New Tour'
			},
			name: ''
		}
	},
	methods: {
		name_ext: (value) => {
			if(value){
				let name_ext =  value.substring(0,value.lastIndexOf("."))
				return name_ext
			}
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.single-tour-container{
		width: 10vw;
	}
	.rounded_image{
		border-radius: 23vh !important;
		height: 19vh;
		background-position: center;
		text-align: right;
		background-color: #fafafa;
		font-size: 2rem;
	}
	.remove_icon{
		cursor: pointer;
	}
</style>
