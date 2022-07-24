const APIController = (function() {
    
    const clientId = process.env.VUE_APP_CLIENTID;
    const clientSecret = process.env.VUE_APP_CLIENTSECRET;

    // private methods
    const _getToken = async () => {

        const result = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/x-www-form-urlencoded', 
                'Authorization' : 'Basic ' + btoa(clientId + ':' + clientSecret)
            },
            body: 'grant_type=client_credentials'
        });

        const data = await result.json();
        return data.access_token;
    }
    
    const _getGenres = async (token) => {

        const result = await fetch(`https://api.spotify.com/v1/browse/categories?locale=sv_US`, {
            method: 'GET',
            headers: { 'Authorization' : 'Bearer ' + token}
        });

        const data = await result.json();
        return data.categories.items;
    }

    const _getPlaylistByGenre = async (token, genreId) => {

        const limit = 10;
        
        const result = await fetch(`https://api.spotify.com/v1/browse/categories/${genreId}/playlists?limit=${limit}`, {
            method: 'GET',
            headers: { 'Authorization' : 'Bearer ' + token}
        });

        const data = await result.json();
        return data.playlists.items;
    }

    const _getTracks = async (query) => {

        const limit = 10;
        const token= await _getToken();
        const result = await fetch(`https://api.spotify.com/v1/search/?q=${query}&type=track&limit=${limit}`, {
            method: 'GET',
            headers: { 'Authorization' : 'Bearer ' + token}
        });

        const data = await result.json();
        return data.tracks.items;
    }

    const _getTrack = async (token, trackEndPoint) => {

        const result = await fetch(`${trackEndPoint}`, {
            method: 'GET',
            headers: { 'Authorization' : 'Bearer ' + token}
        });

        const data = await result.json();
        return data;
    }

    const _getArtist = async (name) => {
        const token= await _getToken();
        const query = name;
        const result = await fetch(`https://api.spotify.com/v1/search/?q=${query}&type=artist`, {
            method: 'GET',
            headers: { 'Authorization' : 'Bearer ' + token}
        });
        
        const data = await result.json();
        
        return data.artists.items[0];
        
    }

    const _getUserId = async (token) => {
        const result = await fetch("https://api.spotify.com/v1/me", {
            method: 'GET',
            headers: { 'Authorization' : 'Bearer ' + token}

        })
        const data = await result.json();
        return data.id;
    }

    const requestAuthorization = async () => {
        let url = "https://accounts.spotify.com/authorize";
        url += "?client_id=" + clientId;
        url += "&response_type=code";
        url += "&redirect_uri=" + "http://localhost:8080/";
        url += "&show_dialog=true";
        url += "&scope=user-read-private user-read-email user-modify-playback-state user-read-playback-position user-library-read streaming user-read-playback-state user-read-recently-played playlist-read-private";
        window.location.href = url; // Show Spotify's authorization screen
    }

    const _getAccessToken = async (code) => {
        const result = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/x-www-form-urlencoded',
                'Authorization' : 'Basic ' + btoa(clientId + ':' + clientSecret)
            },
            body: 'grant_type=authorization_code&code=' + code + '&redirect_uri=http://localhost:8080/'
        });
        
        const data = await result.json();
        return data.access_token;
    }

    return {
        getToken() {
            return _getToken();
        },
        getGenres(token) {
            return _getGenres(token);
        },
        getPlaylistByGenre(token, genreId) {
            return _getPlaylistByGenre(token, genreId);
        },
        getTracks(tracksEndPoint) {
            return _getTracks(tracksEndPoint);
        },
        getTrack(token, trackEndPoint) {
            return _getTrack(token, trackEndPoint);
        },
        getArtist(name){
            return _getArtist(name);
        },
        getAuthorization(){
            return requestAuthorization();
        },
        getUserid(token){
            return _getUserId(token);
        },
        getAccessToken(code){
            return _getAccessToken(code);
        }
    }
});

export default APIController;

