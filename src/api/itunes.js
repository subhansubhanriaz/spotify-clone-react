// src/api/itunes.js

// YOUR BRAND NEW PRODUCTION CLIENT ID
const JAMENDO_CLIENT_ID = "bb409d00";

export const getJamendoAudioStream = async (trackName, artistName) => {
  try {
    // Stage 1: Attempt dynamic query search based on track name
    const cleanTrackName = trackName ? trackName.split('(')[0].trim() : "";
    const primaryUrl = `https://api.jamendo.com/v3.0/tracks/?client_id=${JAMENDO_CLIENT_ID}&format=json&limit=5&namesearch=${encodeURIComponent(cleanTrackName)}`;
    
    const response = await fetch(primaryUrl);
    if (!response.ok) throw new Error("Primary stream node error");
    const data = await response.json();
    
    if (data.results && data.results.length > 0) {
      // Find the first track object that contains a live stream link
      const matchedTrack = data.results.find(t => t.audio && t.audio.trim() !== "");
      if (matchedTrack) return matchedTrack.audio;
    }

    // Stage 2: Safe Pipeline Fallback (Guarantees player never gets empty or broken source)
    // Fetches top tracks matching generic musical vibes so audio plays instantly
    const fallbackUrl = `https://api.jamendo.com/v3.0/tracks/?client_id=${JAMENDO_CLIENT_ID}&format=json&limit=10&order=buzz_month&musicgenre=pop`;
    const fallbackRes = await fetch(fallbackUrl);
    if (fallbackRes.ok) {
      const fallbackData = await fallbackRes.json();
      if (fallbackData.results && fallbackData.results.length > 0) {
        // Pick a random track from high-speed open streaming server nodes
        const randomTrack = fallbackData.results[Math.floor(Math.random() * fallbackData.results.length)];
        return randomTrack.audio;
      }
    }
    
    return "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";
  } catch (error) {
    console.error("Jamendo Engine Core Failure:", error);
    return "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";
  }
};

export const getTrendingSongs = async () => {
  try {
    const response = await fetch("https://itunes.apple.com/search?term=pakistani&media=music&limit=15");
    if (!response.ok) throw new Error("Trending data index error");
    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error("iTunes Trending Error:", error);
    return [];
  }
};

export const searchSongs = async (query) => {
  try {
    if (!query || query.trim() === "") return [];
    const response = await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(query)}&media=music&limit=25`);
    if (!response.ok) throw new Error("Search data index error");
    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error("iTunes Search Error:", error);
    return [];
  }
};