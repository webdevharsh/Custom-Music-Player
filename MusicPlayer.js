//Javascriptpro_
//Dont forget to follow me on github,instagram and codepen.
//Initial Reference
let musicImg = document.querySelector('.container .image');
let musicTitle = document.querySelector('.container .title-artist .title');
let musicArtist = document.querySelector('.container .title-artist .artist');
let music = document.querySelector('#music');
let currentTime = document.querySelector('.container .current-time');
let totalTime = document.querySelector('.container .total-time');
let progressArea = document.querySelector('.container .progress-area');
let progressBar = document.querySelector('.container .progress-area .progress-bar');
let loopBtn = document.querySelector('.container .loop-btn');
let prevBtn = document.querySelector('.container .rewind');
let NextBtn = document.querySelector('.container .forward');
let playPauseBtn = document.querySelector('.container .play-pause');
let playPauseIcon = document.querySelector('.container .play-pause i');
let queueBtn = document.querySelector('.container .queue');
let queueBox = document.querySelector('.container .queue-box');
let queueClose = document.querySelector('.container .queue-close');
let allMusicBox = document.querySelector('.music-list')
let musicIndex = 3;

//Load Music On Page Load
window.addEventListener('load',()=>{
  loadMusic(musicIndex);    
})

//Load Music
let loadMusic =(indexNumb)=>{
 musicImg.src = `${allmusic[indexNumb - 1].img}.jpg`;
 musicTitle.innerHTML = `${allmusic[indexNumb - 1].name}`;
 musicArtist.innerHTML = `${allmusic[indexNumb - 1].artist}`;
 music.src = `${allmusic[indexNumb - 1].src}.mp3`;
 playingNow();
}

//Play Pause Btn
playPauseBtn.addEventListener('click',()=>{
 if(playPauseBtn.classList.contains('play')){
   playPauseBtn.classList.remove('play');
   playPauseBtn.classList.add('pause');
   playPauseIcon.innerHTML = 'pause';
   music.play();
 }else{
   playPauseBtn.classList.remove('pause');
   playPauseBtn.classList.add('play');
   playPauseIcon.innerHTML = 'play_arrow';
   music.pause();
 }      
 playingNow();
});

//Calculate Current Time
music.addEventListener('timeupdate', (e)=>{
 let currTime = e.target.currentTime;
 let ttlTime = e.target.duration;
 
 //Progress Bar
 let progressWidth = (currTime / ttlTime) * 100;
 progressBar.style.width = `${progressWidth}%`;
 
 let currMin = Math.floor(currTime / 60);
 let currSec = Math.floor(currTime % 60);
 if(currSec < 10){
   currSec = `0${currSec}`;        
 }
 currentTime.innerHTML = `${currMin}:${currSec}`;
});

music.addEventListener('loadeddata', ()=>{
 let duration = music.duration;
 let ttlMin = Math.floor(duration / 60);
 let ttlSec = Math.floor(duration % 60);
 if(ttlSec < 10){
  ttlSec = `0${ttlSec}`;      
 }
 totalTime.innerHTML = `${ttlMin}:${ttlSec}`;
});

//Change Music Duration On Click
progressArea.addEventListener('click',(e)=>{
 let progressWidth = progressArea.clientWidth;
 let clickedOffsetX = e.offsetX;
 let songDuration = music.duration;
 music.currentTime = (clickedOffsetX / progressWidth) * songDuration;
});

//Next Music On Click
NextBtn.addEventListener('click',()=>{
 musicIndex++;
 musicIndex > allmusic.length ? musicIndex = 1 : musicIndex = musicIndex;
 music.pause();
 loadMusic(musicIndex);
 if(playPauseBtn.classList.contains('pause')){
  playPauseBtn.classList.remove('pause');
  playPauseBtn.classList.add('play');
  playPauseIcon.innerHTML = 'play_arrow';  
  setTimeout(()=>{
   playPauseBtn.classList.add('pause');
   playPauseBtn.classList.remove('play');
   playPauseIcon.innerHTML = 'pause'; 
   music.play();
  },1500)
 }
 progressBar.style.width = '0%';
 playingNow()
});

prevBtn.addEventListener('click',()=>{
 musicIndex--;
 musicIndex < 1 ? musicIndex = allmusic.length : musicIndex = musicIndex;
 music.pause();
 loadMusic(musicIndex);
 if(playPauseBtn.classList.contains('pause')) {
   playPauseBtn.classList.remove('pause');
   playPauseBtn.classList.add('play');
   playPauseIcon.innerHTML = 'play_arrow';
   setTimeout(() => {
     playPauseBtn.classList.add('pause');
     playPauseBtn.classList.remove('play');
     playPauseIcon.innerHTML = 'pause';
     music.play();
   },1500)
 }
 progressBar.style.width = '0%';
 playingNow()
});

//Queue Popup
queueBtn.addEventListener('click',()=>{
 queueBox.style.bottom = '0px';   
});

//Queue Close
queueClose.addEventListener('click',()=>{
 queueBox.style.bottom = '-100%';   
});

//Loop Btn Exchange
 //Loop Btn Exchange
loopBtn.addEventListener('click',()=>{
 let getText = loopBtn.innerHTML;
 switch(getText){
  case 'repeat':
   loopBtn.innerHTML = 'repeat_one';
   break;
   case 'repeat_one':
   loopBtn.innerHTML = 'shuffle';
  break;
  case 'shuffle':
   loopBtn.innerHTML = 'repeat';
   break;
 }
})

//On music ended according to loop
music.addEventListener('ended',()=>{
 let getText = loopBtn.innerHTML;      
switch(getText){     
  case 'repeat':
  music.currentTime = 0;
  NextBtn.click();
  break;
  case 'repeat_one':
  music.currentTime = 0;
  loadMusic(musicIndex)
  music.play();
  break;
  case 'shuffle':
  let randomIndex = Math.floor((Math.random() * allmusic.length) + 1);
  do{
  randomIndex = Math.floor((Math.random() * allmusic.length) + 1);
  }while(musicIndex == randomIndex);
  musicIndex = randomIndex;
  loadMusic(musicIndex)
  music.play();
}
})

//Get All Music List
let allMusic =()=>{
 for(let i=0;i<allmusic.length;i++){
 let allMusic = `<div class="music-list-music" li-index="${i + 1}">
                <img src="${allmusic[i].img}.jpg" alt="">
                <p class="mlm-music-title">${allmusic[i].name}</p>
                <p class="mlm-music-artist">${allmusic[i].artist}</p>
                <audio class="${allmusic[i].src}" src="${allmusic[i].src}.mp3"></audio>
                <span class="mlm-music-time" id="${allmusic[i].src}">2:43</span>
        </div>`;   
  allMusicBox.insertAdjacentHTML('beforeend',allMusic)
 let audioTag = document.querySelector(`.${allmusic[i].src}`);
 let audioduration = document.querySelector(`#${allmusic[i].src}`);
 
 audioTag.addEventListener('loadeddata', ()=>{
   let audioDuration = audioTag.duration;
   let totalMin = Math.floor(audioDuration / 60);
   let totalSec = Math.floor(audioDuration % 60);
   if(totalSec < 10){
      totalSec = `0${totalSec}`;    
   }
   audioduration.innerHTML = `${totalMin}:${totalSec}`;
   audioduration.setAttribute('total-duration',`${totalMin}:${totalSec}`);
 })
 }
}

//Play Particular Song On Click
let playingNow = () => {
        const allMusicTag = document.querySelectorAll('.music-list-music');
        for (let i = 0; i < allmusic.length; i++) {
                let adDura = allMusicTag[i].querySelector('.mlm-music-time');
                if (allMusicTag[i].classList.contains('playing')) {
                        allMusicTag[i].classList.remove('playing');
                        let adDuration = adDura.getAttribute('total-duration')
                        adDura.innerHTML = adDuration;
                }
                if (allMusicTag[i].getAttribute('li-index') == musicIndex) {
                        allMusicTag[i].classList.add('playing');
                        adDura.innerHTML = 'Playing';
                }
                allMusicTag[i].setAttribute('onclick', 'clicked(this)')
        }
}

let clicked = (element) => {
  let getMusicIndex = element.getAttribute('li-index');
  musicIndex = getMusicIndex;
  loadMusic(musicIndex)
  music.play();
  playingNow();
  playPauseBtn.classList.remove('play');
  playPauseBtn.classList.add('paused');
  playPauseIcon.innerHTML = 'pause';
}

allMusic();
playingNow();
