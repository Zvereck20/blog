import { useEffect } from 'react';
import { useStore } from 'react-redux';

export const useResetForm = (reset) => {
	const store = useStore();
  
	useEffect(() => {
		let currenWasLogout = store.getState().app.wasLogout;

		return store.subscribe(() => {
			let previousWasLogout = currenWasLogout;
			currenWasLogout = store.getState().app.wasLogout;

			if (currenWasLogout !== previousWasLogout) {
				reset();
			}
		});
	}, [reset, store]);
};
