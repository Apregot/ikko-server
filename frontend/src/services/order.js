const API_PREFIX = '/api';

export const OrderService = {
	createOrder(orderItems) {
		void fetch(`${API_PREFIX}/order/order`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify({
				order: orderItems,
			}),
		});
	},
};