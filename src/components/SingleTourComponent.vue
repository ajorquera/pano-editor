<template>
	<v-card class='single-tour-container'>
		<v-card-media
			src="https://cdn.vuetifyjs.com/images/cards/desert.jpg"
			height="10vh"
		></v-card-media>

		<v-card-title primary-title>
			<div>
				<v-text-field class="subheading mb-0"
					v-model='name'
					label= 'Tour Name'
				></v-text-field>
			</div>
		</v-card-title>
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
		max-width: 10vw;
	}
</style>
