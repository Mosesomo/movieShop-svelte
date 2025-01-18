const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export async function load() {
    const apiKey = API_KEY;
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`
        );
    
        
        if (!response.ok) {
            throw new Error('Failed to fetch movies');
        }
        
        const data = await response.json();
        // console.log(data)
        return {
            popular: data.results
        };

        
    } catch (error) {
        console.error('Error fetching movies:', error);
        return {
            popular: []
        };
    }
}