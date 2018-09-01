import Vue from 'vue'

export const events = {
	SELECT_IMG              : 'SELECT',
	SELECT_PANEL            : 'SELECT_PANEL',
	SET_GNOMONIC_PROJECTION : 'SET_GNOMONIC_PROJECTION'
}


const EventBus = new Vue();

const log = (ID) => {
	EventBus.$logger.trace('EVENT', ID);
}

Object.values(events).forEach(eventId => {
	EventBus.$on(eventId, log.bind(null, eventId));
});

export default EventBus;


