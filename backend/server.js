const cors = require('cors');
const axios = require('axios');
const path = require('path');
const express = require('express');
const app = express();
// const router = express.Router();
app.use(cors());
// app.use(express.static(path.join(__dirname,'dist/frontend')));
// app.use('/*',function(req,res) {
//     res.sendFile(path.join(__dirname + '/dist/frontend/index.html'))
// })
const API_key = "3033f95d992034583d7f7b63bb286c44";

app.get('/', function(req,res){
    res.send('Hi')
})

app.get('/multi_search/:name' , function(req,res){
    const name =req.params.name;
    const api_url = `https://api.themoviedb.org/3/search/multi?api_key=${API_key}&language=en-US&query=`+name;
    var nec = [];
    axios.get(api_url)
    .then(response => {
        response = response.data['results'];
        var i = 0;
        length = response.length
        if(length == 0){
            res.json(nec)
            console.log(nec)
        }
        while (i< length && nec.length <7){
            
            each = {}
            if(response[i].media_type == "person" || response[i].backdrop_path == null){
                i++
                continue;
            }
            else if(response[i].media_type == "movie"){

                each['media_type'] = response[i].media_type
                each['id'] = response[i].id
                each['name'] = response[i].title
                each['backdrop_path'] = "https://image.tmdb.org/t/p/w500"+response[i].backdrop_path
            
            }
            else{
    
                each['media_type'] = response[i].media_type
                each['id'] = response[i].id
                each['name'] = response[i].name
                each['backdrop_path'] = "https://image.tmdb.org/t/p/w500"+response[i].backdrop_path
                
            }
            i++;
            nec.push(each)
        }
        res.json(nec);
    })
    .catch(error => console('Error', error));
    

});
var place_holder = "https://cinemaone.net/images/movie_placeholder.png";

//Movie parts endpoints

app.get('/trending_movie' , function(req,res){

    const api_url = `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_key}`;
    var nec = [];
    axios.get(api_url)
    .then(response => {
        response = response.data['results'];
        for(i = 0; i<response.length;i++){
            each = {}
            each['id'] = response[i].id
            each['title'] = response[i].title
            if (response[i].poster_path == null){
                each['poster_path'] = place_holder;
            }
            else{ 
                each['poster_path'] = "https://image.tmdb.org/t/p/w500"+response[i].poster_path
            }
            each['type'] = 'movie'
            nec.push(each)
         }
         res.json(nec);
    })
    .catch(error => console('Error', error));
});

app.get('/top_rated_mv' , function(req,res){
    const api_url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_key}&language=en-US&page=1`;
    var nec = [];
    axios.get(api_url)
    .then(response => {
        response = response.data['results'];
        for(i = 0; i<response.length;i++){
            each = {}
            each['id'] = response[i].id
            each['title'] = response[i].title
            if (response[i].poster_path == null){
                each['poster_path'] = place_holder;
            }
            else{ 
                each['poster_path'] = "https://image.tmdb.org/t/p/w500"+response[i].poster_path
            }
            each['type'] = 'movie'
            nec.push(each)
         }
         res.json(nec);
    })
    .catch(error => console.log('Error', error));

});

////big carousel data
app.get('/cur_playing_mv' , function(req,res){
    
    const api_url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_key}&language=en-US&page=1`;
    var nec = [];
    axios.get(api_url)
    .then(response => {
        response = response.data['results'].slice(0,5);
        for (i=0;i<response.length;i++){
            each = {}
            each['id'] = response[i].id
            each['title'] = response[i].title
            each['backdrop_path'] ="https://image.tmdb.org/t/p/original"+ response[i].backdrop_path
            nec.push(each)
         }
         res.json(nec);
    })

    .catch(error => console.log('Error', error));

});
//////


app.get('/pop_mv' , function(req,res){

    const api_url = `https://api.themoviedb.org/3/movie/popular?api_key=${API_key}&language=en-US&page=1`;
    var nec = [];
    axios.get(api_url)
    .then(response => {
        response = response.data['results'];
        for(i = 0; i<response.length;i++){
            each = {}
            each['id'] = response[i].id
            each['title'] = response[i].title
            if (response[i].poster_path == null){
                each['poster_path'] = place_holder;
            }
            else{ 
                each['poster_path'] = "https://image.tmdb.org/t/p/w500"+response[i].poster_path
            }
            each['type'] = 'movie'
            nec.push(each)
         }
         res.json(nec);
    })
    .catch(error => console.log('Error', error));

});

app.get('/recommend_mv/:id' , function(req,res){
    const id = req.params.id;
    const api_url = `https://api.themoviedb.org/3/movie/`+id+`/recommendations?api_key=${API_key}&language=en-US&page=1`;
    var nec = [];
    axios.get(api_url)
    .then(response => {
        response = response.data['results'];
        for(i = 0; i<response.length;i++){
            each = {}
            each['id'] = response[i].id
            each['title'] = response[i].title
            if (response[i].poster_path == null){
                each['poster_path'] = place_holder;
            }
            else{ 
                each['poster_path'] = "https://image.tmdb.org/t/p/w500"+response[i].poster_path
            }
            each['type'] = 'movie'
            nec.push(each)
         }
         res.json(nec);
    })
    .catch(error => console.log('Error', error));

});


app.get('/similar_mv/:id' , function(req,res){

    const id = req.params.id;
    const api_url = `https://api.themoviedb.org/3/movie/`+id+`/similar?api_key=${API_key}&language=en-US&page=1`;
    var nec = [];
    axios.get(api_url)
    .then(response => {
        response = response.data['results'];
        for(i = 0; i<response.length;i++){
            each = {}
            each['id'] = response[i].id
            each['title'] = response[i].title
            if (response[i].poster_path == null){
                each['poster_path'] = place_holder;
            }
            else{ 
                each['poster_path'] = "https://image.tmdb.org/t/p/w500"+response[i].poster_path
            }
            each['type'] = 'movie'
            nec.push(each)
         }
         res.json(nec);
    })
    .catch(error => console.log('Error', error));

});

app.get('/mv_vid/:id' , function(req,res){

    const id = req.params.id;
    const api_url = `https://api.themoviedb.org/3/movie/`+id+`/videos?api_key=${API_key}&language=en-US&page=1`;
    var nec = [];
    axios.get(api_url)
    .then(response => {
        response = response.data['results'];
        if(response.length == 0){
            each ={}
            each['key'] = "/tzkWB85ULJY"
            eacg['url'] = "https://www.youtube.com/watch?v=/tzkWB85ULJY"
        }
        for(i = 0; i<response.length;i++){
            each = {}
            each['site'] = response[i].site
            each['type'] = response[i].type
            each['name'] = response[i].name
            each['key'] = response[i].key
            each['url'] = "https://www.youtube.com/watch?v="+response[i].key
            nec.push(each)
         }
         res.json(nec);
    })
    .catch(error => console.log('Error', error));

});


app.get('/mv_detail/:id' , function(req,res){

    const id = req.params.id;
    const api_url = `https://api.themoviedb.org/3/movie/`+id+`?api_key=${API_key}&language=en-US&page=1`;
    var nec = [];
    axios.get(api_url)
    .then(response => {
        response = response.data;
        each = {}
        each['title'] = response.title
        genre=[] 
        if(response.genres){
            for (i=0;i<response.genres.length;i++){
                genre.push(response.genres[i].name);
            }
        }
        each['genres'] = genre;
        lan=[]
        if(response.spoken_languages){
            for (i=0;i<response.spoken_languages.length;i++){
                lan.push(response.spoken_languages[i].name);
            }
        }
        each['spoken_languages'] = lan;
        each['release_date'] = response.release_date.slice(0,4)
        time ='';
        if(response.runtime){
            runtime = parseInt(response.runtime)
            hr = runtime/60;
            hr = Math.floor(hr)
            min = runtime%60;
            time += hr+' hrs '+min+'mins'
        }

        each['runtime'] = time;
        each['overview'] = response.overview
        each['vote_average'] = response.vote_average
        each['tagline'] = response.tagline
        each['poster_path'] = "https://image.tmdb.org/t/p/w500"+response.poster_path
        each['id'] = response.id
        
        nec.push(each)
        res.json(nec);
    })
    .catch(error => console.log('Error', error));
    

});

app.get('/mv_review/:id' , function(req,res){

    const id = req.params.id;
    const api_url = `https://api.themoviedb.org/3/movie/`+id+`/reviews?api_key=${API_key}&language=en-US&page=1`;
    var nec = [];
    axios.get(api_url)
    
    .then(response => {
        response = response.data['results'].slice(0,10);
        for(i = 0; i<response.length;i++){
            each = {}
            each['author'] = response[i].author
            each['content'] = response[i].content
            each['created_at'] = response[i].created_at.slice(0,10)
            each['url'] = response[i].url
            if(response[i].author_details.rating){
                each['rating'] = response[i].author_details.rating
            }
            else{
                each['rating'] = 0
            }
            
            if(response[i].author_details.avatar_path == null){
                each['avatar_path'] = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHnPmUvFLjjmoYWAbLTEmLLIRCPpV_OgxCVA&usqp=CAU"    
            }
            else if(response[i].author_details.avatar_path.slice(1,5)!="http"){
                var jpg = response[i].author_details.avatar_path
                each['avatar_path'] =  "https://image.tmdb.org/t/p/original"+jpg
            }
            else{
                each['avatar_path'] = response[i].author_details.avatar_path.slice(1);
                
            }
       
            nec.push(each)
         }  
         res.json(nec);
    })
    .catch(error => console.log('Error', error));

});


app.get('/mv_cast/:id' , function(req,res){

    const id = req.params.id;
    const api_url = `https://api.themoviedb.org/3/movie/`+id+`/credits?api_key=${API_key}&language=en-US&page=1`;
    var nec = [];
    axios.get(api_url)
    
    .then(response => {
        response = response.data['cast'];
        for(i = 0; i<response.length;i++){
            each = {}
            each['id'] = response[i].id
            each['name'] = response[i].name
            each['character'] = response[i].character
            if(response[i].profile_path == null){
                continue
            }
            else{
                each['profile_path'] = "https://image.tmdb.org/t/p/w500/"+response[i].profile_path
            }
            nec.push(each)
         }
         res.json(nec);
    })
    .catch(error => console.log('Error', error));

});






//TV parts endpoints


app.get('/trending_tv' , function(req,res){

    const api_url = `https://api.themoviedb.org/3/trending/tv/day?api_key=${API_key}`;
    var nec = [];
    axios.get(api_url)
    .then(response => {
        response = response.data['results'];
        for(i = 0; i<response.length;i++){
            each = {}
            each['id'] = response[i].id
            each['title'] = response[i].name
            if (response[i].poster_path == null){
                each['poster_path'] = place_holder;
            }
            else{ 
                each['poster_path'] = "https://image.tmdb.org/t/p/w500"+response[i].poster_path
            }
            each['type'] = 'tv'
            nec.push(each)
         }
         res.json(nec);
    })
    .catch(error => console('Error', error));

});

app.get('/top_rated_tv' , function(req,res){
    const api_url = `https://api.themoviedb.org/3/tv/top_rated?api_key=${API_key}&language=en-US&page=1`;
    var nec = [];
    axios.get(api_url)
    .then(response => {
        response = response.data['results'];
        for(i = 0; i<response.length;i++){
            each = {}
            each['id'] = response[i].id
            each['title'] = response[i].name
            if (response[i].poster_path == null){
                each['poster_path'] = place_holder;
            }
            else{ 
                each['poster_path'] = "https://image.tmdb.org/t/p/w500"+response[i].poster_path
            }
            each['type'] = 'tv'
            nec.push(each)
         }
         res.json(nec);
    })
    .catch(error => console.log('Error', error));

});



app.get('/pop_tv' , function(req,res){

    const api_url = `https://api.themoviedb.org/3/tv/popular?api_key=${API_key}&language=en-US&page=1`;
    var nec = [];
    axios.get(api_url)
    .then(response => {
        response = response.data['results'];
        for(i = 0; i<response.length;i++){
            each = {}
            each['id'] = response[i].id
            each['title'] = response[i].name
            if (response[i].poster_path == null){
                each['poster_path'] = place_holder;
            }
            else{ 
                each['poster_path'] = "https://image.tmdb.org/t/p/w500"+response[i].poster_path
            }
            each['type'] = 'tv'
            nec.push(each)
         }
         res.json(nec);
    })
    .catch(error => console.log('Error', error));

});

app.get('/recommend_tv/:id' , function(req,res){
    const id = req.params.id;
    const api_url = `https://api.themoviedb.org/3/tv/`+id+`/recommendations?api_key=${API_key}&language=en-US&page=1`;
    var nec = [];
    axios.get(api_url)
    .then(response => {
        response = response.data['results'];
        for(i = 0; i<response.length;i++){
            each = {}
            each['id'] = response[i].id
            each['title'] = response[i].name
            if (response[i].poster_path == null){
                each['poster_path'] = place_holder;
            }
            else{ 
                each['poster_path'] = "https://image.tmdb.org/t/p/w500"+response[i].poster_path
            }
            each['type'] = 'tv'
            nec.push(each)
         }
         res.json(nec);
    })
    .catch(error => console.log('Error', error));

});


app.get('/similar_tv/:id' , function(req,res){

    const id = req.params.id;
    const api_url = `https://api.themoviedb.org/3/tv/`+id+`/similar?api_key=${API_key}&language=en-US&page=1`;
    var nec = [];
    axios.get(api_url)
    .then(response => {
        response = response.data['results'];
        for(i = 0; i<response.length;i++){
            each = {}
            each['id'] = response[i].id
            each['title'] = response[i].name
            if (response[i].poster_path == null){
                each['poster_path'] = place_holder;
            }
            else{ 
                each['poster_path'] = "https://image.tmdb.org/t/p/w500"+response[i].poster_path
            }
            each['type'] = 'tv'
            nec.push(each)
         }
         res.json(nec);
    })
    .catch(error => console.log('Error', error));

});

app.get('/tv_vid/:id' , function(req,res){

    const id = req.params.id;
    const api_url = `https://api.themoviedb.org/3/tv/`+id+`/videos?api_key=${API_key}&language=en-US&page=1`;
    var nec = [];
    axios.get(api_url)
    .then(response => {
        response = response.data['results'];
        if(response.length == 0){
            each ={}
            each['key'] = "/tzkWB85ULJY"
            eacg['url'] = "https://www.youtube.com/watch?v=/tzkWB85ULJY"
        }
        for(i = 0; i<response.length;i++){
            each = {}
            each['site'] = response[i].site
            each['type'] = response[i].type
            each['name'] = response[i].name
            each['key'] = response[i].key
            each['url'] = "https://www.youtube.com/watch?v="+response[i].key
            nec.push(each)
         }
         res.json(nec);
    })
    .catch(error => console.log('Error', error));

});


app.get('/tv_detail/:id' , function(req,res){

    const id = req.params.id;
    const api_url = `https://api.themoviedb.org/3/tv/`+id+`?api_key=${API_key}&language=en-US&page=1`;
    var nec = [];
    axios.get(api_url)
    .then(response => {
        response = response.data;
        each['title'] = response.name
        genre=[] 
        if(response.genres){
            for (i=0;i<response.genres.length;i++){
                genre.push(response.genres[i].name);
            }
        }
        each['genres'] = genre;
        lan =[]
        if(response.spoken_languages){
            for (i=0;i<response.spoken_languages.length;i++){
                lan.push(response.spoken_languages[i].name);
            }
        }
        each['spoken_languages'] = lan;
        each['release_date'] = response.first_air_date.slice(0,4)
        time ='';
        if(response.episode_run_time){
            runtime = parseInt(response.episode_run_time)
            hr = runtime/60;
            hr = Math.floor(hr)
            min = runtime%60;
            if (hr!=0){
                time += hr+' hrs '+min+'mins'
            }
            else{
                time += runtime+"mins"
            }
            
        }

        each['runtime'] = time;
        each['overview'] = response.overview
        each['vote_average'] = response.vote_average
        each['tagline'] = response.tagline
        each['poster_path'] = "https://image.tmdb.org/t/p/w500"+response.poster_path
        each['id'] = response.id
        
        nec.push(each)
        res.json(nec);
    })
    .catch(error => console.log('Error', error));

});

app.get('/tv_review/:id' , function(req,res){

    const id = req.params.id;
    const api_url = `https://api.themoviedb.org/3/tv/`+id+`/reviews?api_key=${API_key}&language=en-US&page=1`;
    var nec = [];
    axios.get(api_url)
    
    .then(response => {
        response = response.data['results'].slice(0,10);
        for(i = 0; i<response.length;i++){
            each = {}
            each['author'] = response[i].author
            each['content'] = response[i].content
            each['created_at'] = response[i].created_at.slice(0,10)
            each['url'] = response[i].url
            each['rating'] = response[i].author_details.rating
            if(response[i].author_details.avatar_path == null){
                each['avatar_path'] = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHnPmUvFLjjmoYWAbLTEmLLIRCPpV_OgxCVA&usqp=CAU"    
            }
            else if(response[i].author_details.avatar_path.slice(1,5)!="http"){
                var jpg = response[i].author_details.avatar_path
                each['avatar_path'] =  "https://image.tmdb.org/t/p/original"+jpg
            }
            else{
                each['avatar_path'] = response[i].author_details.avatar_path.slice(1);
                
            }
            nec.push(each)
         }
         res.json(nec);
    })
});


app.get('/tv_cast/:id' , function(req,res){

    const id = req.params.id;
    const api_url = `https://api.themoviedb.org/3/tv/`+id+`/credits?api_key=${API_key}&language=en-US&page=1`;
    var nec = [];
    axios.get(api_url)
    
    .then(response => {
        response = response.data['cast'];
        for(i = 0; i<response.length;i++){
            each = {}
            each['id'] = response[i].id
            each['name'] = response[i].name
            each['character'] = response[i].character
            if(response[i].profile_path == null){
                continue
            }
            else{
                each['profile_path'] = "https://image.tmdb.org/t/p/w500/"+response[i].profile_path
            }
            nec.push(each)
         }
         res.json(nec);
    })
    .catch(error => console.log('Error', error));

});

//Cast detail endpoints
app.get('/cast/:id' , function(req,res){
    
    const id = req.params.id;
    const api_url = `https://api.themoviedb.org/3/person/`+id+`?api_key=${API_key}&language=en-US&page=1`;
    var nec = [];
    axios.get(api_url)
    
    .then(response => {
        response = response.data;
        each = {}
        each['birthday'] = response.birthday
        if(response.gender == 1){
            each['gender'] = 'Female';
        }
        else if(response.gender == 2){
            each['gender'] = 'Male';
        }
        else{
            each['gender'] = 'Undefined';
        }
        each['name'] = response.name
        each['homepage'] = response.homepage
        if(response.also_known_as.length>0){
            each['also_known_as'] = response.also_known_as
        }
        
        each['known_for_department'] = response.known_for_department
        each['biography'] = response.biography
        each['place_of_birth'] = response.place_of_birth
        each['profile_path'] = "https://image.tmdb.org/t/p/w500"+response.profile_path

        nec.push(each)
        res.json(nec);
    })
    .catch(error => console.log('Error', error));

});

app.get('/cast_external/:id' , function(req,res){
    
    const id = req.params.id;
    const api_url = `https://api.themoviedb.org/3/person/`+id+`/external_ids?api_key=${API_key}&language=en-US&page=1`;
    var nec = [];
    axios.get(api_url)
    
    .then(response => {
        response = response.data;
        each = {}
        
        if(response.imdb_id){
            each['imdb_id'] = "https://www.imdb.com/name/"+response.imdb_id
        }
        if(response.facebook_id){
            each['facebook_id'] = "https://www.facebook.com/"+response.facebook_id
        }
        if(response.instagram_id){
            each['instagram_id'] = "https://www.instagram.com/"+response.instagram_id
        }
        if(response.twitter_id){
            each['twitter_id'] = "https://www.twitter.com/"+response.twitter_id
        }
       
        
        
        nec.push(each)
        res.json(nec);
    })
    .catch(error => console.log('Error', error));

});



const port = process.env.PORT || 8080;
app.listen(port, function(req,res){
    console.log(`Backend Application Listening at ${port}`);
})




// const search_URL = "https://api.themoviedb.org/3/search/multi?api_key=";
// const lan = "&language=en-US&query=";

// let Entire_url = `${search_URL}${API_key}${lan}`;
// // Entire_url = "https://dog.ceo/api/breeds/list/all";
// function search(name){

//     axios.get(Entire_url+name)
//         .then(response => console.log(response))
//         .catch(error => console('Error', error));
    
// }

//////////////////////////////////////////

// const http = require('http');

// const hostname = '127.0.0.1';
// const port = 5000;

// const server = http.createServer((req, res) => {
//     res.statusCode = 200;
//     res.setHeader('Content-Type','text/plain');
//     res.end(search('game'));
// });
// server.listen(port, hostname, ()=> {
//     console.log(`Server running at http://${hostname}:${port}/`);
// });