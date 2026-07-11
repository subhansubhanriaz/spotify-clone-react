

// import React, { useState, useEffect } from 'react';

// const Player = ({
//   currentSong,
//   isPlaying,
//   setIsPlaying,
//   audioRef,
//   handleNext,
//   handlePrevious,
//   savedSongs,
//   toggleSaveSong
// }) => {
//   const [currentTime, setCurrentTime] = useState(0);
//   const [duration, setDuration] = useState(0);

//   useEffect(() => {
//     const audio = audioRef.current;
//     if (!audio) return;

//     const updateTime = () => setCurrentTime(audio.currentTime);
//     const updateDuration = () => {
//       if (audio.duration) setDuration(audio.duration);
//     };

//     audio.addEventListener('timeupdate', updateTime);
//     audio.addEventListener('loadedmetadata', updateDuration);

//     return () => {
//       audio.removeEventListener('timeupdate', updateTime);
//       audio.removeEventListener('loadedmetadata', updateDuration);
//     };
//   }, [currentSong, audioRef]);

//   if (!currentSong) return null;

//   // Check if current running song is saved inside state array
//   const isSaved = savedSongs.some(s => s.id === currentSong.id);

//   const handleProgressChange = (e) => {
//     if (audioRef.current) {
//       audioRef.current.currentTime = e.target.value;
//       setCurrentTime(e.target.value);
//     }
//   };

//   const formatTime = (time) => {
//     const mins = Math.floor(time / 60);
//     const secs = Math.floor(time % 60);
//     return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
//   };

//   return (
//     <div style={{
//       position: 'fixed',
//       bottom: 0,
//       left: 0,
//       width: '100%',
//       backgroundColor: '#000',
//       borderTop: '1px solid #282828',
//       padding: '15px 30px',
//       display: 'flex',
//       flexDirection: 'column',
//       gap: '8px',
//       boxZIndex: 1000,
//       boxSizing: 'border-box'
//     }}>
      
//       {/* Top Track Line: Timeline Scrubber slider node */}
//       <div style={{ display: 'flex', alignItems: 'center', width: '100%', gap: '10px' }}>
//         <span style={{ color: '#a7a7a7', fontSize: '0.75rem' }}>{formatTime(currentTime)}</span>
//         <input
//           type="range"
//           min="0"
//           max={duration || 100}
//           value={currentTime}
//           onChange={handleProgressChange}
//           style={{
//             flex: 1,
//             accentColor: '#1DB954',
//             height: '4px',
//             cursor: 'pointer'
//           }}
//         />
//         <span style={{ color: '#a7a7a7', fontSize: '0.75rem' }}>{formatTime(duration)}</span>
//       </div>

//       {/* Main Bottom Interface Wrapper */}
//       <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        
//         {/* LEFT PROFILE CORNER BLOCK */}
//         <div style={{ display: 'flex', alignItems: 'center', gap: '15px', width: '30%' }}>
//           <img
//             src={currentSong.image}
//             alt={currentSong.name}
//             style={{ width: '55px', height: '55px', borderRadius: '4px', objectFit: 'cover' }}
//           />
//           <div style={{ display: 'flex', flexDirection: 'column' }}>
//             <span style={{ fontWeight: 'bold', color: '#fff', fontSize: '0.95rem' }}>{currentSong.name}</span>
//             <span style={{ color: '#b3b3b3', fontSize: '0.8rem' }}>{currentSong.artist}</span>
//           </div>

//           {/* DYNAMIC PLAYER BAR HEART CONTROLLER ICON */}
//           <button
//             onClick={() => toggleSaveSong(currentSong)}
//             style={{
//               background: 'none',
//               border: 'none',
//               fontSize: '1.3rem',
//               cursor: 'pointer',
//               marginLeft: '10px',
//               outline: 'none'
//             }}
//           >
//             {isSaved ? '❤️' : '🤍'}
//           </button>
//         </div>

//         {/* CENTER CONTROLS HUD */}
//         <div style={{ display: 'flex', alignItems: 'center', gap: '25px' }}>
//           <button onClick={handlePrevious} style={{ background: 'none', border: 'none', color: '#b3b3b3', fontSize: '1.6rem', cursor: 'pointer' }}>⏮️</button>
//           <button
//             onClick={setIsPlaying}
//             style={{
//               background: '#fff',
//               border: 'none',
//               width: '42px',
//               height: '42px',
//               borderRadius: '50%',
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'center',
//               cursor: 'pointer',
//               fontSize: '1.2rem'
//             }}
//           >
//             {isPlaying ? '⏸️' : '▶️'}
//           </button>
//           <button onClick={handleNext} style={{ background: 'none', border: 'none', color: '#b3b3b3', fontSize: '1.6rem', cursor: 'pointer' }}>⏭️</button>
//         </div>

//         {/* RIGHT VOLUME SPACING HOOK */}
//         <div style={{ width: '30%' }}></div>

//       </div>
//     </div>
//   );
// };

// export default Player;


import React, { useState, useEffect } from 'react';

const Player = ({
  currentSong,
  isPlaying,
  setIsPlaying,
  audioRef,
  handleNext,
  handlePrevious,
  savedSongs,
  toggleSaveSong
}) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => {
      if (audio.duration) setDuration(audio.duration);
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
    };
  }, [currentSong, audioRef]);

  if (!currentSong) return null;

  // Check if current running song is saved inside state array
  const isSaved = savedSongs.some(s => s.id === currentSong.id);

  const handleProgressChange = (e) => {
    if (audioRef.current) {
      audioRef.current.currentTime = e.target.value;
      setCurrentTime(e.target.value);
    }
  };

  const formatTime = (time) => {
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="player-bar">

      {/* Top Track Line: Timeline Scrubber slider node */}
      <div className="player-progress-row">
        <span className="player-time">{formatTime(currentTime)}</span>
        <input
          type="range"
          min="0"
          max={duration || 100}
          value={currentTime}
          onChange={handleProgressChange}
          className="player-range"
        />
        <span className="player-time">{formatTime(duration)}</span>
      </div>

      {/* Main Bottom Interface Wrapper */}
      <div className="player-main">

        {/* LEFT PROFILE CORNER BLOCK */}
        <div className="player-left">
          <img
            src={currentSong.image}
            alt={currentSong.name}
            className="player-image"
          />
          <div className="player-track-info">
            <span className="player-track-name">{currentSong.name}</span>
            <span className="player-track-artist">{currentSong.artist}</span>
          </div>

          {/* DYNAMIC PLAYER BAR HEART CONTROLLER ICON */}
          <button
            onClick={() => toggleSaveSong(currentSong)}
            className="player-heart-btn"
          >
            {isSaved ? '❤️' : '🤍'}
          </button>
        </div>

        {/* CENTER CONTROLS HUD */}
        <div className="player-center">
          <button onClick={handlePrevious} className="player-skip-btn">⏮️</button>
          <button
            onClick={setIsPlaying}
            className="player-play-btn"
          >
            {isPlaying ? '⏸️' : '▶️'}
          </button>
          <button onClick={handleNext} className="player-skip-btn">⏭️</button>
        </div>

        {/* RIGHT VOLUME SPACING HOOK */}
        <div className="player-right"></div>

      </div>
    </div>
  );
};

export default Player;