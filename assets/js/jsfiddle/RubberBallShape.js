function RubberBallShape(radius, world) {
  b2CircleShape.call(this, radius);

  this.RADIUS = radius;
  this.DIFF_THRESHOLD_TO_ROUND = this.RADIUS * 0.02;
  this.IMPULSE_THRESHOLD_TO_STOP_UPDATING = 20;
}

RubberBallShape.prototype = Object.create(b2CircleShape.prototype);

RubberBallShape.prototype.Copy = function () {
   var s = new RubberBallShape(this.RADIUS);
   s.Set(this);
   return s;
}

RubberBallShape.ballFactory = function(position, radius) {
  radius = radius || 5.0;
  var fixDef = new b2FixtureDef;
  var bodyDef = new b2BodyDef;

  bodyDef.type = b2Body.b2_dynamicBody;
  bodyDef.position = position;
  fixDef.shape = new RubberBallShape(radius);
  fixDef.restitution = 0.9;

  var ball = window.world.CreateBody(bodyDef);
  ball.CreateFixture(fixDef);
  ball.setImage = function(image, offsetX, offsetY, context) {
      var pos = this.GetPosition();
      var x = pos.x * window.debugDraw.GetDrawScale();
      var y = pos.y * window.debugDraw.GetDrawScale();
      
      context.save();
      context.translate(x, y);
      context.rotate(this.GetAngle());
      context.drawImage(image, offsetX, offsetY, 10, 100);
      context.restore();
    }
  return ball;
}

RubberBallShape.prototype.shrink = function(impulse) {
  this.imp = impulse.normalImpulses[0];
  this.transformingSpeed = 0.1;
  this.SetRadius(this.RADIUS - this.imp / 100);
  this.expanding = true;
}

RubberBallShape.prototype.squash = function(radius, imp) {
  this.imp = imp;
  this.transformingSpeed = 0.1;
  this.SetRadius(radius);
  this.expanding = true;
}

RubberBallShape.prototype.diffExpanding = function() { 
  return this.RADIUS - this.GetRadius() 
}

RubberBallShape.prototype.diffShrinking = function() { 
  return this.GetRadius() - this.shrinkedRadius() 
}

RubberBallShape.prototype.shrinkedRadius = function() { 
  return this.RADIUS - this.imp / 100 
}

RubberBallShape.prototype.diminishImpulse = function() { 
  this.imp -= 3 
}

RubberBallShape.prototype.updateRadius = function() {
  if(this.imp == undefined || this.imp <= this.IMPULSE_THRESHOLD_TO_STOP_UPDATING) return;

  if(this.expanding) {
    if(this.diffExpanding() < this.DIFF_THRESHOLD_TO_ROUND) {
      var radius = this.RADIUS;
      this.transformingSpeed += 0.2;
      this.expanding = false;
    } else {
      var radius = this.GetRadius() + (this.diffExpanding() * this.transformingSpeed);
    }
  } else {
    if(this.diffShrinking() < this.DIFF_THRESHOLD_TO_ROUND) {
      var radius = this.shrinkedRadius();
      this.transformingSpeed += 0.2;
      this.expanding = true;
    } else {
      var radius = this.GetRadius() - (this.diffShrinking() * this.transformingSpeed);
    }
  }
  this.SetRadius(radius);
  this.diminishImpulse();
}