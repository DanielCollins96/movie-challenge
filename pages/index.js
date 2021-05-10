import { useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'

export default function Home() {
  const [title, setTitle] = useState('');
  const [movies, setMovies] = useState({
    value: '',
    list: []
  });
  const [nominations, setNominations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true);
    const searchValue = title;
    fetch(`https://www.omdbapi.com/?apikey=8154a0e3&type=movie&s=${title}`)
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      if (data.Response.includes('False')){
        setError(data.Error);
      } else {
        setError('');
      }
      setMovies({ value: searchValue, list: data.Search });
      setLoading(false);
      console.log(data.Search)
    })
    .catch((err) => {
      setLoading(false)
      setError('Error Submitting')
    })
  }

  const saveToLocalStorage = (items) => {
		localStorage.setItem('react-movie-app-favourites', JSON.stringify(items));
	};

  const handleInputChange = (e) => {
    setTitle(e.target.value)
  }

  const idInNominationListCheck = (movie) => {
    return nominations.some((nominatedMovie) => nominatedMovie.imdbID == movie.imdbID)
  }

  const displayBanner = () => {
    return (
      <div className="grid place-items-center bg-red-700 w-full h-16 text-center text-white font-bold">User Has Selected 5 Movies!</div>
    )
  }

  const addNomination = (movie) => {
    console.log("WHT")
    console.log(movie)
    let errors = [];
    if (nominations.length >= 5) {
      errors.push('You Have Already Selected 5 Movies')
    }
    if (idInNominationListCheck(movie)) {
      errors.push('This Movie Has Already Been Nominated')
    }
    errors.length ? 
      alert(errors)
      : setNominations(prevNominations => {
        return [...prevNominations, movie]
      })
  }

  const removeNomination = (movie) => {
		const newNominationList = nominations.filter(
			(nomination) => nomination.imdbID !== movie.imdbID
		);
    setNominations(newNominationList);
  }


  let nominationContent = <p className="text-center">No Nominations Selected...</p>

  if (nominations.length > 0) {
    nominationContent = (
    <ul className="h-24 overflow-y-scroll">
      {nominations.map((movie) => {
        return (
        <li className="flex justify-between p-1 m-1 border rounded">{movie.Title} ({movie.Year}) <button className="" onClick={() => {removeNomination(movie)}}><svg xmlns="http://www.w3.org/2000/svg" className="remove-btn h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg></button></li>
        )
      })}
    </ul>
    )
  }

  return (
    <div className="h-full flex flex-col justify-start items-center bg-gradient-to-r from-green-700 via-green-400 to-green-700">
      <Head>
        <title>The Shoppies</title>
        <meta name="description" content="The Shoppies | A Site That Allows a User to Search and Nominate Movies" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="max-w-6xl flex flex-col flex-1 justify-around items-center w-4/5 bg-white">
        <h1 className="text-center font-bold">Search For A Movie</h1>
        <div className="w-full max-w-lg">
        <form onSubmit={handleSubmit} className="w-full max-w-xl p-2 border rounded sm:p-4">
        <div>
          <label htmlFor="title" className="font-bold">
            Movie Title
          </label>
          <input type="text" name="title" id="title" placeholder="Enter a Movie Title" value={title} onChange={handleInputChange} className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 my-2 block w-full appearance-none leading-normal"/>
          </div>
          <button type="submit" className="shop-btn">{!loading ? "Submit" : ( <svg className="h-5 w-5" viewBox="0 0 135 135" xmlns="http://www.w3.org/2000/svg" fill="#fff">
    <path d="M67.447 58c5.523 0 10-4.477 10-10s-4.477-10-10-10-10 4.477-10 10 4.477 10 10 10zm9.448 9.447c0 5.523 4.477 10 10 10 5.522 0 10-4.477 10-10s-4.478-10-10-10c-5.523 0-10 4.477-10 10zm-9.448 9.448c-5.523 0-10 4.477-10 10 0 5.522 4.477 10 10 10s10-4.478 10-10c0-5.523-4.477-10-10-10zM58 67.447c0-5.523-4.477-10-10-10s-10 4.477-10 10 4.477 10 10 10 10-4.477 10-10z">
        <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 67 67"
            to="-360 67 67"
            dur="2.5s"
            repeatCount="indefinite"/>
    </path>
    <path d="M28.19 40.31c6.627 0 12-5.374 12-12 0-6.628-5.373-12-12-12-6.628 0-12 5.372-12 12 0 6.626 5.372 12 12 12zm30.72-19.825c4.686 4.687 12.284 4.687 16.97 0 4.686-4.686 4.686-12.284 0-16.97-4.686-4.687-12.284-4.687-16.97 0-4.687 4.686-4.687 12.284 0 16.97zm35.74 7.705c0 6.627 5.37 12 12 12 6.626 0 12-5.373 12-12 0-6.628-5.374-12-12-12-6.63 0-12 5.372-12 12zm19.822 30.72c-4.686 4.686-4.686 12.284 0 16.97 4.687 4.686 12.285 4.686 16.97 0 4.687-4.686 4.687-12.284 0-16.97-4.685-4.687-12.283-4.687-16.97 0zm-7.704 35.74c-6.627 0-12 5.37-12 12 0 6.626 5.373 12 12 12s12-5.374 12-12c0-6.63-5.373-12-12-12zm-30.72 19.822c-4.686-4.686-12.284-4.686-16.97 0-4.686 4.687-4.686 12.285 0 16.97 4.686 4.687 12.284 4.687 16.97 0 4.687-4.685 4.687-12.283 0-16.97zm-35.74-7.704c0-6.627-5.372-12-12-12-6.626 0-12 5.373-12 12s5.374 12 12 12c6.628 0 12-5.373 12-12zm-19.823-30.72c4.687-4.686 4.687-12.284 0-16.97-4.686-4.686-12.284-4.686-16.97 0-4.687 4.686-4.687 12.284 0 16.97 4.686 4.687 12.284 4.687 16.97 0z">
        <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 67 67"
            to="360 67 67"
            dur="8s"
            repeatCount="indefinite"/>
    </path>
</svg>)}</button>
          </form>
          <p className="text-center my-2">{error}</p>
          <div>
          {movies?.list?.length > 0 ? <h3 className="text-center">Search Results for "{movies.value}"</h3> : null }
          </div>
        </div>

        <div className="grid grid-cols-1 overflow-y-scroll h-72 w-5/6 lg:grid-cols-2 border rounded p-1">
        {movies?.list?.length > 0 && movies.list.map((movie) => {
        return (
          <div className="flex flex-col justify-between bg-gray-200 p-2 m-1 gap-1 rounded">
            <div className="flex gap-1 justify-around">
            <img src={movie.Poster} className="w-28 h-auto object-cover" alt="Poster"></img>
            <div className="">
            <h2>{movie.Title}</h2>
            <p>{movie.Year}</p>
            </div>
            </div>
            <button className="shop-btn disabled:opacity-50" disabled={idInNominationListCheck(movie)} onClick={() => {addNomination(movie)}}>Nominate</button>
          </div>)
        })
        }
        </div>
        {nominations?.length >= 5 && displayBanner()}

        <div className="w-5/6 border rounded p-1">
          <div className="flex justify-center gap-2">
          <h2>Saved Nominations</h2><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
</svg></div>
          {nominationContent}
        </div>
      </main>
      <footer className="w-full h-8 flex justify-center items-center items-center border-t bg-gray-100">
        <a
          href="https://www.omdbapi.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by the <strong>OMDB Api</strong>{' '}
          <span className="">
            <Image src="/favicon.ico" alt="Omdb Api Logo" width={16} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}
