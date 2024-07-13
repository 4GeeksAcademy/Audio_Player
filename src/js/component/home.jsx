import React, { useEffect, useState, useRef } from 'react';

const Home = () => {
  const [songs, setSongs] = useState([]);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioPlayer = useRef(new Audio()); 

  useEffect(() => {
    fetch('https://playground.4geeks.com/sound/songs')
      .then(response => response.json())
      .then(data => {
        if (data && data.songs) {
          setSongs(data.songs)
        }; 
      })
  }, []);

  useEffect(() => {
    if (songs.length > 0) {
      const audio = audioPlayer.current;
      const baseUrl = 'https://playground.4geeks.com';
      audio.src = baseUrl + songs[currentSongIndex].url;
      audio.load();
      if (isPlaying) {
        const playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise.then(_ => {
            // Auto-play started
          })
        }
      }
    }
  }, [currentSongIndex, isPlaying, songs]);
  

  const playPause = () => {
    const audio = audioPlayer.current;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const playNext = () => {
    setCurrentSongIndex((currentSongIndex + 1) % songs.length); 
    setIsPlaying(true);
  };

  const playPrevious = () => {
    setCurrentSongIndex((currentSongIndex - 1 + songs.length) % songs.length); 
    setIsPlaying(true); 
  };

  return (
    <>
      <p className="fixed-top bg-secondary" style={{ textAlign: "center", padding: "10px 0", margin: 0 }}>Audio Player</p>
      <div className="row" id="songs" style={{ padding: "20px 0" }}>
        {songs.map((song, index) => (
          <p className="songRow" key={index} style={{ fontSize: "20px", marginBottom: "10px" }}>
            {song.id}. {song.name}
          </p>
        ))}
      </div>
      <div className="controls text-center container-fluid bg-secondary fixed-bottom" style={{ padding: "10px 0" }}>
        <button className="me-2 btn btn-dark" onClick={playPrevious}><i className="fas fa-step-backward"></i></button>
        <button className="btn btn-dark" onClick={playPause}>{isPlaying ? <i className="fas fa-pause"></i> : <i className="fas fa-play"></i>}</button>
        <button className="ms-2 btn btn-dark" onClick={playNext}><i className="fas fa-step-forward"></i></button>
      </div>
      <audio ref={audioPlayer} /> 
    </>
  );
};

export default Home;
