import React, { useState, useContext, useEffect } from 'react';
// make sure to use https
export const API_ENDPOINT = `https://www.omdbapi.com/?apikey=${
	import.meta.env.VITE_OMDB_API_KEY
}`;

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState({ show: false, msg: '' });
	const [movies, setMovies] = useState([]);
	const [query, setQuery] = useState('batman');

	const fetchMovies = async url => {
		setLoading(true);
		try {
			const response = await fetch(url);
			const data = await response.json();
			if (data.Response === 'True') {
				setMovies(data.Search);
				setError({ show: false, msg: '' });
			} else {
				setError({ show: true, msg: data.Error });
			}
			setLoading(false);
		} catch (err) {
			console.log(err.message);
		}
	};

	useEffect(() => {
		fetchMovies(`${API_ENDPOINT}&s=${query}`);
	}, [query]);

	return (
		<AppContext.Provider value={{ loading, error, setQuery, query, movies }}>
			{children}
		</AppContext.Provider>
	);
};
// make sure use
export const useGlobalContext = () => {
	return useContext(AppContext);
};

export { AppContext, AppProvider };
