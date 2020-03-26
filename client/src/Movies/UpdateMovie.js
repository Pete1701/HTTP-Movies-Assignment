import React, { useState, useEffect } from 'react'
import axios from 'axios'

const UpdateMovie = props => {
    let id = props.match.params.id;
    const [updateMovie, setUpdateMovie] = useState({
        title: '',
        director: '',
        metascore: '',
        stars: []
    });

    const [starState, setStarState] = useState(false);

      const handleStar = e => {
        e.preventDefault();
        setUpdateMovie({
            ...updateMovie,
            stars: updateMovie.stars.split(", ") });
        setStarState(true);
      };

    const handleChanges = e => {
        e.preventDefault();        
        setUpdateMovie({
            ...updateMovie,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = e => {
        e.preventDefault();
        axios
            .put(`http://localhost:5000/api/movies/${id}`, updateMovie)
            .then(res => {
            console.log('Put', res);
            props.addToSavedList(res.data);
            props.history.push('/');
            })
            .catch(err => console.log(err));
    }

    useEffect(() => {
        const movieToEdit = props.movies.find(
          i => i.id.toString() === props.match.params.id
        );
        if (movieToEdit) {
            setUpdateMovie(movieToEdit);
        }
      }, [props.movies, props.match.params.id]);

    // useEffect(() => {
    //     axios
    //       .get(`http://localhost:5000/api/movies/${id}`)
    //       .then(res => setUpdateMovie({ ...res.data, stars: res.data.stars.join(" ,") }))
    //       .catch(err => console.log(err));
    //   }, [id]);

    return (
        <div className='updatemovie'>
            <h2>Update Movie</h2>
            <form onSubmit={starState ? handleSubmit : handleStar}>
                <input
                    name='title'
                    type='text'
                    onChange={handleChanges}
                    placeholder='Title'
                    value={updateMovie.title}
                />
                <input
                    name='director'
                    type='text'
                    onChange={handleChanges}
                    placeholder='Director'
                    value={updateMovie.director} 
                />
                <input
                    name='metascore'
                    type='text'
                    onChange={handleChanges}
                    placeholder='Metascore'
                    value={updateMovie.metascore}
                />
                Stars:{" "}
                {starState ? (
                    updateMovie.stars
                ) : (
                    <input
                    type="text"
                    name="stars"
                    value={updateMovie.stars}
                    placeholder="Stars"
                    onChange={handleChanges}
                    />
                )}
                <button type='submit'>Save</button>
            </form>
        </div>
    )
}

export default UpdateMovie