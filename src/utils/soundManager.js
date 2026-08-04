import move from "../assets/sounds/move.mp3";
import capture from "../assets/sounds/capture.mp3";
import check from "../assets/sounds/check.mp3";
import checkmate from "../assets/sounds/checkmate.mp3";
import promote from "../assets/sounds/promote.mp3";

const sounds = {
    move: new Audio(move),
    capture: new Audio(capture),
    check: new Audio(check),
    checkmate: new Audio(checkmate),
    promote: new Audio(promote),
};

export function playSound(type) {
    console.log("Playing:", type);

    const audio = sounds[type];

    if (!audio) {
        console.log("Sound not found");
        return;
    }

    audio.currentTime = 0;

    audio.play()
        .then(() => console.log("Played"))
        .catch(err => console.log(err));
}