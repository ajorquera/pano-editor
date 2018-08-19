import Vue from 'vue'
import {
	Vuetify,
	VAvatar,
	VApp,
	VNavigationDrawer,
	VFooter,
	VList,
	VBtn,
	VIcon,
	VGrid,
	VToolbar,
	VTooltip,
	VCard,
	VForm,
	VDialog,
	VTextField,
	transitions
} from 'vuetify'
import 'vuetify/src/stylus/app.styl'

Vue.use(Vuetify, {
	components: {
		VApp,
		VAvatar,
		VTooltip,
		VNavigationDrawer,
		VFooter,
		VDialog,
		VList,
		VBtn,
		VIcon,
		VForm,
		VGrid,
		VTextField,
		VToolbar,
		VCard,
		transitions
	},
})
