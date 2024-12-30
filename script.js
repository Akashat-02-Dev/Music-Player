console.log("Welcome to Spotify");
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let volumeControl = document.getElementById('volumeControl');
let ProgressBar = document.getElementById('ProgressBar');
let gif = document.getElementById('gif');
let mainSongName = document.getElementById('mainSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let songs = [
    {songName: "Warriyo - Mortals [NCS Release]", filePath: "songs/1.mp3", coverPath: "covers/1.jpg"},
    {songName: "Cielo - Huma-Huma", filePath: "songs/2.mp3", coverPath: "covers/2.jpg"},
    {songName: "DEAF KEV - Invincible [NCS Release]-320k", filePath: "songs/3.mp3", coverPath: "covers/3.jpg"},
    {songName: "Different Heaven & EH!DE - My Heart [NCS Release]", filePath: "songs/4.mp3", coverPath: "covers/4.jpg"},
    {songName: "Janji-Heroes-Tonight-feat-Johnning-NCS-Release", filePath: "songs/5.mp3", coverPath: "covers/5.jpg"},
    {songName: "Rabba - Salam-e-Ishq", filePath: "songs/2.mp3", coverPath: "covers/6.jpg"},
    {songName: "Sakhiyaan - Salam-e-Ishq", filePath: "songs/2.mp3", coverPath: "covers/7.jpg"},
    {songName: "Bhula Dena - Salam-e-Ishq", filePath: "songs/2.mp3", coverPath: "covers/8.jpg"},
    {songName: "Tumhari Kasam - Salam-e-Ishq", filePath: "songs/2.mp3", coverPath: "covers/9.jpg"},
    {songName: "Na Jaana - Salam-e-Ishq", filePath: "songs/4.mp3", coverPath: "covers/10.jpg"},
]
songItems.forEach((element, i)=>{ 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
})
audioElement.volume = volumeControl.value / 100;
volumeControl.addEventListener('input', () => {
    audioElement.volume = volumeControl.value / 100;
});
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa fa-play');
        masterPlay.classList.add('fa-solid fa-pause');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-solid fa-pause');
        masterPlay.classList.add('fa fa-play');
        gif.style.opacity = 0;
    }
})
audioElement.addEventListener('timeupdate', ()=>{ 
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100); 
    ProgressBar.value = progress;
})
ProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = ProgressBar.value * audioElement.duration/100;
})
const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa fa-pause');
        element.classList.add('fa fa-play');
    })
}
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{ 
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa fa-play');
        e.target.classList.add('fa fa-pause');
        audioElement.src = `songs/${songIndex+1}.mp3`;
        mainSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa fa-play');
        masterPlay.classList.add('fa fa-pause');
    })
})
document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=9){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    mainSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa fa-play');
    masterPlay.classList.add('fa fa-pause');

})
document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    mainSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa fa-play');
    masterPlay.classList.add('fa fa-pause');
})

let songDropdown = document.getElementById('songDropdown');
songs.forEach((song, index) => {
    let option = document.createElement('option');
    option.value = index;
    option.textContent = song.songName;
    songDropdown.appendChild(option);
});
document.getElementById('addSong').addEventListener('click', () => {
    let selectedSongIndex = songDropdown.value;
    let playlistName = document.getElementById('playlistName').value;

    if (selectedSongIndex !== "" && playlistName) {
        let playlist = document.getElementById('playlist');
        let listItem = document.createElement('li');
        listItem.textContent = songs[selectedSongIndex].songName;
        playlist.appendChild(listItem);
    } else {
        alert("Please select a song and enter a playlist name.");
    }
});

document.getElementById('removeSong').addEventListener('click', () => {
    let playlist = document.getElementById('playlist');
    if (playlist.lastChild) {
        playlist.removeChild(playlist.lastChild);
    } else {
        alert("No songs to remove.");
    }
});