<script>
    import '../app.css';
    import { goto } from '$app/navigation';

    async function handleSearch(event) {
        event.preventDefault();
        console.log('Search form submitted');
        
        const formData = new FormData(event.target);
        const searchQuery = formData.get('search_movie');
        console.log('Search query:', searchQuery);
        
        if (searchQuery) {
            const searchUrl = `/search?q=${encodeURIComponent(searchQuery)}`;
            console.log('Navigating to:', searchUrl);
            await goto(searchUrl);
        }
    }
</script>

<svelte:head>
    <title>MovieShop</title>
</svelte:head>

<div class="header-section">
    <nav class="header">
        <div class="logo">
            <h2>Movie Shop</h2>
        </div>
        <div class="search">
            <div class="search-container">
                <form 
                    on:submit|preventDefault={handleSearch}
                    class="search-form"
                >
                    <input 
                        type="text" 
                        name="search_movie"
                        placeholder="Search movies..."
                        class="search-input"
                    >
                    <button 
                        type="submit" 
                        class="search-button"
                        aria-label="Search movies"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                    </button>
                </form>
            </div>
        </div>
        <div class="nav-links">
            <a href="/" class="nav-link active">Home</a>
        </div>
    </nav>
</div>

<main>
    <slot />
</main>


<style>
    .header-section {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
    }

    .header {
        display: flex;
        justify-content: space-between;
        background-color: #fff;
        align-items: center;
        width: 100%;
        padding: 0 48px;
        height: 70px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        z-index: 1000;
    }

    .logo { 
        width: 100%;
    }

    .logo h2 {
        margin: 0;
        font-size: 1.5rem;
        color: #333;
        font-weight: 600;
    }

    .nav-links {
        width: 100%;
        display: flex;
        justify-content: end;
        gap: 20px;
        margin-right: 20px;
    }

    .nav-link {
        text-decoration: none;
        color: #333;
        font-weight: 500;
        font-size: 1.1rem;
        padding: 8px 16px;
        border-radius: 6px;
        transition: all 0.2s ease;
    }

    .nav-link:hover {
        background-color: #f5f5f5;
        color: #000;
    }

    .nav-link.active {
        background-color: #f0f0f0;
        color: #000;
    }

    .search {
        width: 100%;
        max-width: 400px;
        padding: 0 20px;
    }

    .search-container {
        position: relative;
        width: 100%;
    }

    .search-form {
        position: relative;
        width: 100%;
    }

    .search-input {
        width: 100%;
        padding: 10px 40px 10px 16px;
        font-size: 0.95rem;
        border: 2px solid #e5e7eb;
        border-radius: 8px;
        outline: none;
        transition: all 0.2s ease;
    }

    .search-input:focus {
        border-color: #3b82f6;
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }

    .search-button {
        position: absolute;
        right: 8px;
        top: 50%;
        transform: translateY(-50%);
        padding: 6px;
        background: none;
        border: none;
        color: #6b7280;
        cursor: pointer;
        border-radius: 6px;
        transition: all 0.2s ease;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .search-button:hover {
        color: #3b82f6;
        background-color: rgba(59, 130, 246, 0.1);
    }

    main {
        margin-top: 70px;
        padding: 24px;
    }
    @media (max-width: 998px) {
        .header {
            padding: 0 12px;
        }
        
        .search {
            padding: 0 10px;
        }
        .nav-links {
            margin-right: 7px;
        }
        .logo h2 {
            font-size: 0.95rem;
        }
        .nav-link {
            font-weight: 500;
            font-size: 0.83rem;
            padding: 8px 16px;
        }
        .search-input {
            width: 100%;
            padding: 10px 40px 10px 16px;
            font-size: 0.95rem;
        }
    }
</style>
