import { defineStore } from 'pinia'

export const useCategoryStore = defineStore('category', {
	state: () => {
		return {
			collection: {
				1: {
					title: 'Кофе, чай, какао',
				},
				2: {
					title: 'Кофе, чай, какао, альтернатива'
				},
				3: {
					title: 'Холодные напитки'
				},
				4: {
					title: 'Десерты',
				},
			}
		};
	},
	getters: {
		getById: (state) => {
			return (categoryId) => state.collection[categoryId];
		}
	},
})
