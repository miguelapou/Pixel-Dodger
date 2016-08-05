var music = document.getElementById("music");
music.currentTime = 0;
music.play();

document.getElementById("hScore").innerHTML = localStorage.getItem("highscore");

(function() {
    gameLogic("#canvas", 500, 500, 44, .15);
})();
var game;

function gameLogic(elid, width, height, speed, strength) {
    var canvas = document.querySelector(elid),
        ctx = canvas.getContext("2d"),
        pos = 0,
        blocks = [];
    canvas.width = width;
    canvas.height = height;
    ctx.fillStyle = "yellow";
    game = setInterval(function() {
        if (Math.random() < strength) blocks.push([Math.random() * (width - 10), -10]);

        var score = Math.floor(1000 * strength);

        ctx.clearRect(0, 0, width, height);
        ctx.fillRect(pos, height - 50, 10, 40);
        for (var i = 0; i < blocks.length; i++) {
            ctx.fillRect(blocks[i][0], blocks[i][1], 10, 10);
            if (blocks[i][1] > height - 60 && blocks[i][1] < height - 10 && Math.abs(pos - blocks[i][0]) < 10) {
                clearInterval(game);
                console.log(score)
                if (score > document.getElementById("hScore").innerHTML) {
                    localStorage.setItem('highscore', score.toString());
                }
                document.getElementById("hScore").innerHTML = localStorage.getItem("highscore");

            }
            if (blocks[i][1] > height - 5) {
                blocks.splice(i, 1);
                i--;
            } else {
                blocks[i][1] += 5;
            }
            document.getElementById('score').innerHTML = "Score: " + score;
        }
        strength += 0.001;
    }, speed);

    document.addEventListener('mousemove', function(e) {
        pos = (e.pageX > 0) ? ((e.pageX < width) ? e.pageX : width - 10) : 0;
    }, false);
}

function resetFunction() {
    clearInterval(game)
    gameLogic("#canvas", 500, 500, 44, 0.15);
    var music = document.getElementById("music");
    music.currentTime = 0;
    music.play();
}