import { useState } from "react"
import axios from "axios"

export default function Header() {

    const base_movie_api_url = 'https://api.themoviedb.org/3/search/movie'
    const [search, setSearch] = useState('')
    const [movies, setMovies] = useState(null)

    function handleSubmit() {
        e.preventDefault()
        console.log(search);
        const endpoint = `${base_movie_api_url}?api_key=${import.meta.env.VITE_THE_MOVIE_DB_API_KEY}&query=${search}`
        
        axios.get(endpoint)
        .then(res=> setMovies(res.data))
    }

        

    return(
        <>
        
        <h1>Benvenuto nei nostri film</h1>
        <form onSubmit={handleSubmit}>

        <input  type="search" value={search} onChange={(e) => setSearch(e.target.value)} />
        <button >Cerca</button>

        </form>

        <ul>
            {
                movies?.res.map(movie =>
                    <li>
                       <p>{movie.title} </p> 
                       <p>{movie.original_language}</p> <span class={`fi fi-${movie.original_language}`}></span>
                    
                    </li>
                )
            }
        </ul>
        </>
    )

    
}