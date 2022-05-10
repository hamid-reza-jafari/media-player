const input = document.getElementById("username");
const inputMax = input.getAttribute("maxlength");
let numSpan = document.querySelector(".counter");

input.addEventListener("keyup", (e) => {
    console.log(inputMax)
    numSpan.innerHTML = inputMax - e.target.value.length
})

const back = document.getElementById("back")
const rewind = document.getElementById("rewind")
const play = document.getElementById("play")
const forward5 = document.getElementById("forward-5")
const forward = document.getElementById("forward")
const music = document.getElementById("music")
let range = document.querySelector(".form-range")
let alaramInput = document.getElementById("alarm")
let musicTimer = document.getElementById("music-timer")
let musicDur = document.getElementById("music-dur")
let adresses = ["media/didi.mp3", "media/sound.mp3", "media/parishab.mp3", "media/safe-house.mp3"]

play.addEventListener("click", function (e) {
    if (play.className.includes("ri-play-circle-fill")) {
        play.classList.remove("ri-play-circle-fill")
        play.classList.add("ri-pause-circle-fill")
        alaramInput.style.display = "block"
        play.title = "pause"
        music.play()
    } else if (play.className.includes("ri-pause-circle-fill")) {
        play.classList.remove("ri-pause-circle-fill")
        play.classList.add("ri-play-circle-fill")
        play.title = "again play"
        music.pause()
    }
    let num = music.getAttribute("src").length - 4
    alaramInput.value = music.getAttribute("src").slice(6, num)
})

forward5.addEventListener("click", (e) => {
    music.currentTime = music.currentTime + 5
})
rewind.addEventListener("click", (e) => {
    music.currentTime = music.currentTime - 5
})

forward.addEventListener("click", (e) => {

    music.setAttribute("src", adresses[adresses.indexOf(music.getAttribute("src")) + 1])

    if (adresses[adresses.indexOf(music.getAttribute("src"))] === undefined) {
        music.setAttribute("src", adresses[0])
    }

    let num = music.getAttribute("src").length - 4
    alaramInput.value = music.getAttribute("src").slice(6, num)

    if (play.className.includes("ri-pause-circle-fill")) {
        play.classList.remove("ri-play-circle-fill")
        play.classList.add("ri-pause-circle-fill")
        music.play()
    } else if (play.className.includes("ri-play-circle-fill")) {
        play.classList.remove("ri-pause-circle-fill")
        play.classList.add("ri-play-circle-fill")
        music.pause()
    }
})

back.addEventListener("click", (e) => {
    music.setAttribute("src", adresses[adresses.indexOf(music.getAttribute("src")) - 1])

    if (music.getAttribute("src", adresses[0])) {
        music.setAttribute("src", adresses[adresses.length - 1])
    }

    let num = music.getAttribute("src").length - 4
    alaramInput.value = music.getAttribute("src").slice(6, num)

    if (play.className.includes("ri-pause-circle-fill")) {
        play.classList.remove("ri-play-circle-fill")
        play.classList.add("ri-pause-circle-fill")
        music.play()
    } else if (play.className.includes("ri-play-circle-fill")) {
        play.classList.remove("ri-pause-circle-fill")
        play.classList.add("ri-play-circle-fill")
        music.pause()
    }
})


music.addEventListener("playing", function (e) {
    range.max = Math.floor(music.duration)
    range.value = Math.floor(music.currentTime)
    let timerMusic = setInterval(() => {
        range.value = Math.floor(music.currentTime)
        if (Math.floor(music.currentTime) >= Math.floor(music.duration)) {
            play.classList.remove("ri-pause-circle-fill")
            play.classList.add("ri-play-circle-fill")
            clearInterval(timerMusic)
        }
    }, 1000)
})

// music timer and duration setting
music.addEventListener("playing", function () {

    // for music duration
    if (Math.floor(music.duration) < 10) {
        musicDur.innerHTML = "00:0" + Math.floor(music.duration)
    } else if (Math.floor(music.duration) >= 10 && Math.floor(music.duration) < 60) {
        musicDur.innerHTML = "00:" + Math.floor(music.duration)
    } else if (Math.floor(music.duration) >= 60) {
        let min = Math.floor(Math.floor(music.duration % 60))
        if (min < 10) {
            min = "0" + Math.floor(Math.floor(music.duration % 60))
        }
        musicDur.innerHTML = "0" + Math.floor(music.duration / 60) + ":" + min
    }
    // end music duration

    // for music time playing
    let timerMusic = setInterval(() => {
        if (Math.floor(music.currentTime) < 10) {
            musicTimer.innerHTML = "00:0" + Math.floor(music.currentTime)
        } else if (Math.floor(music.currentTime) >= 10 && Math.floor(music.currentTime) < 60) {
            musicTimer.innerHTML = "00:" + Math.floor(music.currentTime)
        } else if (Math.floor(music.currentTime) >= 60) {
            let min = Math.floor(Math.floor(music.currentTime % 60))
            if (min < 10) {
                min = "0" + Math.floor(Math.floor(music.currentTime % 60))
            }
            musicTimer.innerHTML = "0" + Math.floor(music.currentTime / 60) + ":" + min
        }
    }, 1000)
    // for music time playing
})
// end music timer and duration setting
range.addEventListener("click", (e) => {
    music.currentTime = e.target.value
    music.play()
})

