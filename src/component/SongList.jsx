// import React from 'react';

// const SongList = ({ songs, setCurrentSong, currentSong, savedSongs, toggleSaveSong, isPlaying }) => {
//   return (
//     <div style={{ width: '85%', maxWidth: '800px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
//       <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#fff', marginBottom: '10px' }}>Search Results</h2>
      
//       {songs.map((song) => {
//         const isCurrent = currentSong && currentSong.id === song.id;
//         // Check if this song exists inside the saved array
//         const isSaved = savedSongs.some(s => s.id === song.id);

//         return (
//           <div
//             key={song.id}
//             style={{
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'space-between',
//               backgroundColor: isCurrent ? '#fff' : '#1e1e1e',
//               color: isCurrent ? '#000' : '#fff',
//               padding: '12px 20px',
//               borderRadius: '30px',
//               boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
//               transition: 'all 0.2s ease-in-out'
//             }}
//           >
//             {/* Left Section: Image and Text */}
//             <div 
//               onClick={() => setCurrentSong(song)} 
//               style={{ display: 'flex', alignItems: 'center', gap: '15px', cursor: 'pointer', flex: 1 }}
//             >
//               <img
//                 src={song.image}
//                 alt={song.name}
//                 style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover' }}
//               />
//               <div style={{ display: 'flex', flexDirection: 'column' }}>
//                 <span style={{ fontWeight: 'bold', fontSize: '1.05rem', color: isCurrent ? '#1DB954' : '#fff' }}>
//                   {song.name}
//                 </span>
//                 <span style={{ fontSize: '0.85rem', color: isCurrent ? '#666' : '#b3b3b3' }}>
//                   {song.artist}
//                 </span>
//               </div>
//             </div>

//             {/* Right Section: Heart Button & Play/Pause State Icon */}
//             <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              
//               {/* INTERACTIVE HEART ICON BUTTON */}
//               <button
//                 onClick={(e) => {
//                   e.stopPropagation(); // Avoid triggering track selection
//                   toggleSaveSong(song);
//                 }}
//                 style={{
//                   background: 'none',
//                   border: 'none',
//                   fontSize: '1.4rem',
//                   cursor: 'pointer',
//                   outline: 'none',
//                   transition: 'transform 0.1s ease',
//                 }}
//                 onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.85)'}
//                 onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
//               >
//                 {isSaved ? '❤️' : '🤍'}
//               </button>

//               {/* Timestamp duration */}
//               <span style={{ fontSize: '0.9rem', color: isCurrent ? '#000' : '#b3b3b3' }}>
//                 {Math.floor(song.trackTimeMillis / 60000)}:
//                 {String(Math.floor((song.trackTimeMillis % 60000) / 1000)).padStart(2, '0')}
//               </span>

//               {/* Status Indicator circle icon */}
//               <div onClick={() => setCurrentSong(song)} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
//                 {isCurrent && isPlaying ? (
//                   <span style={{ color: '#1DB954', fontSize: '1.5rem' }}>⏸️</span>
//                 ) : (
//                   <span style={{ color: isCurrent ? '#1DB954' : '#fff', fontSize: '1.5rem' }}>▶️</span>
//                 )}
//               </div>

//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default SongList;

import React from 'react';

const SongList = ({ songs, setCurrentSong, currentSong, savedSongs, toggleSaveSong, isPlaying }) => {
  return (
    <div className="song-list">
      <h2 className="song-list-title">Search Results</h2>

      {songs.map((song) => {
        const isCurrent = currentSong && currentSong.id === song.id;
        // Check if this song exists inside the saved array
        const isSaved = savedSongs.some(s => s.id === song.id);

        return (
          <div
            key={song.id}
            className={`song-item${isCurrent ? ' is-current' : ''}`}
          >
            {/* Left Section: Image and Text */}
            <div
              onClick={() => setCurrentSong(song)}
              className="song-item-left"
            >
              <img
                src={song.image}
                alt={song.name}
                className="song-item-image"
              />
              <div className="song-item-info">
                <span className="song-item-name">
                  {song.name}
                </span>
                <span className="song-item-artist">
                  {song.artist}
                </span>
              </div>
            </div>

            {/* Right Section: Heart Button & Play/Pause State Icon */}
            <div className="song-item-right">

              {/* INTERACTIVE HEART ICON BUTTON */}
              <button
                onClick={(e) => {
                  e.stopPropagation(); // Avoid triggering track selection
                  toggleSaveSong(song);
                }}
                className="heart-btn"
              >
                {isSaved ? '❤️' : '🤍'}
              </button>

              {/* Timestamp duration */}
              <span className="song-item-duration">
                {Math.floor(song.trackTimeMillis / 60000)}:
                {String(Math.floor((song.trackTimeMillis % 60000) / 1000)).padStart(2, '0')}
              </span>

              {/* Status Indicator circle icon */}
              <div onClick={() => setCurrentSong(song)} className="song-item-status">
                {isCurrent && isPlaying ? (
                  <span>⏸️</span>
                ) : (
                  <span>▶️</span>
                )}
              </div>

            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SongList;