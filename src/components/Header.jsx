import { useState } from "react"
import axios from "axios"

export default function Header() {

    const base_movie_api_url = 'https://api.themoviedb.org/3/search/movie'
    const base_serieTv_api_url = 'https://api.themoviedb.org/3/search/tv'
    const [search, setSearch] = useState('')
    const [movies, setMovies] = useState(null)
    const [tvSeries, setTvSeries] = useState(null)
    const thumb = `https://image.tmdb.org/t/p/w342/`


    function handleSubmit(e) {
        e.preventDefault()
        console.log(search);
        const endpoint = `${base_movie_api_url}?api_key=${import.meta.env.VITE_THE_MOVIE_DB_API_KEY}&query=${search}`

        axios.get(endpoint)
            .then(res => setMovies(res.data));

        const endpointTv = `${base_serieTv_api_url}?api_key=${import.meta.env.VITE_THE_MOVIE_DB_API_KEY}&query=${search}`
        axios.get(endpointTv)
            .then(res => setTvSeries(res.data))

    }

    const languageToCountry = {
        en: "gb",
        it: "it",
        fr: "fr",
        es: "es",
        de: "de",
        ja: "jp",
        ko: "kr",
        zh: "cn",
        pt: "pt",
        ru: "ru",
        hr: "hr"
    };

    function getStars(vote) {

        const stars = []
        const star = Math.ceil(vote / 2)
        const StellaPiena = <i class="bi bi-star-fill"></i>
        const stellaVuota = <i class="bi bi-star"></i>

        for (let i = 0; i < 5; i++) {
            if (i < star) {
                stars.push(StellaPiena)
            } else {
                stars.push(stellaVuota)
            }
        }

        return stars
    }


    return (
        <>

            <h1>Benvenuto nei nostri film</h1>
            <form onSubmit={handleSubmit}>

                <input type="search" value={search} onChange={(e) => setSearch(e.target.value)} />
                <button >Cerca</button>

            </form>

            <ul>
                {
                    movies?.results.map(movie =>
                        <li key={movie.id}>
                            <img src={thumb + movie.poster_path} />
                            <p>{movie.title} </p>
                            <p>{movie.original_title}</p>
                            <span className={`fi fi-${languageToCountry[movie.original_language] || "un"}`}></span>
                            <p className="text-warning">{getStars(movie.vote_average)}</p>
                        </li>
                    )
                }
            </ul>
            <h3>E qui abbiamo le serie tv</h3>
            <ul>
                {
                    tvSeries?.results.map(serie =>
                        <li key={serie.id}>
                            <p>{serie.original_name} </p>
                            <span className={`fi fi-${languageToCountry[serie.original_language] || "un"}`}></span>
                            <p className="text-warning">{getStars(serie.vote_average)}</p>
                        </li>
                    )
                }
            </ul>
        </>
    )


}