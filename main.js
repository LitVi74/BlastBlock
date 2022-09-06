
cc.game.onStart = function(){
  const size = cc.view.getFrameSize();
  cc.view.enableRetina(false);
  cc.view.adjustViewPort(true);
  cc.view.setDesignResolutionSize(
    size.width,
    size.height,
    cc.ResolutionPolicy.NO_BORDER
  );
  cc.view.resizeWithBrowserSize(true);

  //load resources
  cc.LoaderScene.preload(
    Object.values(resources),
    function () {
      cc.director.runScene(new Game());
    },
    this
  );
};
cc.game.run();
