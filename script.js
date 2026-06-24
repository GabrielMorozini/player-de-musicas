const songName = document.getElementById('song-name');
const bandName = document.getElementById('band-name');
const song = document.getElementById('audio');
const cover = document.getElementById('cover');
const play = document.getElementById('play');
const next = document.getElementById('next');
const previous = document.getElementById('previous');
const likeButton = document.getElementById('like');
const currentProgress = document.getElementById('current-progress');
const progressContainer = document.getElementById('progress-container');
const shuffleButton = document.getElementById('shuffle');
const repeatButton = document.getElementById('repeat');
const songTime = document.getElementById('song-time');
const totalTime = document.getElementById('total-time');

const troll = {
  songName: 'Trollhammaren',
  artist: 'Finntroll',
  file: 'Trollhammaren',
  liked: false,
  bg: 'linear-gradient(180deg, #8e6d5d, #1d1612)'
};
const twilight = {
  songName: 'Twilight of the Thunder God',
  artist: 'Amon Amarth',
  file: 'Twilight_of_the_Thunder_God',
  liked: true,
  bg: 'linear-gradient(180deg, #a4b6ca, #181a1c)'
};
const ennen = {
  songName: "Ennen",
  artist: 'Korpiklaani',
  file: 'Ennen',
  liked: false,
  bg: 'linear-gradient(180deg, #78592f, #181209)'
};

const vulgaris = {
  songName: "Vulgaris Magistralis",
  artist: 'heidevolk',
  file: 'Vulgaris',
  liked: false,
  bg: 'linear-gradient(180deg, #bdd4ce, #151817)'
};

const tumman = {
  songName: "Heathen Throne Longest journey",
  artist: 'Ensiferum',
  file: 'Tumman',
  liked: false,
  bg: 'linear-gradient(180deg, #7a97cd, #0e131d)'
};

const diggy = {
  songName: "Diggy Diggy Hole",
  artist: 'Wind Rose',
  file: 'Diggy',
  liked: false,
  bg: 'linear-gradient(180deg, #e3e1e2, #131313)'
};


const mongol = {
  songName: "The Wolf Totem",
  artist: 'The Hu',
  file: 'Mongol',
  liked: false,
  bg: 'linear-gradient(180deg, #292c2b, #131313)'
};

let isPlaying = false;
let isShuffled = false;
let repeatOn = false;
const originalPlaylist = JSON.parse(localStorage.getItem('playlist')) ?? [
  troll,
  diggy,
  ennen,
  mongol,
  tumman,
  twilight,
  vulgaris
];
let sortedPlaylist = [...originalPlaylist];
let index = 0;

function playSong() {
  play.querySelector('.bi').classList.remove('bi-play-circle-fill');
  play.querySelector('.bi').classList.add('bi-pause-circle-fill');
  song.play();
  isPlaying = true;
}

function pauseSong() {
  play.querySelector('.bi').classList.add('bi-play-circle-fill');
  play.querySelector('.bi').classList.remove('bi-pause-circle-fill');
  song.pause();
  isPlaying = false;
}

function playPauseDecider() {
  if (isPlaying === true) {
    pauseSong();
  } else {
    playSong();
  }
}

function likeButtonRender() {
  if (sortedPlaylist[index].liked === true) {
    likeButton.querySelector('.bi').classList.remove('bi-heart');
    likeButton.querySelector('.bi').classList.add('bi-heart-fill');
    likeButton.classList.add('button-active');
  } else {
    likeButton.querySelector('.bi').classList.add('bi-heart');
    likeButton.querySelector('.bi').classList.remove('bi-heart-fill');
    likeButton.classList.remove('button-active');
  }
}

function initializeSong() {
  cover.src = `images/${sortedPlaylist[index].file}.webp`;
  song.src = `songs/${sortedPlaylist[index].file}.mp3`;
  songName.innerText = sortedPlaylist[index].songName;
  bandName.innerText = sortedPlaylist[index].artist;
  document.body.style.background = sortedPlaylist[index].bg;
  likeButtonRender();
}

function previousSong() {
  if (index === 0) {
    index = sortedPlaylist.length - 1;
  } else {
    index -= 1;
  }
  initializeSong();
  playSong();
}

function nextSong() {
  if (index === sortedPlaylist.length - 1) {
    index = 0;
  } else {
    index += 1;
  }
  initializeSong();
  playSong();
}

function updateProgress() {
  const barWidth = (song.currentTime / song.duration) * 100;
  currentProgress.style.setProperty('--progress', `${barWidth}%`);
  songTime.innerText = toHHMMSS(song.currentTime);
}

function jumpTo(event) {
  const width = progressContainer.clientWidth;
  const clickPosition = event.offsetX;
  const jumpToTime = (clickPosition / width) * song.duration;
  song.currentTime = jumpToTime;
}

function shuffleArray(preShuffleArray) {
  const size = preShuffleArray.length;
  let currentIndex = size - 1;
  while (currentIndex > 0) {
    let randomIndex = Math.floor(Math.random() * size);
    let aux = preShuffleArray[currentIndex];
    preShuffleArray[currentIndex] = preShuffleArray[randomIndex];
    preShuffleArray[randomIndex] = aux;
    currentIndex -= 1;
  }
}

function shuffleButtonClicked() {
  if (isShuffled === false) {
    isShuffled = true;
    const currentSong = sortedPlaylist[index]; // guarda a música atual
    shuffleArray(sortedPlaylist);
    index = sortedPlaylist.indexOf(currentSong); // recalcula a posição
    shuffleButton.classList.add('button-active');
  } else {
    const currentSong = sortedPlaylist[index];
    isShuffled = false;
    sortedPlaylist = [...originalPlaylist];
    index = sortedPlaylist.indexOf(currentSong); // idem ao desfazer o shuffle
    shuffleButton.classList.remove('button-active');
  }
}

function repeatButtonClicked() {
  if (repeatOn === false) {
    repeatOn = true;
    repeatButton.classList.add('button-active');
  } else {
    repeatOn = false;
    repeatButton.classList.remove('button-active');
  }
}

function nextOrRepeat() {
  if (repeatOn === false) {
    nextSong();
  } else {
    playSong();
  }
}

function toHHMMSS(originalNumber) {
  let hours = Math.floor(originalNumber / 3600);
  let min = Math.floor((originalNumber - hours * 3600) / 60);
  let secs = Math.floor(originalNumber - hours * 3600 - min * 60);

  console.log('hours: ', hours);

  return `${hours !== 0 ? hours.toString().padStart(2, '0') + ':' : ''}${min
    .toString()
    .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

function updateTotalTime() {
  totalTime.innerText = toHHMMSS(song.duration);
}

function likeButtonClicked() {
  if (sortedPlaylist[index].liked === false) {
    sortedPlaylist[index].liked = true;
  } else {
    sortedPlaylist[index].liked = false;
  }
  likeButtonRender();
  localStorage.setItem('playlist', JSON.stringify(originalPlaylist));
}

initializeSong();

play.addEventListener('click', playPauseDecider);
previous.addEventListener('click', previousSong);
next.addEventListener('click', nextSong);
song.addEventListener('timeupdate', updateProgress);
song.addEventListener('ended', nextOrRepeat);
song.addEventListener('loadedmetadata', updateTotalTime);
progressContainer.addEventListener('click', jumpTo);
shuffleButton.addEventListener('click', shuffleButtonClicked);
repeatButton.addEventListener('click', repeatButtonClicked);
likeButton.addEventListener('click', likeButtonClicked);
