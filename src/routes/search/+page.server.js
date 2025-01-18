import { error } from '@sveltejs/kit';
import FlexSearch from 'flexsearch';

const index = new FlexSearch.Document({
    document: {
        id: "id",
        index: ["title", "overview"],
        store: ["title", "overview", "poster_path", "release_date", "vote_average"]
    }
});

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export const load = async ({ url }) => {
    const query = url.searchParams.get('q');
    const apiKey = API_KEY;
    if (!query) {
        return {
            searchResults: [],
            searchQuery: ''
        };
    }

    try {
        const params = new URLSearchParams({
            api_key: apiKey,
            query: query,
            include_adult: 'false',
            language: 'en-US',
            page: '1'
        });

        const response = await fetch(
            `https://api.themoviedb.org/3/search/movie?${params}`,
            {
                method: 'GET',
                headers: {
                    'Accept': 'application/json'
                }
            }
        );

        if (!response.ok) {
            throw error(response.status, 'Failed to fetch search results');
        }

        const data = await response.json();

        // Index the results with FlexSearch
        data.results.forEach((movie) => {
            index.add({
                id: movie.id,
                title: movie.title,
                overview: movie.overview,
                poster_path: movie.poster_path,
                release_date: movie.release_date,
                vote_average: movie.vote_average
            });
        });

        // Perform local search using FlexSearch
        const searchResults = await index.search(query, {
            limit: 1, // Get only one result
            enrich: true
        });

        const movie = searchResults[0]?.result[0] || null;

        return {
            searchResults: movie ? [movie] : [],
            searchQuery: query
        };

    } catch (e) {
        console.error('Search error:', e);
        throw error(500, {
            message: 'Failed to search movies'
        });
    }
};
