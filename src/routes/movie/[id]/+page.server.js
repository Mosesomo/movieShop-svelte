const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export async function load({ params }) {
    const apiKey = API_KEY;
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/movie/${params.id}?api_key=${apiKey}&language=en-US`
        );
        
        if (!response.ok) {
            throw error(404, 'Movie not found');
        }
        
        const movie = await response.json();
        return {
            movie
        };
    } catch (error) {
        console.error('Error fetching movie:', error);
        throw error(404, 'Movie not found');
    }
}
