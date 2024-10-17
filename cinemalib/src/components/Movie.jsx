import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';

function Movie() {
    const { id } = useParams();
    const [data, setData] = useState([]);

    const fetchDataMovieById = async () => {
        const response = await axios.get(`https://localhost:3000/movie/${id}`);
        console.log(response.data);
        setData(response.data);
    }

    useEffect(() => {
        fetchDataMovieById();
    },[id]);

    return (
        <>
            <Link to={`/`}>Retournez à l'accueil</Link>
            <div className='flex flex-col items-center'>
            <img className="h-60 w-60" src={data.poster_path === null 
            ? 'https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg'  // Image par défaut si poster_path est null
            : `https://image.tmdb.org/t/p/w600_and_h900_bestv2${data.poster_path}`}  // Image normale  
            alt={data.title} />
            <p>{data.title}</p>
            <p>{data.overview}</p>
            </div>
        </>
    )
}

export default Movie;