var numberOfEnemies = 15;
var enemySpeed = 2000;

var score = 0;
var collisions = 0;

var width = window.innerWidth - 50; //dynamically set here
var height = window.innerHeight - 100; //dynamically set here
var player = new Entity(width / 2, height / 2);
var enemies = [];
var gameBoard = d3.select('.gameBoard')
  .append('svg')
  .attr('width', width + "px")
  .attr('height', height + "px");
var drag = d3.behavior.drag()
  .on('drag', function() {
    player.x = d3.event.x > width ? width : d3.event.x;
    player.x = d3.event.x < 0 ? 0 : player.x;
    player.y = d3.event.y > height ? height : d3.event.y;
    player.y = d3.event.y < 0 ? 0 : player.y;
    playerCircle.attr('cx', player.x);
    playerCircle.attr('cy', player.y);
  });

var playerCircle = gameBoard
  .selectAll('.player')
  .data([player])
  .enter()
  .append('circle')
  .attr('class', 'player')
  .attr('cx', function(d) {
    return d.x;
  })
  .attr('cy', function(d) {
    return d.y;
  })
  .attr('r', 15)
  .attr('fill', 'red')
  .call(drag);

function Entity(x, y) {
  this.x = x;
  this.y = y;
}

function collisionDetection() {
  return function() {
    var playerX = player.x;
    var playerY = player.y;
    var enemyX = d3.select(this).attr('cx');
    var enemyY = d3.select(this).attr('cy');
    var distance = Math.sqrt(Math.pow((playerX - enemyX), 2) + Math.pow((playerY - enemyY), 2));

    if (distance <= 20) {
      if (d3.select(".high span").html() < score) {
        d3.select(".high span").html(score);
      }
      score = 0;
      collisions++;
      d3.select(".collisions span").html(collisions);
    }
  };
}

var makeEnemies = function(num) {
  for (var i = 0; i < num; i++) {
    enemies.push(new Entity(Math.random() * width, Math.random() * height));
  }
}(numberOfEnemies);

var enemyCircles = gameBoard
  .selectAll('.enemy')
  .data(enemies);

enemyCircles.enter()
  .append('circle')
  .attr('class', 'enemy')
  .attr('cx', function(d) {
    return d.x;
  })
  .attr('cy', function(d) {
    return d.y;
  })
  .attr('r', 10)
  .attr('fill', 'lightgrey');

function moveEnemies(element, duration) {
  element.transition()
    .duration(duration)
    .tween('collision detection', collisionDetection)
    .attr('cx', function(d) {
      var newLocation = Math.random() * width;
      d.x = newLocation;
      return newLocation;
    })
    .attr('cy', function(d) {
      var newLocation = Math.random() * height;
      d.y = newLocation;
      return newLocation;
    })
    //adding a sliight pause between moves
    .transition()
    .duration(300)
    .each('end', function() {
      moveEnemies(d3.select(this), duration);
    });
}

//initial game call
setTimeout(function() {
  moveEnemies(enemyCircles, enemySpeed);
}, 1000);

//score tracker
setInterval(function() {
  d3.select(".current span").html(score += 100);
}, 50);
