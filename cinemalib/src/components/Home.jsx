import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, Navigate } from 'react-router-dom';

function Home() {
    const [movies, setMovies] = useState([])

    const fetchingData = async () => {
      try {
        const response = await axios.get('https://localhost:3000/movies');
        console.log(response.data);
        setMovies(response.data);
      } catch(error) {
        console.error(error);
      }
    }
  
    useEffect(() => {
      fetchingData();
    },[]);
    
  
    return (
      <>
        <div className='flex'>
        {
          movies.map(({id, title, poster_path}) => (
            <>
              <Link to={`/moviedetails?id=${id}`}>
                <div className='flex flex-col items-center'>
                  <img className="h-60 w-60" src={poster_path === null 
                  ? 'https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg'  // Image par défaut si poster_path est null
                  : `https://image.tmdb.org/t/p/w600_and_h900_bestv2${poster_path}`}  // Image normale  
                  alt={title} />
                  <p key={id}>{title}</p>
                </div>
              </Link>
              
            </>
          ))
        }
        </div>
      </>
    )
}

export default Home;