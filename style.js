const adQueue = [
    {
        youtubeId: "7dnbVI1dGqg",
        duration: 10,
        targetUrl: "https://example.com/1"
    },
    {
        youtubeId: "-_K_XAMtGYc",
        duration: 15,
        targetUrl: "https://example.com/2"
    },
    {
        youtubeId: "z3yeUDNnxTw",
        duration: 50,
        targetUrl: "https://example.com/3"
    }
];

let currentAd = 0;
let countdown;
let totalRemaining = 0;

const frame = document.getElementById("ad-frame");
const timer = document.getElementById("timer");
const count = document.getElementById("ad-count");
const container = document.getElementById("ad-container");
const content = document.getElementById("main-website-content");

/* Calculate Total Remaining */
function getRemaining(index, secLeft){
    let total = secLeft;
    for(let i=index+1;i<adQueue.length;i++){
        total += adQueue[i].duration;
    }
    return total;
}

/* Play Ad */
function playAd(index){

    if(index >= adQueue.length){
        exitAds();
        return;
    }

    count.innerText = index + 1;

    const ad = adQueue[index];

frame.src =
  "https://www.youtube.com/embed/" +
  ad.youtubeId +
  "?autoplay=1&mute=" + (isMuted ? 1 : 0) +
  "&controls=0&rel=0&modestbranding=1";

    let sec = ad.duration;

    timer.innerText = getRemaining(index, sec);

    clearInterval(countdown);

    countdown = setInterval(() => {
        sec--;
        timer.innerText = getRemaining(index, sec);

        if(sec <= 0){
            clearInterval(countdown);
            currentAd++;
            playAd(currentAd);
        }
    },1000);
}

let isMuted = true;
const soundBtn = document.getElementById("sound-toggle");

function updateVideoSound() {
    const ad = adQueue[currentAd];

    frame.src =
        "https://www.youtube.com/embed/" +
        ad.youtubeId +
        "?autoplay=1&mute=" + (isMuted ? 1 : 0) +
        "&controls=0&rel=0&modestbranding=1";

    document.getElementById("sound-icon").innerText =
        isMuted ? "🔇" : "🔊";

    document.getElementById("sound-text").innerText =
        isMuted ? "Unmute" : "Mute";
}

/* Button Click */
soundBtn.onclick = () => {
    isMuted = !isMuted;
    updateVideoSound();
};

/* Exit Ads */
function exitAds(){
    container.classList.add("fade-out");

    setTimeout(()=>{
        container.remove();
        document.body.style.overflow = "auto";
        content.style.opacity = "1";
    },800);
}

/* Click Ad */
frame.addEventListener("click", ()=>{
    window.open(adQueue[currentAd].targetUrl, "_blank");
});

/* Start */
playAd(currentAd);

/* Popu-up Close */
function closePopup() {
    document.getElementById("popup").style.display = "none";
  }
  
/* Audio enable */
function enableAudio() {
      const video = document.getElementById("bgVideo");video.muted = false;
      video.play();
}
