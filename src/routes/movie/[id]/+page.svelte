<script>
    /** @type {import('./$types').PageData} */
    export let data;
    $: ({ movie } = data);

    // console.log(data)

    const getPosterUrl = (path) => {
        return `https://image.tmdb.org/t/p/w500${path}`;
    };
</script>

<div class="movie-grid">
    
    {#if movie }
        <div class="grid-container">
                <div class="movie-card">
                    {#if movie.poster_path}
                        <img 
                            src={getPosterUrl(movie.poster_path)} 
                            alt={movie.title}
                            class="poster"
                        />
                    {/if}
                    <h2>{movie.title}</h2>
                    <p>{movie.overview}</p>
					<h4 class="text-gray-600">Date Released: <span>{movie.release_date}</span></h4>
                    <h5>Runtime: <span>{movie.runtime}</span></h5>
                    <h5>Tag line: <span>{movie.tagline}</span></h5>
                </div>
        </div>
    {:else}
        <p>No movie available at the moment.</p>
    {/if}
</div>

<style>
    .movie-grid {
        padding: 20px;
    }

    .grid-container {
        display: flex;
        margin: 30px auto;
        max-width: 560px;
    }

    .movie-card {
        border-radius: 8px;
        overflow: hidden;
        background: white;
    }

    .movie-card img {
        object-fit: cover;
    }

    .poster {
        width: 100%;
        height: 370px;
        display: block;
    }

    h2 {
        padding: 10px;
        margin: 0;
        font-size: 1rem;
    }

    span {
        font-size: 13px;
        color: gray;
    }

</style>