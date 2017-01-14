function DebugDraw(world, canvas, scale) {
  var context = canvas.getContext('2d');
  var debugDraw = new b2DebugDraw();

  debugDraw.SetSprite(context);
  debugDraw.SetDrawScale(scale);
  debugDraw.SetFillAlpha(0.5);
  debugDraw.SetLineThickness(1.0);
  debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);

  world.SetDebugDraw(debugDraw);
  return debugDraw;
}
