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
    fetch(`http://www.omdbapi.com/?apikey=8154a0e3&type=movie&s=${title}`)
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


  let nominationContent = <p>No Nominations Selected</p>

  if (nominations.length > 0) {
    nominationContent = (
    <ul>
      {nominations.map((movie) => {
        return (
        <li>{movie.Title} {' '} <button className="remove-btn" onClick={() => {removeNomination(movie)}}>Remove</button></li>
        )
      })}
    </ul>
    )
  }

  return (
    <div className="h-screen flex flex-col justify-start items-center bg-gradient-to-r from-green-700 via-green-400 to-green-700">
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="max-w-6xl flex flex-col flex-1 justify-around items-center w-4/5 bg-white">
        <h1 className="m-2 text-center">Search For A Movie</h1>
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
          {movies?.list?.length > 0 ? <h2>Search Results for "{movies.value}"</h2> : null }
          </div>
        </div>

        <div className="overflow-y-scroll h-64">
        {movies?.list?.length > 0 && movies.list.map((movie) => {
          return (
          <div className="bg-gray-200 p-4 m-1">
            <img src="" src="Poster"></img>
            <p>{movie.Title}</p>
            <p>{movie.Year}</p>
            <button className="shop-btn disabled:opacity-50" disabled={idInNominationListCheck(movie)} onClick={() => {addNomination(movie)}}>Nominate</button>
          </div>)
        })
        }
        </div>
        <div>
          <h2>Saved Nominations</h2>
          {nominationContent}
        </div>
      </main>
      <footer className="w-full h-24 flex justify-center items-center items-center border-t bg-gray-100">
        <a
          href="https://www.omdbapi.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by the <strong>OMDB Api</strong>{' '}
          <span className="">
            <Image src="/favicon.ico" alt="Vercel Logo" width={16} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}
