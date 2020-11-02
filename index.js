const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const intro = document.getElementById("intro");
const over = document.getElementById("game-over");
const board = document.getElementById("board");
const count = document.getElementById("counter");
const months = document.getElementById("months");
const win = document.getElementById("win");
const choice = document.getElementById("caracterChoice");

const caracter = new Image();
caracter.src = "./imagens/esther2.svg";

const caracter2 = new Image();
caracter2.src = "./imagens/Tim.svg";

const virusImg = new Image ();
virusImg.src = "./imagens/virus.svg";

const vaccinImg = new Image ();
vaccinImg.src = "./imagens/vaccin.png";

const canvasBackground = new Image();
canvasBackground.src = "./imagens/canvasback2.svg";

const cardiAudio = new Audio();
cardiAudio.src ="./audio/cardi-b-coronavirus.mp3";
cardiAudio.volume = 0.3;

ctx.imageSmoothingEnabled = true;
ctx.imageSmoothingQuality = 'high';

class Component {
  constructor(x, y, width, height, speed) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = speed;
  }

  left() {
    return this.x;
  }

  right() {
    return this.x + this.width;
  }

  top() {
    return this.y;
  }

  bottom() {
    return this.y + this.height;
  }

  isCrashedWith(obj) {
    const condition = !(
      this.bottom() < obj.top() ||
      this.top() > obj.bottom() ||
      this.right() < obj.left() ||
      this.left() > obj.right()
    );

    return condition;
  }
}

class Virus extends Component {
  move() {
    this.y += this.speed;
  }

  draw() {
    ctx.drawImage(virusImg, this.x, this.y, 35, 35);
  }
}


class Vaccin extends Component {

  move() {
    this.y += this.speed;
  }

  draw() {
    ctx.drawImage(vaccinImg, this.x, this.y, 17, 30);
  }

  
}

class Game {
  constructor(player) {
    this.player = player;
    this.animationId;
    this.frames = 0;
    this.frames2 = 0;
    this.virus = [];
    this.vaccin = [];
    this.collection = [];
  }

  updateGame = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#1C212E";  
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(canvasBackground, 0, 0, canvasBackground.width, canvasBackground.height);

    this.player.move();
    this.player.draw();


    this.updateVirus();

    this.updateVaccin();
  
    this.checkVaccinCrash();

    this.animationId = requestAnimationFrame(this.updateGame);

    this.checkGameOver();

    this.checkGameWin();

  };

  updateVirus = () => {
    this.frames2++;

    this.virus.map((virus) => {
      virus.move();
      virus.draw();
    });

    if (this.frames2 % 67 === 0) {
      let y = 0;

      let minX = 0;
      let maxX = canvas.width - 20;
      let x = Math.floor(Math.random() * (maxX - minX + 1) + minX);

      const virus = new Virus(x, y, 20, 20, 3);

      this.virus.push(virus);
    }
  };

  updateVaccin = () => {
    this.frames++;

    this.vaccin.map((vaccin) => {
      vaccin.move();
      vaccin.draw();
    });

    if (this.frames % 80 === 0) {
      let y = 0;

      let minX = 5;
      let maxX = canvas.width - 30;
      let x = Math.floor(Math.random() * (maxX - minX + 1) + minX);

      const vaccin = new Vaccin(x, y, 10, 20, 3);

      this.vaccin.push(vaccin);
    }
  };

  checkGameOver = () => {
    const crashed = this.virus.some((virus) => {
      return this.player.isCrashedWith(virus);
    });

    if (crashed) {
      cardiAudio.play();
      cancelAnimationFrame(this.animationId);
     
      over.style.display = "block";
      board.style.display = "none";
     

       }
  };

  checkVaccinCrash = () => {
    
    const crash = this.vaccin.some((vaccin) => {
      return this.player.isCrashedWith(vaccin);
    });

  //Incrementar o contador de vacinas
    if (crash){
 
      let actualVaccin = this.vaccin.splice(0,1)[0];
      let collided = actualVaccin.isCrashedWith(this.player);
    
      if (collided) {
        this.collection.push(actualVaccin);
      };

     switch (this.collection.length) {
       case 3:
        months.innerText = "feb";
        break;
        case 5:
          months.innerText = "mar";
          break;
          case 7:
            months.innerText = "apr";
            break;
            case 9:
              months.innerText = "may";
              break;
              case 11:
                months.innerText = "jun";
                break;
                case 13:
                  months.innerText = "jul";
                  break;
                  case 15:
                    months.innerText = "aug";
                    break;
                    case 17:
                      months.innerText = "sep";
                      break;
                      case 19:
                        months.innerText = "oct";
                        break;
                        case 21:
                          months.innerText = "nov";
                          break;
                          case 23:
                            months.innerText = "dec";
                          

     };

      if ((this.collection.length) < 10 ){
        count.innerText = '0' + (this.collection.length);
      }else {
        count.innerText = this.collection.length;
      }; 
      };
   
  
   };

   checkGameWin = () => {
if (this.collection.length === 25){
  cancelAnimationFrame(this.animationId);
  win.style.display = "block";
  board.style.display = "none";
  over.style.display = "none";
}
   };
  

}

class Player extends Component {
  move() {
    this.x += this.speed;

    if (this.x <= 0) {
      this.x = 0;
    }

    if (this.x >= canvas.width - 80) {
      this.x = canvas.width - 80;
    }
  }
  
  draw() {
    ctx.imageSmoothingQuality = "high";
    ctx.imageSmoothingEnabled = true;  
    ctx.drawImage(caracter, this.x, this.y, 80, 137);
    
  }

}

class Player2 extends Component {
  move() {
    this.x += this.speed;

    if (this.x <= 0) {
      this.x = 0;
    }

    if (this.x >= canvas.width - 80) {
      this.x = canvas.width - 80;
    }
  }
  
  draw() {
      ctx.imageSmoothingQuality = "high";
    ctx.imageSmoothingEnabled = true;  
    ctx.drawImage(caracter2, this.x, this.y, 80, 137);
  }

}

window.onload = () => {
  document.getElementById("play").onclick = () => {
    caracterDisplay();
  };

  function caracterDisplay(){
    intro.style.display = "none";
    choice.style.display = "block";
  };

  document.getElementById("playWithTim").onclick = () => {
    startGame(Player2);
  };

  document.getElementById("playWithEsther").onclick = () => {
    startGame(Player);
  };

  function startGame(choosenCaracter) {

     choice.style.display = "none";
     board.style.display = "block";
      
    const game = new Game(
      new choosenCaracter(canvas.width / 2 - 40, canvas.height - 137, 80, 137, 0)
    );

    game.updateGame();

    document.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft") {
        game.player.speed = -4;
      }

      if (event.key === "ArrowRight") {
        game.player.speed = 4;
      }
    });

    document.addEventListener("keyup", () => {
      game.player.speed = 0;
    });
  }
};
