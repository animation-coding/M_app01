const wrapper = document.querySelector(".wrapper"),
  musicImg = wrapper.querySelector("img"),
  musicName = wrapper.querySelector(".name"),
  musicArtist = wrapper.querySelector(".artist"),
  playPauseBtn = wrapper.querySelector(".play-pause"),
  prevBtn = wrapper.querySelector("#prev"),
  nextBtn = wrapper.querySelector("#next"),
  mainAudio = wrapper.querySelector("#main-audio"),
  progressArea = wrapper.querySelector(".progress-area"),
  progressBar = wrapper.querySelector(".progress-bar");

let musicIndex = Math.floor((Math.random() * allMusic.length) + 1);
isMusicPaused = true;

window.addEventListener("load", () => {
  loadMusic(musicIndex);

});

function loadMusic(indexNumb) {
  musicName.innerText = allMusic[indexNumb - 1].name;
  musicArtist.innerText = allMusic[indexNumb - 1].artist;
  musicImg.src = `assets/images/${allMusic[indexNumb - 1].src}.jpg`;
  mainAudio.src = `assets/songs/${allMusic[indexNumb - 1].src}.mp3`;
}

//play music function
function playMusic() {
  wrapper.classList.add("paused");
  musicImg.classList.add('rotate');
  // playPauseBtn.querySelector("i").innerText = "pause"; @animationcoding
  playPauseBtn.innerHTML = `<i class="fi fi-sr-pause"></i>`;
  mainAudio.play();
}

//pause music function
function pauseMusic() {
  musicImg.classList.remove('rotate');
  wrapper.classList.remove("paused");
  //playPauseBtn.querySelector("i").innerText = "play_arrow";
  playPauseBtn.innerHTML = `<i class="fi fi-sr-play"></i>`;
  mainAudio.pause();
}

//prev music function
function prevMusic() {
  musicIndex--; //decrement of musicIndex by 1
  //if musicIndex is less than 1 then musicIndex will be the array length so the last music play
  musicIndex < 1 ? musicIndex = allMusic.length : musicIndex = musicIndex;
  loadMusic(musicIndex);
  playMusic();
}

//next music function
function nextMusic() {
  musicIndex++; //increment of musicIndex by 1
  //if musicIndex is greater than array length then musicIndex will be 1 so the first music play
  musicIndex > allMusic.length ? musicIndex = 1 : musicIndex = musicIndex;
  loadMusic(musicIndex);
  playMusic();
}

// play or pause button event
playPauseBtn.addEventListener("click", () => {
  const isMusicPlay = wrapper.classList.contains("paused");
  //if isPlayMusic is true then call pauseMusic else call playMusic
  isMusicPlay ? pauseMusic() : playMusic();;
});

//prev music button event
prevBtn.addEventListener("click", () => {
  prevMusic();
});

//next music button event
nextBtn.addEventListener("click", () => {
  nextMusic();
});

// update progress bar width according to music current time
mainAudio.addEventListener("timeupdate", (e) => {
  const currentTime = e.target.currentTime; //getting playing song currentTime
  const duration = e.target.duration; //getting playing song total duration
  let progressWidth = (currentTime / duration) * 100;
  progressBar.style.width = `${progressWidth}%`;

  let musicCurrentTime = wrapper.querySelector(".current-time"),
    musicDuartion = wrapper.querySelector(".max-duration");
  mainAudio.addEventListener("loadeddata", () => {
    // update song total duration
    let mainAdDuration = mainAudio.duration;
    let totalMin = Math.floor(mainAdDuration / 60);
    let totalSec = Math.floor(mainAdDuration % 60);
    if (totalSec < 10) { //if sec is less than 10 then add 0 before it
      totalSec = `0${totalSec}`;
    }
    musicDuartion.innerText = `${totalMin}:${totalSec}`;
  });
  // update playing song current time
  let currentMin = Math.floor(currentTime / 60);
  let currentSec = Math.floor(currentTime % 60);
  if (currentSec < 10) { //if sec is less than 10 then add 0 before it
    currentSec = `0${currentSec}`;
  }
  musicCurrentTime.innerText = `${currentMin}:${currentSec}`;
});




// update playing song currentTime on according to the progress bar width
progressArea.addEventListener("click", (e) => {
  let progressWidth = progressArea.clientWidth; //getting width of progress bar
  let clickedOffsetX = e.offsetX; //getting offset x value
  let songDuration = mainAudio.duration; //getting song total duration

  mainAudio.currentTime = (clickedOffsetX / progressWidth) * songDuration;
  playMusic(); //calling playMusic function
});



//code for what to do after song ended
mainAudio.addEventListener("ended", () => {
  nextMusic();
});


//ac


// Animations
gsap.from(" img, .name , .artist, .song-timer, .progress-area, .controls", {
  opacity: 0,
  duration: 2,
  delay: 1.5,
  y: 25,
  ease: "expo.out",
  stagger: 0.2,
});
gsap.from(" header", {
  opacity: 0,
  duration: 1,
  delay: 1.5,
  y: -25,
  ease: "expo.out",
  stagger: 0.2,
});
gsap.from(".p-now", {
  opacity: 0,
  duration: 1.8,
  delay: 1.5,
  y: -25,
  ease: "expo.out",
  stagger: 0.2,
});