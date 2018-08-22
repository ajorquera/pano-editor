import logger from '@/logger';
import Vue from 'vue';

const plugin = {
	install(Vue) {
		Vue.prototype.$logger = logger
	}
}

Vue.use(plugin);

export default plugin;
