// import { useState, useEffect, useRef } from 'react'
// import { getTrendingSongs, searchSongs, getJamendoAudioStream } from './api/itunes'
// import Navbar from './component/Navbar'
// import SongList from './component/SongList'
// import Player from './component/Player'
// import Auth from './component/Auth' // Import the new Auth gate component

// function App() {
//   // Authentication State Tracker
//   const [user, setUser] = useState(() => {
//     const activeSession = localStorage.getItem('current_logged_user');
//     return activeSession ? JSON.parse(activeSession) : null;
//   });

//   const [songs, setSongs] = useState([]); 
//   const [currentSong, setCurrentSong] = useState(null); 
//   const [isPlaying, setIsPlaying] = useState(false); 
//   const [searchQuery, setSearchQuery] = useState(''); 
//   const [loading, setLoading] = useState(false);
//   const [activeTab, setActiveTab] = useState('discover');

//   const [savedSongs, setSavedSongs] = useState(() => {
//     const localData = localStorage.getItem('spotify_saved_songs');
//     return localData ? JSON.parse(localData) : [];
//   });

//   const audioRef = useRef(null);

//   useEffect(() => {
//     localStorage.setItem('spotify_saved_songs', JSON.stringify(savedSongs));
//   }, [savedSongs]);

//   // Fetch Logic execution (Only runs when a verified user session is active)
//   useEffect(() => {
//     if (!user || activeTab !== 'discover') return;
    
//     setLoading(true);
//     if (searchQuery.trim() === "") {
//       getTrendingSongs()
//         .then((data) => {
//           const formatted = data.map((track, index) => ({
//             id: track.trackId || `trending-${index}`,
//             name: track.trackName || "Dynamic Track",
//             artist: track.artistName || "Official Artist",
//             image: track.artworkUrl100 ? track.artworkUrl100.replace('100x100bb', '400x400bb') : 'https://via.placeholder.com/400', 
//             downloadUrl: "", 
//             trackTimeMillis: track.trackTimeMillis || 180000 
//           }));
          
//           setSongs(formatted);
//           if (formatted.length > 0 && !currentSong) {
//             setCurrentSong(formatted[0]);
//           }
//           setLoading(false);
//         })
//         .catch(() => setLoading(false));
//     } else {
//       const delayDebounce = setTimeout(() => {
//         searchSongs(searchQuery)
//           .then((data) => {
//             const formatted = data.map((track, index) => ({
//               id: track.trackId || `search-${index}`,
//               name: track.trackName || "Search Track",
//               artist: track.artistName || "Artist Profile",
//               image: track.artworkUrl100 ? track.artworkUrl100.replace('100x100bb', '400x400bb') : 'https://via.placeholder.com/400',
//               downloadUrl: "",
//               trackTimeMillis: track.trackTimeMillis || 180000
//             }));
            
//             setSongs(formatted);
//             setLoading(false);
//           })
//           .catch(() => setLoading(false));
//       }, 400);

//       return () => clearTimeout(delayDebounce);
//     }
//   }, [searchQuery, activeTab, user]);

//   const togglePlayPause = () => {
//     if (!audioRef.current) return;
//     if (isPlaying) {
//       audioRef.current.pause();
//       setIsPlaying(false);
//     } else {
//       audioRef.current.play()
//         .then(() => setIsPlaying(true))
//         .catch((err) => console.log("Playback invocation bypassed:", err.message));
//     }
//   };

//   const handleSongSelect = async (song) => {
//     setIsPlaying(false);
//     setLoading(true);

//     if (audioRef.current) {
//       audioRef.current.pause();
//     }

//     try {
//       const activeStream = await getJamendoAudioStream(song.name, song.artist);
//       const updatedSongData = { ...song, downloadUrl: activeStream };
//       setCurrentSong(updatedSongData);
//       setLoading(false);

//       setTimeout(() => {
//         if (audioRef.current) {
//           audioRef.current.load();
//           const playPromise = audioRef.current.play();
          
//           if (playPromise !== undefined) {
//             playPromise
//               .then(() => {
//                 setIsPlaying(true);
//               })
//               .catch((err) => {
//                 console.error("Audio pipeline error:", err.message);
//                 setIsPlaying(false);
//               });
//           }
//         }
//       }, 100);

//     } catch (error) {
//       console.error("Critical track load failure:", error);
//       setLoading(false);
//     }
//   };

//   const toggleSaveSong = (song) => {
//     const isAlreadySaved = savedSongs.some(s => s.id === song.id);
//     if (isAlreadySaved) {
//       setSavedSongs(savedSongs.filter(s => s.id !== song.id));
//     } else {
//       setSavedSongs([...savedSongs, song]);
//     }
//   };

//   const currentSongsList = activeTab === 'library' ? savedSongs : songs;

//   const handleNext = () => {
//     if (currentSongsList.length === 0 || !currentSong) return;
//     const currentIndex = currentSongsList.findIndex(song => song.id === currentSong.id);
//     const nextIndex = currentIndex === currentSongsList.length - 1 ? 0 : currentIndex + 1;
//     handleSongSelect(currentSongsList[nextIndex]);
//   };

//   const handlePrevious = () => {
//     if (currentSongsList.length === 0 || !currentSong) return;
//     const currentIndex = currentSongsList.findIndex(song => song.id === currentSong.id);
//     const prevIndex = currentIndex === 0 ? currentSongsList.length - 1 : currentIndex - 1;
//     handleSongSelect(currentSongsList[prevIndex]);
//   };

//   // Clear Session Terminal Router
//   const handleLogout = () => {
//     if (audioRef.current) audioRef.current.pause();
//     setIsPlaying(false);
//     setCurrentSong(null);
//     localStorage.removeItem('current_logged_user');
//     setUser(null);
//   };

//   // --- RENDERING ROUTE CONTROL ---
//   // If user state is missing, intercept flow and mount Auth Page Gate
//   if (!user) {
//     return <Auth onAuthSuccess={(userData) => setUser(userData)} />;
//   }

//   // Else, return the locked main dashboard view structure
//   return (
//     <div style={{ minHeight: '100vh', backgroundColor: '#121212', color: '#fff', paddingBottom: '120px' }}>
      
//       {/* Top Navbar Header with Dynamic Welcome Badge & Logout Trigger */}
//       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#000', padding: '0px 20px' }}>
//         <Navbar />
//         <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
//           <span style={{ color: '#1DB954', fontWeight: 'bold' }}>👋 Welcome, {user.name}</span>
//           <button 
//             onClick={handleLogout}
//             style={{
//               backgroundColor: 'transparent',
//               border: '1px solid #727272',
//               color: '#fff',
//               padding: '6px 14px',
//               borderRadius: '20px',
//               cursor: 'pointer',
//               fontSize: '0.85rem',
//               fontWeight: 'bold'
//             }}
//           >
//             Log Out
//           </button>
//         </div>
//       </div>

//       {/* PORTFOLIO NAVIGATION TABS BAR */}
//       <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '25px' }}>
//         <button 
//           onClick={() => setActiveTab('discover')}
//           style={{
//             padding: '10px 24px',
//             borderRadius: '20px',
//             border: 'none',
//             fontWeight: 'bold',
//             cursor: 'pointer',
//             backgroundColor: activeTab === 'discover' ? '#1DB954' : '#282828',
//             color: '#fff',
//             transition: '0.3s'
//           }}
//         >
//           🌐 Discover Music
//         </button>
//         <button 
//           onClick={() => setActiveTab('library')}
//           style={{
//             padding: '10px 24px',
//             borderRadius: '20px',
//             border: 'none',
//             fontWeight: 'bold',
//             cursor: 'pointer',
//             backgroundColor: activeTab === 'library' ? '#1DB954' : '#282828',
//             color: '#fff',
//             transition: '0.3s'
//           }}
//         >
//           ❤️ My Saved Library ({savedSongs.length})
//         </button>
//       </div>

//       {/* SEARCH BAR */}
//       {activeTab === 'discover' && (
//         <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '25px' }}>
//           <input
//             type="text"
//             placeholder="Search unlimited tracks (iTunes Meta + Jamendo Stream)..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             style={{
//               width: '45%',
//               padding: '14px 24px',
//               borderRadius: '25px',
//               border: 'none',
//               outline: 'none',
//               fontSize: '1rem',
//               backgroundColor: '#fff',
//               color: '#000',
//               boxShadow: '0px 4px 16px rgba(0,0,0,0.3)'
//             }}
//           />
//         </div>
//       )}

//       {/* MAIN RENDER WINDOW */}
//       <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '25px' }}>
//         {activeTab === 'library' && savedSongs.length === 0 ? (
//           <div style={{ textAlign: 'center', marginTop: '40px', color: '#b3b3b3' }}>
//             <h3 style={{ fontSize: '1.5rem' }}>Your Library is Empty</h3>
//             <p>Go to "Discover Music" and press the heart icon to save your favorite songs here!</p>
//           </div>
//         ) : (
//           <SongList
//             songs={currentSongsList}
//             setCurrentSong={handleSongSelect}
//             setIsPlaying={togglePlayPause} 
//             currentSong={currentSong}
//             savedSongs={savedSongs}
//             toggleSaveSong={toggleSaveSong} 
//             isPlaying={isPlaying}
//           />
//         )}
//       </div>

//       {/* AUDIO NODE */}
//       {currentSong && currentSong.downloadUrl && (
//         <audio
//           key={currentSong.id} 
//           ref={audioRef}
//           src={currentSong.downloadUrl}
//           onEnded={handleNext}
//           preload="auto"
//         />
//       )}

//       {/* LOADING STATUS LIGHT INDICATOR */}
//       {loading && (
//         <div style={{ position: 'fixed', bottom: '110px', left: '20px', backgroundColor: '#1DB954', color: '#fff', padding: '8px 16px', borderRadius: '20px', fontWeight: 'bold', fontSize: '0.9rem', zIndex: 999 }}>
//           🔄 Syncing Dynamic Audio Stream...
//         </div>
//       )}

//       <Player
//         currentSong={currentSong}
//         isPlaying={isPlaying}
//         setIsPlaying={togglePlayPause} 
//         audioRef={audioRef}
//         handleNext={handleNext}
//         handlePrevious={handlePrevious}
//         savedSongs={savedSongs}
//         toggleSaveSong={toggleSaveSong}
//       />
//     </div>
//   )
// }

// export default App;


import { useState, useEffect, useRef } from 'react'
import { getTrendingSongs, searchSongs, getJamendoAudioStream } from './api/itunes'
import Navbar from './component/Navbar'
import SongList from './component/SongList'
import Player from './component/Player'
import Auth from './component/Auth' // Import the new Auth gate component

function App() {
  // Authentication State Tracker
  const [user, setUser] = useState(() => {
    const activeSession = localStorage.getItem('current_logged_user');
    return activeSession ? JSON.parse(activeSession) : null;
  });

  const [songs, setSongs] = useState([]); 
  const [currentSong, setCurrentSong] = useState(null); 
  const [isPlaying, setIsPlaying] = useState(false); 
  const [searchQuery, setSearchQuery] = useState(''); 
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('discover');

  const [savedSongs, setSavedSongs] = useState(() => {
    const localData = localStorage.getItem('spotify_saved_songs');
    return localData ? JSON.parse(localData) : [];
  });

  const audioRef = useRef(null);

  useEffect(() => {
    localStorage.setItem('spotify_saved_songs', JSON.stringify(savedSongs));
  }, [savedSongs]);

  // Fetch Logic execution (Only runs when a verified user session is active)
  useEffect(() => {
    if (!user || activeTab !== 'discover') return;
    
    setLoading(true);
    if (searchQuery.trim() === "") {
      getTrendingSongs()
        .then((data) => {
          const formatted = data.map((track, index) => ({
            id: track.trackId || `trending-${index}`,
            name: track.trackName || "Dynamic Track",
            artist: track.artistName || "Official Artist",
            image: track.artworkUrl100 ? track.artworkUrl100.replace('100x100bb', '400x400bb') : 'https://via.placeholder.com/400', 
            downloadUrl: "", 
            trackTimeMillis: track.trackTimeMillis || 180000 
          }));
          
          setSongs(formatted);
          if (formatted.length > 0 && !currentSong) {
            setCurrentSong(formatted[0]);
          }
          setLoading(false);
        })
        .catch(() => setLoading(false));
    } else {
      const delayDebounce = setTimeout(() => {
        searchSongs(searchQuery)
          .then((data) => {
            const formatted = data.map((track, index) => ({
              id: track.trackId || `search-${index}`,
              name: track.trackName || "Search Track",
              artist: track.artistName || "Artist Profile",
              image: track.artworkUrl100 ? track.artworkUrl100.replace('100x100bb', '400x400bb') : 'https://via.placeholder.com/400',
              downloadUrl: "",
              trackTimeMillis: track.trackTimeMillis || 180000
            }));
            
            setSongs(formatted);
            setLoading(false);
          })
          .catch(() => setLoading(false));
      }, 400);

      return () => clearTimeout(delayDebounce);
    }
  }, [searchQuery, activeTab, user]);

  const togglePlayPause = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.log("Playback invocation bypassed:", err.message));
    }
  };

  const handleSongSelect = async (song) => {
    setIsPlaying(false);
    setLoading(true);

    if (audioRef.current) {
      audioRef.current.pause();
    }

    try {
      const activeStream = await getJamendoAudioStream(song.name, song.artist);
      const updatedSongData = { ...song, downloadUrl: activeStream };
      setCurrentSong(updatedSongData);
      setLoading(false);

      setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.load();
          const playPromise = audioRef.current.play();
          
          if (playPromise !== undefined) {
            playPromise
              .then(() => {
                setIsPlaying(true);
              })
              .catch((err) => {
                console.error("Audio pipeline error:", err.message);
                setIsPlaying(false);
              });
          }
        }
      }, 100);

    } catch (error) {
      console.error("Critical track load failure:", error);
      setLoading(false);
    }
  };

  const toggleSaveSong = (song) => {
    const isAlreadySaved = savedSongs.some(s => s.id === song.id);
    if (isAlreadySaved) {
      setSavedSongs(savedSongs.filter(s => s.id !== song.id));
    } else {
      setSavedSongs([...savedSongs, song]);
    }
  };

  const currentSongsList = activeTab === 'library' ? savedSongs : songs;

  const handleNext = () => {
    if (currentSongsList.length === 0 || !currentSong) return;
    const currentIndex = currentSongsList.findIndex(song => song.id === currentSong.id);
    const nextIndex = currentIndex === currentSongsList.length - 1 ? 0 : currentIndex + 1;
    handleSongSelect(currentSongsList[nextIndex]);
  };

  const handlePrevious = () => {
    if (currentSongsList.length === 0 || !currentSong) return;
    const currentIndex = currentSongsList.findIndex(song => song.id === currentSong.id);
    const prevIndex = currentIndex === 0 ? currentSongsList.length - 1 : currentIndex - 1;
    handleSongSelect(currentSongsList[prevIndex]);
  };

  // Clear Session Terminal Router
  const handleLogout = () => {
    if (audioRef.current) audioRef.current.pause();
    setIsPlaying(false);
    setCurrentSong(null);
    localStorage.removeItem('current_logged_user');
    setUser(null);
  };

  // --- RENDERING ROUTE CONTROL ---
  // If user state is missing, intercept flow and mount Auth Page Gate
  if (!user) {
    return <Auth onAuthSuccess={(userData) => setUser(userData)} />;
  }

  // Else, return the locked main dashboard view structure
  return (
    <div className="app-shell">
      
      {/* Top Navbar Header with Dynamic Welcome Badge & Logout Trigger */}
      <div className="app-topbar">
        <Navbar />
        <div className="app-topbar-actions">
          <span className="welcome-badge">👋 Welcome, {user.name}</span>
          <button
            onClick={handleLogout}
            className="logout-btn"
          >
            Log Out
          </button>
        </div>
      </div>

      {/* PORTFOLIO NAVIGATION TABS BAR */}
      <div className="tabs-row">
        <button
          onClick={() => setActiveTab('discover')}
          className={`tab-btn${activeTab === 'discover' ? ' active' : ''}`}
        >
          🌐 Discover Music
        </button>
        <button
          onClick={() => setActiveTab('library')}
          className={`tab-btn${activeTab === 'library' ? ' active' : ''}`}
        >
          ❤️ My Saved Library ({savedSongs.length})
        </button>
      </div>

      {/* SEARCH BAR */}
      {activeTab === 'discover' && (
        <div className="search-wrapper">
          <input
            type="text"
            placeholder="Search unlimited tracks (iTunes Meta + Jamendo Stream)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>
      )}

      {/* MAIN RENDER WINDOW */}
      <div className="main-window">
        {activeTab === 'library' && savedSongs.length === 0 ? (
          <div className="empty-library">
            <h3>Your Library is Empty</h3>
            <p>Go to "Discover Music" and press the heart icon to save your favorite songs here!</p>
          </div>
        ) : (
          <SongList
            songs={currentSongsList}
            setCurrentSong={handleSongSelect}
            setIsPlaying={togglePlayPause} 
            currentSong={currentSong}
            savedSongs={savedSongs}
            toggleSaveSong={toggleSaveSong} 
            isPlaying={isPlaying}
          />
        )}
      </div>

      {/* AUDIO NODE */}
      {currentSong && currentSong.downloadUrl && (
        <audio
          key={currentSong.id} 
          ref={audioRef}
          src={currentSong.downloadUrl}
          onEnded={handleNext}
          preload="auto"
        />
      )}

      {/* LOADING STATUS LIGHT INDICATOR */}
      {loading && (
        <div className="loading-indicator">
          🔄 Syncing Dynamic Audio Stream...
        </div>
      )}

      <Player
        currentSong={currentSong}
        isPlaying={isPlaying}
        setIsPlaying={togglePlayPause} 
        audioRef={audioRef}
        handleNext={handleNext}
        handlePrevious={handlePrevious}
        savedSongs={savedSongs}
        toggleSaveSong={toggleSaveSong}
      />
    </div>
  )
}

export default App;