function getColor(el) {
    let playerNum = el.parentNode.parentNode.className.split('-')[1];
    let color;
    switch (playerNum) {
        case "1":
            {
                color = "red";
                break;
            }
        case "2":
            {
                color = "blue";
                break;
            }
        case "3":
            {
                color = "limegreen";
                break;
            }
        case "4":
            {
                color = "gold";
                break;
            }
    }
    return color;
}

export default function ui(game) {
    let addPlayerBtns = document.getElementsByClassName('add-player');
    for (let i = 0; i < addPlayerBtns.length; i++) {
        addPlayerBtns[i].addEventListener('click', e => {
            e.target.parentNode.style.display = "none";
            game.addBike(getColor(e.target));
        });
    }
    document.querySelector(".start-game").addEventListener("click", (e) => {
        game.start();
        e.target.style.display = "none";
        document.getElementById("players-wrapper").style.display = "none";
    });
    let kbBtns = document.querySelectorAll('button[class^="turn"]')
    for (let i = 0; i < kbBtns.length; i++) {
        kbBtns[i].addEventListener("click", e => {
            let overlay = document.createElement('div');
            overlay.classList.add('press-key');
            overlay.innerText = "Wciśnij klawisz";
            document.body.appendChild(overlay);
            let color = getColor(e.target);
            document.onkeypress = e => {
                e.preventDefault();
                if (game.setPlayerKey(color, e.code)) {
                    kbBtns[i].innerText = e.code;
                }
                document.body.removeChild(overlay);
                document.onkeypress = () => {}
            }
        })
    }
}