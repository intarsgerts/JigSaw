var canvas;
var stage;

var bgImg = new Image();
var bg;

var mainImg = new Image();
var main;
var startBImg = new Image();
var startB;
var creditsBImg = new Image();
var creditsB;

var TitleView = new Container();

var creditsViewImg = new Image();
var credits;


var playerImg = new Image();
var player;
var ballImg = new Image();
var ball;
var cpuImg = new Image();
var cpu;
var winImg = new Image();
var win;
var loseImg = new Image();
var lose;

var playerScore;
var cpuScore;


var xSpeed = 5;
var ySpeed = 5;
var gfxLoaded = 0;
var tkr = new Object;

function Main()
{
	
	canvas = document.getElementById('Pong');
  	stage = new Stage(canvas);
  		
  	stage.mouseEventsEnabled = true;
  	

	SoundJS.addBatch([
		{name:'hit', src:'./sounds/hit.mp3', instances:1},
		{name:'playerScore', src:'./sounds/playerScore.mp3', instances:1},
		{name:'enemyScore', src:'./sounds/enemyScore.mp3', instances:1},
		{name:'wall', src:'./sounds/wall.mp3', instances:1}]);

  		
  	bgImg.src = './img/bg.png';
  	bgImg.name = 'bg';
  	bgImg.onload = loadGfx;
  	
  	mainImg.src = './img/main.png';
  	mainImg.name = 'main';
  	mainImg.onload = loadGfx;
	
	startBImg.src = './img/startB.png';
	startBImg.name = 'startB';
	startBImg.onload = loadGfx;
	
	creditsBImg.src = './img/creditsB.png';
	creditsBImg.name = 'creditsB';
	creditsBImg.onload = loadGfx;
	
	creditsViewImg.src = './img/credits.png';
	creditsViewImg.name = 'credits';
	creditsViewImg.onload = loadGfx;
	
	playerImg.src = './img/paddle.png';
	playerImg.name = 'player';
	playerImg.onload = loadGfx;
	
	ballImg.src = './img/ball.png';
	ballImg.name = 'ball';
	ballImg.onload = loadGfx;
	
	cpuImg.src = './img/paddle.png';
	cpuImg.name = 'cpu';
	cpuImg.onload = loadGfx;
	
	winImg.src = './img/win.png';
	winImg.name = 'win';
	winImg.onload = loadGfx;
	
	loseImg.src = './img/lose.png';
	loseImg.name = 'lose';
	loseImg.onload = loadGfx;

	
	Ticker.setFPS(35);
	Ticker.addListener(stage);
}

function loadGfx(e)
{
	if(e.target.name = 'bg'){bg = new Bitmap(bgImg);}
	if(e.target.name = 'main'){main = new Bitmap(mainImg);}
	if(e.target.name = 'startB'){startB = new Bitmap(startBImg);}
	if(e.target.name = 'creditsB'){creditsB = new Bitmap(creditsBImg);}
	if(e.target.name = 'credits'){credits = new Bitmap(creditsViewImg);}
	if(e.target.name = 'player'){player = new Bitmap(playerImg);}
	if(e.target.name = 'ball'){ball = new Bitmap(ballImg);}
	if(e.target.name = 'cpu'){cpu = new Bitmap(cpuImg);}
	if(e.target.name = 'win'){win = new Bitmap(winImg);}
	if(e.target.name = 'lose'){lose = new Bitmap(loseImg);}
	
	gfxLoaded++;
	
	if(gfxLoaded == 10)
	{
		addTitleView();
	}
}


function addTitleView()
{
	startB.x = 205 - 31.5;
	startB.y = 150;
	startB.name = 'startB';
	
	creditsB.x = 201 - 42;
	creditsB.y = 210;
	
	TitleView.addChild(main, startB, creditsB);
	stage.addChild(bg, TitleView);
	stage.update();

	
	startB.onPress = tweenTitleView;
	creditsB.onPress = showCredits;
}

function showCredits()
{
		
	credits.x = 480;
		
	stage.addChild(credits);
	stage.update();
	Tween.get(credits).to({x:0}, 300);
	credits.onPress = hideCredits;
}


function hideCredits(e)
{
	Tween.get(credits).to({x:480}, 300).call(rmvCredits);
}


function rmvCredits()
{
	stage.removeChild(credits);
}


function tweenTitleView()
{		
		
	Tween.get(TitleView).to({y:-320}, 300).call(addGameView);
}


function addGameView()
{
	
	stage.removeChild(TitleView);
	TitleView = null;
	credits = null;

	
	player.x = 2;
	player.y = 160 - 37.5;
	cpu.x = 490 - 25;
	cpu.y = 160 - 37.5;
	ball.x = 240 - 15;
	ball.y = 160 - 15;

	
	playerScore = new Text('0', 'bold 20px Arial', '#FFFFFF');
	playerScore.maxWidth = 1000;
	playerScore.x = 211;
	playerScore.y = 20;
	
	cpuScore = new Text('0', 'bold 20px Arial', '#FFFFFF');
	cpuScore.maxWidth = 1000;
	cpuScore.x = 262;
	cpuScore.y = 20;
	
	stage.addChild(playerScore, cpuScore, player, cpu, ball);
	stage.update();

	
	bg.onPress = startGame;
}


function movePaddle(e)
{
	
	player.y = e.stageY;
}


function startGame(e)
{
	bg.onPress = null;
	stage.onMouseMove = movePaddle;
	
	Ticker.addListener(tkr, false);
	tkr.tick = update;
}


function reset()
{
	ball.x = 240 - 15;
	ball.y = 160 - 15;
	player.y = 160 - 37.5;
	cpu.y = 160 - 37.5;
	
	stage.onMouseMove = null;
	Ticker.removeListener(tkr);
	bg.onPress = startGame;
}


function update()
{

	ball.x = ball.x + xSpeed;
	ball.y = ball.y + ySpeed;

	
	if(cpu.y < ball.y) {
		cpu.y = cpu.y + 7.5;
	}
	else if(cpu.y > ball.y) {
		cpu.y = cpu.y - 7.5;
	}


	if((ball.y) < 0) { ySpeed = -ySpeed; SoundJS.play('wall');};
	if((ball.y + (40)) > 320) { ySpeed = -ySpeed; SoundJS.play('wall');};

	
	if((ball.x) < 0)
	{
		xSpeed = -xSpeed;
		cpuScore.text = parseInt(cpuScore.text + 1);
		reset();
		SoundJS.play('enemyScore');
	}

	
	if((ball.x + (40)) > 480)
	{
		xSpeed = -xSpeed;
		playerScore.text = parseInt(playerScore.text + 1);
		reset();
		SoundJS.play('playerScore');
	}

	
	if(ball.x + 40 > cpu.x && ball.x + 40 < cpu.x + 15 && ball.y >= cpu.y && ball.y < cpu.y + 100)
	{
		xSpeed *= -1;
		SoundJS.play('hit');
	}

	
	if(ball.x <= player.x + 15 && ball.x > player.x && ball.y >= player.y && ball.y < player.y + 100)
	{
		xSpeed *= -1;
		SoundJS.play('hit');
	}

	
	if(player.y >= 480)
	{
		player.y = 480;
	}

	
	if(playerScore.text == '10')
	{
		alert('win');
	}

	
	if(cpuScore.text == '10')
	{
		alert('lose');
	}
}

function alert(e)
{
	Ticker.removeListener(tkr);
	stage.onMouseMove = null;
	bg.onPress = null
	
	if(e == 'win')
	{
		win.x = 140;
		win.y = -90;
	
		stage.addChild(win);
		Tween.get(win).to({y: 115}, 300);
	}
	else
	{
		lose.x = 140;
		lose.y = -90;
	
		stage.addChild(lose);
		Tween.get(lose).to({y: 115}, 300);
	}
}