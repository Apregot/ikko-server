import { defineStore } from 'pinia'

export const useItemStore = defineStore('item', {
	state: () => {
		return {
			collection: {}
		};
	},
	getters: {
		getCollection(state) {
			return Object.values(state.collection);
		},
		itemById: (state) => {
			return (itemId) => state.collection[itemId];
		}
	},
	actions: {
		setItems(items)
		{
			this.collection = { ...items };
		},
	}
})
