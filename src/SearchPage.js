import React from 'react'
import SearchBar from "./SearchBar"
import VideoList from './VideoList'
import youtube from "./YtApi"
function SearchPage() {
  const  state = {
        videos: [],
        selectedVideo: null
    }
   const handleSubmit = async (termFromSearchBar) => {
        const response = await youtube.get('/search', {
            params: {
                q: termFromSearchBar
            }
        })

        this.setState({
            videos: response.data.items
        })
        console.log("this is resp",response);
    };
   
    return (
        <div className='ui container' style={{marginTop: '1em'}}>
        <SearchBar handleFormSubmit={this.handleSubmit}/>
        <div className='ui grid'>
            <div className="ui row">
                <div className="five wide column">
                    <VideoList handleVideoSelect={this.handleVideoSelect} videos={this.state.videos}/>
                </div>
            </div>
        </div>
    </div>
    )
}

export default SearchPage
