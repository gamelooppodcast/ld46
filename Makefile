aseprite = /Applications/Aseprite.app/Contents/MacOS/aseprite

sprites:
	make static-sprites
	make animated-sprites

static-sprites: artwork/static/*.aseprite
	$(aseprite) -b $^ --save-as $(patsubst artwork/static/%.aseprite, assets/sprites/%-{slice}.png, $?)

animated-sprites: artwork/animated/*.aseprite
	$(aseprite) -b $^ --sheet $(patsubst artwork/animated/%.aseprite, assets/sprites/%.png, $?)
