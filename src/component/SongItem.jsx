// import React from 'react'

// const SongItem = ({ title, cover }) => {
//   return (
//     <div className="songItem">
//         {/* API se aane wali image automatic yahan 'cover' mein lag jayegi */}
//         <img src={cover} alt={title} />
        
//         {/* API se aane wala song name yahan 'title' mein show hoga */}
//         <span className="songName">{title}</span>
        
//         <span className="songlistplay">
//             <span className="timestamp">
//                 05:34 <i className="far songItemPlay fa-play-circle"></i>
//             </span>
//         </span>
//     </div>
//   )
// }

// export default SongItem
import React from 'react'

const SongItem = ({ title, cover }) => {
  return (
    <div className="songItem">
        <img src={cover} alt={title} />
        <span className="songName">{title}</span>
        <span className="songlistplay">
            <span className="timestamp">
                05:34 <i className="far songItemPlay fa-play-circle"></i>
            </span>
        </span>
    </div>
  )
}

export default SongItem;