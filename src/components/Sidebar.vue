<template>
	<v-flex class='sidebar-container pa-4' color='white'>
		<transition name="slide-fade" mode="out-in">
			<v-flex v-if='currentitem' :key='currentitem.name'>
				<v-flex  class='d-flex justify-content-between'>
					<h4 class='headline'>{{currentitem.name}}</h4>
					<v-flex class='text-sm-right'>
						<v-tooltip top>
							<v-icon
								color="primary"
								dark
								slot="activator"
							>info
							</v-icon>
							<span>{{currentitem.name}}</span>
						</v-tooltip>
					</v-flex>
				</v-flex>
			</v-flex>
		</transition>
		<v-flex v-if='!currentitem'>
			Show Advertisements
		</v-flex>
	</v-flex>
</template>

<script>

export default {
	props: ['currentitem'],
	name: 'Sidebar',
	data () {
		return {
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
