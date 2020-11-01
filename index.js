const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const intro = document.getElementById("intro");
const over = document.getElementById("game-over");
const board = document.getElementById("board");
const count = document.getElementById("counter");
const months = document.getElementById("months");
const win = document.getElementById("win");


const caracter = new Image();
caracter.src = "./imagens/esther2.svg";

const virusImg = new Image ();
virusImg.src = "./imagens/virus.png";

const vaccinImg = new Image ();
vaccinImg.src = "./imagens/vaccin.png";


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
    ctx.drawImage(virusImg, this.x, this.y, 30, 30);
  }
}


class Vaccin extends Component {

  move() {
    this.y += this.speed;
  }

  draw() {
    ctx.drawImage(vaccinImg, this.x, this.y, 20, 30);
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

    if (this.frames2 % 100 === 0) {
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
      cancelAnimationFrame(this.animationId);
    
      over.style.display = "block";
      board.style.display = "none";

       }
  };

  checkVaccinCrash = () => {
    const crash = this.vaccin.some((vaccin) => {
      return this.player.isCrashedWith(vaccin);
    });

  //Incrementa o contador de vacinas
    if (crash){

     this.collection.push('vaccin');
     console.log(this.collection);

     switch (this.collection.length) {
       case 2:
        months.innerText = "feb";
        break;
        case 4:
          months.innerText = "mar";
          break;
          case 6:
            months.innerText = "apr";
            break;
            case 8:
              months.innerText = "may";
              break;
              case 10:
                months.innerText = "jun";
                break;
                case 12:
                  months.innerText = "jul";
                  break;
                  case 14:
                    months.innerText = "aug";
                    break;
                    case 16:
                      months.innerText = "sep";
                      break;
                      case 18:
                        months.innerText = "oct";
                        break;
                        case 20:
                          months.innerText = "nov";
                          break;
                          case 22:
                            months.innerText = "dec";
                          

     };

      if ((this.collection.length - 1) < 10 ){
        count.innerText = '0' + (this.collection.length - 1);
      }else {
        count.innerText = this.collection.length - 1;
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
    ctx.drawImage(caracter, this.x, this.y, this.width, this.height);
  }
}

window.onload = () => {
  document.getElementById("play").onclick = () => {
    startGame();
  };

  function startGame() {

     intro.style.display = "none";
     board.style.display = "block";
      
    const game = new Game(
      new Player(canvas.width / 2 - 40, canvas.height - caracter.height, caracter.width, caracter.height, 0)
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
