
//playing bg music- maybe a bad UI/UX move(autoplay)
window.addEventListener("DOMContentLoaded", event => {
  const audio = document.querySelector("audio");
  audio.volume = 0.2;
  audio.play();
});

// creating variables from css 
const mainbox = document.querySelector(".mainbox"),
buttonX = mainbox.querySelector(".options .playerX"),
buttonO = mainbox.querySelector(".options .playerO"),
playBoard = document.querySelector(".play-board"),
players = document.querySelector(".players"),
allBox = document.querySelectorAll("section span"),

resultBox = document.querySelector(".result-box"),
wonText = resultBox.querySelector(".won-text"),
replay = resultBox.querySelector("button");

window.onload = ()=>{
    // make sure all the boxes in the board are clickable
    for (let i = 0; i < allBox.length; i++) {
       allBox[i].setAttribute("onclick", "clickedBox(this)");
    }
}

buttonX.onclick = ()=>{
    mainbox.classList.add("hide");
    playBoard.classList.add("show");
}

buttonO.onclick = ()=>{ 
    mainbox.classList.add("hide");
    playBoard.classList.add("show");
    players.setAttribute("class", "players active player");
}

let playerXIcon = "fas fa-times", playerOIcon = "far fa-circle", playerSign = "X", game_run = true;

// user interaction with the board
function clickedBox(element){
    // console.log("Clicked")  Did it to check 
    if(players.classList.contains("player")){
        playerSign = "O";
        element.innerHTML = `<i class="${playerOIcon}"></i>`;
        players.classList.remove("active");
        element.setAttribute("id", playerSign);
    }
    else{
        element.innerHTML = `<i class="${playerXIcon}"></i>`;
        element.setAttribute("id", playerSign);
        players.classList.add("active");
    }
    selectWinner();
    element.style.pointerEvents = "none";
    playBoard.style.pointerEvents = "none";

    // buffer time to pretend that the AI's thinking
    let randomTimeDelay = ((Math.random() * 1000) + 200).toFixed();
    setTimeout(()=>{
        bot(game_run);
    }, randomTimeDelay);
    console.log(playBoard);

}
  
// computer interaction with the board
function bot(){
    let array = [];
    if(game_run){
        playerSign = "O";
        // find the remaining boxes that has not been marked
        for (let i = 0; i < allBox.length; i++) {
            if(allBox[i].childElementCount == 0){
                array.push(i);
            }
        }
        // get random box from remaining tiles
        let randomBox = array[Math.floor(Math.random() * array.length)];
        if(array.length > 0){
            if(players.classList.contains("player")){ 
                playerSign = "X";
                allBox[randomBox].innerHTML = `<i class="${playerXIcon}"></i>`;
                allBox[randomBox].setAttribute("id", playerSign);
                players.classList.add("active"); 
            }
            else{
                allBox[randomBox].innerHTML = `<i class="${playerOIcon}"></i>`;
                players.classList.remove("active");
                allBox[randomBox].setAttribute("id", playerSign);
            }
            selectWinner();
        }
        allBox[randomBox].style.pointerEvents = "none";
        playBoard.style.pointerEvents = "auto";
        playerSign = "X";        
    }
}
// get the sign of a certain box
function idvalue(classname){
    return document.querySelector(".box" + classname).id;
}
// check 3 tiles to see if they are the same
function checkIdSign(val1, val2, val3, sign){ 
    if(idvalue(val1) == sign && idvalue(val2) == sign && idvalue(val3) == sign){
        return true;
    }
    return false;
}
// check winner
function selectWinner(){
    if(checkIdSign(1,2,3,playerSign) || checkIdSign(4,5,6, playerSign) || checkIdSign(7,8,9, playerSign) || checkIdSign(1,4,7, playerSign) || checkIdSign(2,5,8, playerSign) || checkIdSign(3,6,9, playerSign) || checkIdSign(1,5,9, playerSign) || checkIdSign(3,5,7, playerSign)){
        game_run = false;
        bot(game_run);

        // buffer time
        setTimeout(()=>{
            resultBox.classList.add("show");
            playBoard.classList.remove("show");
        }, 700);
        wonText.innerHTML = `Player ${playerSign}<br> won the game! <img src= "https://media.tenor.com/sAWDvQPwGPcAAAAM/mochi-cat.gif" width="110px" height="102px">`;
    }
    else{
        // if the board is full
        if(idvalue(1) != "" && idvalue(2) != "" && idvalue(3) != "" && idvalue(4) != "" && idvalue(5) != "" && idvalue(6) != "" && idvalue(7) != "" && idvalue(8) != "" && idvalue(9) != ""){
            game_run = false;
            bot(game_run);
            
            // buffer time for showing the match has been drawn
            setTimeout(()=>{
                resultBox.classList.add("show");
                playBoard.classList.remove("show");
            }, 700);
            wonText.textContent = "Match has been drawn!";
        }
    }
}

// reload page when replay button is clicked
replay.onclick = () => {
    window.location.reload();
}
