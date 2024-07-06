import { defineStore } from 'pinia';

export const useModifierStore = defineStore('modifier', {
	state: () => {
		return {
			collection: {}
		};
	},
	getters: {
		modifiersByType: (state) => {
			return (modifierIds, type) => {
				return modifierIds.map((modifierId) => {
					return state.collection[modifierId];
				}).filter((modifier) => {
					return modifier.type === type;
				});
			};
		},
		modifierNameById: (state) => {
			return (modifierId) => {
				return state.collection[modifierId]?.title ?? '';
			};
		}
	},
	actions: {
		setItems(modifiers)
		{
			this.collection = { ...modifiers };
		},
	}
})
