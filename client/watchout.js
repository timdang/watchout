// start slingin' some d3 here.

//Create entities for our game board

var Entity = function(x, y) {
  this.x = x;
  this.y = y;
};

//player element gets created
var width = 750;
var height = 450;
var player = new Entity(width/2, height/2);
var enemies = [];




/*
d3.select('body').selectAll('svg')
.data([1,2,3,4,5,6,7])
.enter()
.append('svg')
.classed('red', true)
.attr('width', '100px')
.attr('height', '100px')
.html(function(d) {
  return '<circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red" />';
});
*/

//initialize method
var initialization = function() {


  var drag = d3.behavior.drag()
    .on('drag', function() {
      player.x = d3.event.x;
      player.y = d3.event.y;
      playerCircle.attr('cx', d3.event.x);
      playerCircle.attr('cy', d3.event.y);
    });
  //append to the game board inital position of center of

  //graphical representation of player location
  var gameBoard = d3.select('.gameBoard')
    .append('svg')
    .attr('width', width)
    .attr('height', height);

  var playerCircle = gameBoard
    .selectAll('.player')
    .data([player])
    .enter()
    .append('svg:circle')
    .attr('class', 'player')
    .attr('cx', function(d) {
      return d.x;
    })
    .attr('cy', function(d) {
      return d.y;
    })
    .attr('r', 40)
    .call(drag);

  //d3.event d3.mouse

  for (var i = 0; i < 10; i++){
    enemies.push(new Entity(Math.random() * width, Math.random() * height));
  }

  var enemyCircles = gameBoard
    .selectAll('.asteroid')
    .data(enemies)
    .enter()
    .append('svg:circle')
    .attr('class', '.asteroid')
    .attr('cx', function(d) {
      return d.x;
    })
    .attr('cy', function(d) {
      return d.y;
    })
    .attr('r', 10);

};


//set interval
//as time passes
//additional asteroids are added to the game board
//will start small and get larger as they enter game board
//score increases as time passes

//update both player(x, y) and astroids(x,y)
//use the objects x y to tell d3 where to place dom elements
//when player element collides with asteroid, game ends
//trigger update collisions

//game ends on 3 collisions
//update high score

//starting a game
initialization();
