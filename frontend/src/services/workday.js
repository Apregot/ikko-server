const API_PREFIX = '/api';

export const WorkdayService= {
	startDay() {
		void fetch(`${API_PREFIX}/shift/start`, {
			method: 'POST',
		});
	},
	
	finishDay() {
		void fetch(`${API_PREFIX}/shift/end`, {
			method: 'POST',
		});
	}
};