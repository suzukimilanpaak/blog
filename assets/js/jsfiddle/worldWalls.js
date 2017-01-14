// trbl stands for Top Right Bottom Left. It's a binary string to set which
// edge of the world has a wall. 
//
// e.g.
//  '0111' generate walls on right, bottom and left.
//  '0010' generate a wall only on bottom.
//
// To access a wall from out side the class, refer its property;
//   var walls = new worldWalls(debugDraw.GetDrawScale(), canvas, '0111');
//   walls.restitution = 10;
function worldWalls(scale, canvas, trbl, world) {
  // Define walls and set null to avoid `undefined`
  this.top = null;
  this.right = null;
  this.bottom = null;
  this.left = null;

  var WIDTH = canvas.width / scale;
  var HEIGHT = canvas.height / scale;
  var THICKNESS = 0.1;
  var trblBin = parseInt(trbl, 2);

  var fixDef = new b2FixtureDef;
  var bodyDef = new b2BodyDef;

  bodyDef.type = b2Body.b2_staticBody;
  fixDef.shape = new b2PolygonShape;
  fixDef.restitution = 0.5;
  fixDef.friction = 0.01;

  if(trblBin & parseInt('1000', 2)){
    fixDef.shape.SetAsBox(WIDTH / 2, THICKNESS);
    bodyDef.position.Set(WIDTH / 2, -THICKNESS * 2);
    this.top = world.CreateBody(bodyDef);
    this.top.CreateFixture(fixDef);
  }
  if(trblBin & parseInt('0100', 2)) {
    fixDef.shape.SetAsBox(THICKNESS, HEIGHT / 2);
    bodyDef.position.Set(WIDTH + THICKNESS * 2, HEIGHT / 2);
    this.right = world.CreateBody(bodyDef);
    this.right.CreateFixture(fixDef);
  }
  if(trblBin & parseInt('0010', 2)) {
    fixDef.shape.SetAsBox(WIDTH / 2, THICKNESS);
    bodyDef.position.Set(WIDTH / 2, HEIGHT + THICKNESS * 2);
    this.bottom = world.CreateBody(bodyDef);
    this.bottom.CreateFixture(fixDef);
  }
  if(trblBin & parseInt('0001', 2)) {
    fixDef.shape.SetAsBox(THICKNESS, HEIGHT / 2);
    bodyDef.position.Set(- THICKNESS * 2, HEIGHT / 2);
    this.left = world.CreateBody(bodyDef);
    this.left.CreateFixture(fixDef);
  }
}
