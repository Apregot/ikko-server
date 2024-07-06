import { defineStore } from 'pinia'

export const useItemStore = defineStore('item', {
	state: () => {
		return {
			collection: {
				1: {
					title: 'Бамбл',
					available: true,
					categoryId: 3,
				},
				2: {
					title: 'Эспресс-тоник',
					available: false,
					categoryId: 3,
				},
				3: {
					title: 'Фильтр',
					available: false,
					categoryId: 1,
				},
			}
		};
	},
	getters: {
		getCollection(state) {
			return Object.values(state.collection);
		},
		getById: (state) => {
			return (categoryId) => state.collection[categoryId];
		}
	},
})
