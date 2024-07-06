import { useItemStore } from '@/stores/item.js';
import { useCategoryStore } from '@/stores/category.js';
import { useModifierStore } from '@/stores/modifier.js';

const API_PREFIX = '/api';

export const ItemService = {
	async getItems() {
		const response = await fetch(`${API_PREFIX}/menu/list`, {
			method: 'POST',
		});
		const { categories, items, modifiers } = await response.json();
		
		const categoryStore = useCategoryStore();
		const itemStore = useItemStore();
		const modifierStore = useModifierStore();
		
		categoryStore.setCategories(categories);
		itemStore.setItems(items);
		modifierStore.setItems(modifiers);
		
		return true;
	},
};