import axios from "axios";
import { AiFillSnippets } from "react-icons/ai";

//insert your Twitch API key into this variable for the project to works
//let API_KEY = "dc2a230ajb9u8qb2inllp165hs12e7";
let api = axios.create({
  headers: {
    "Authorization": "Bearer p2p1g6gzzyp2olmn60ayxuvgpbn3vs",
"Client-Id": "kimne78kx3ncx6brgo4mv6wki5h1ko"
    //"Client-ID": API_KEY,
    //"Authorization": "OAuth p2p1g6gzzyp2olmn60ayxuvgpbn3vs" 
  }
})


let ytApi=axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3/",
  params:{
    part:'snippet',
    maxResults:10,
    key : 'AIzaSyBzBWOBVGJBKLU5d-GhgWcZr9rXKXTmBgQ'

  }
})
;

export default api;
