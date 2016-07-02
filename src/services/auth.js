export const getToken = function() {
	try {
		return localStorage.getItem('accessToken') || null;
	} catch(e) {
		return null;
	}
};

export const setToken = function(token) {
	try {
		localStorage.setItem('accessToken', token) || null;
	} catch(e) {
		return null;
	}
};