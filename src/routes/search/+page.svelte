<script>
    /** @type {import('./$types').PageData} */
    export let data;
    $: ({ searchResults, searchQuery } = data);
    // console.log(data);

    const getPosterUrl = (path) => {
        return path ? `https://image.tmdb.org/t/p/w500${path}` : null;
    };
</script>

<div class="search-results">
    <h1>Search Result for "{searchQuery}"</h1>

    {#if searchResults && searchResults.length > 0}
        <div class="movie-card">
            {#if searchResults[0].doc.poster_path}
                <img 
                    src={getPosterUrl(searchResults[0].doc.poster_path)} 
                    alt={searchResults[0].doc.title}
                    class="poster"
                />
            {/if}
            <div class="movie-details">
                <h2>{searchResults[0].doc.title}</h2>
                <p class="release-date">Release Date: {searchResults[0].doc.release_date}</p>
                <p class="overview">{searchResults[0].doc.overview}</p>
                <p class="rating">Rating: {searchResults[0].doc.vote_average}</p>
            </div>
        </div>
    {:else}
        <p>No movie found for "{searchQuery}"</p>
    {/if}
</div>

<style>
    .search-results {
        padding: 2rem;
        max-width: 1200px;
        margin: 0 auto;
    }

    .movie-card {
        display: flex;
        gap: 2rem;
        background: white;
        padding: 2rem;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .movie-card img {
        object-fit: cover;
        height: 360px;
    }

    .poster {
        max-width: 300px;
        border-radius: 4px;
    }

    .movie-details {
        flex: 1;
    }

    h2 {
        margin: 0 0 1rem 0;
        font-size: 1.8rem;
        color: #1a1a1a;
    }

    .release-date {
        color: #666;
        margin-bottom: 1rem;
    }

    .overview {
        line-height: 1.6;
        margin-bottom: 1rem;
    }

    .rating {
        font-weight: bold;
        color: #2563eb;
        font-size: 1.1rem;
    }

    @media (max-width: 968px) {
        .movie-card {
            flex-direction: column;
            padding: 1rem;
        }
        .search-results {
            width: 100%;
            padding: 7px;
        }
        .search-results h1 {
            font-size: 1rem;
            font-weight: 700;
        }
        .poster {
            max-width: 100%;
        }
    }
</style>
