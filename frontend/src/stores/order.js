import { defineStore } from 'pinia'

export const useOrderStore = defineStore('order', {
	state: () => {
		return {
			orderItems: [],
		};
	},
	getters: {
		getById: (state) => {
			return (categoryId) => state.collection[categoryId];
		}
	},
	actions: {
		addItem(orderItem)
		{
			this.orderItems.push(orderItem);
		},
		clearOrder()
		{
			this.orderItems = [];
		},
	}
})
