<script>
    /** @type {import('./$types').PageData} */
    export let data;
    $: ({ popular } = data);

    // console.log(data)

    const getPosterUrl = (path) => {
        return `https://image.tmdb.org/t/p/w500${path}`;
    };
</script>

<div class="movie-grid">
    <h1>Popular Movies</h1>
    
    {#if popular.length > 0}
        <div class="grid-container">
            {#each popular as movie (movie.id)}
                <div class="movie-card">
                    {#if movie.poster_path}
                        <a href={'/movie/' + movie.id}>
                            <img 
                                src={getPosterUrl(movie.poster_path)} 
                                alt={movie.title}
                                class="poster"
                            />
                        </a>
                    {/if}
                    <h2>{movie.title}</h2>
					<p>{movie.release_date}</p>
                </div>
            {/each}
        </div>
    {:else}
        <p>No movies available at the moment.</p>
    {/if}
</div>

<style>
    .movie-grid {
        padding: 20px;
    }

    .grid-container {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        gap: 20px;
        padding: 20px;
    }

    .movie-card {
        border: 1px solid #ddd;
        border-radius: 8px;
        overflow: hidden;
        background: white;
        padding: 8px;
    }

    .movie-card img {
        object-fit: cover;
    }

    .poster {
        width: 100%;
        height: 300px;
        display: block;
    }

    h2 {
        padding: 10px;
        margin: 0;
        font-size: 1rem;
        font-weight: 700;
    }

    h1 {
        text-align: center;
        margin-bottom: 20px;
        font-weight: 600;
    }
    @media (max-width: 998px) {
        .movie-grid {
            padding: 7px;
        }
        .movie-grid h1 {
            font-size: 1.5rem
        }
    }
</style>