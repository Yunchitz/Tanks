var Game = (function (game) {
    game.options = {
        control: {
            up: 38,
            right: 39,
            down: 40,
            left: 37,
            fire: 32,
            pause: 80,
            save:  83
        },
        direction: {
            up: 'up',
            right: 'right',
            down: 'down',
            left: 'left'
        },
        source: {
            tilesImg: 'src/img/tiles.png',
            mapImg: 'src/img/terrain.png',
            bullet:'src/sounds/bullet.mp3',
            explosion: 'src/sounds/Explosion.mp3',
            tankMove: 'src/sounds/Tank-Sound.mp3'
        },
        mapDescription: {
            tileSize: 32,
            mapWidth: 960,
            mapHeight: 640,
            columns: 30,
            rows: 20
        },

        spriteColumns: 21,
        tankSpriteColumns: 22,
        levelsCount: 2,
        botsCount: 3,
        shootingFrequency: 40,
        botsEnterCoords: {
            dx: [0, 448, 928],
            dy: 0
        },
        localUnitEnterCoords: {
            dx: 448,
            dy: 608
        },
        eagle: {
            enterCoords: {
                dx: 480,
                dy: 608
            },
            tile: 44,
            height: 32,
            size: 32,
            width: 32
        },
        tankWidth: 28,
        tankHeight: 28,
        tankSize: 32,
        deltaTankDx: 2,
        deltaTankDy: 2,
        bulletWidth: 10,
        bulletHeight: 10,
        deltaBulletDx: 11,
        deltaBulletDy: 11,
        tanksSpeed: 2,
        botsSaturation: 10,
        botsApearenceInterval: 3000, //ms
        initialLevel: 0,
        map: [{
            tiles: [
                [250, 250, 250, 250, 384, 384, 384, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 384, 384, 384, 384, 250, 250, 250, 250, 250, 250],
                [250, 250, 250, 250, 384, 386, 384, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 384, 386, 386, 384, 250, 250, 250, 250, 250, 250],
                [250, 250, 250, 250, 384, 386, 384, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 384, 386, 386, 384, 250, 250, 250, 250, 250, 250],
                [250, 250, 250, 250, 384, 384, 384, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 384, 384, 384, 384, 250, 250, 250, 250, 250, 250],
                [250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 384, 384, 384, 384, 384, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 419, 250],
                [250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 384, 405, 406, 385, 384, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250],
                [250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 384, 426, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250],
                [250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 384, 447, 448, 449, 384, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250],
                [250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 384, 384, 384, 384, 384, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250],
                [58, 59, 60, 250, 250, 250, 295, 296, 297, 250, 250, 250, 250, 250, 250, 250, 250, 250, 295, 296, 297, 250, 250, 250, 250, 250, 250, 58, 59, 60],
                [79, 80, 81, 250, 250, 250, 316, 317, 318, 250, 250, 250, 250, 250, 250, 250, 250, 250, 316, 317, 318, 250, 250, 250, 250, 250, 250, 79, 80, 81],
                [100, 101, 102, 250, 250, 250, 337, 338, 339, 250, 250, 250, 250, 250, 250, 250, 250, 250, 337, 338, 339, 250, 250, 250, 250, 250, 250, 100, 101, 102],
                [250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250],
                [250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250],
                [250, 480, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250],
                [250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 384, 385, 386, 387, 388, 384, 385, 386, 387, 388, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250],
                [250, 250, 250, 250, 250, 250, 250, 250, 420, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250],
                [250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250],
                [250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250],
                [250, 250, 250, 250, 250, 250, 420, 420, 420, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 420, 420, 420, 250, 250, 250, 480, 480, 250, 250, 250]
            ],
            background: [
                [401, 402, 403, 401, 402, 403, 401, 402, 403, 401, 402, 403, 401, 402, 403, 401, 402, 403, 401, 402, 403, 401, 402, 403, 401, 402, 403, 401, 402, 403],
                [422, 423, 424, 422, 423, 424, 422, 423, 424, 422, 423, 424, 422, 423, 424, 422, 423, 424, 422, 423, 424, 422, 423, 424, 422, 423, 424, 422, 423, 424],
                [443, 444, 445, 443, 444, 445, 443, 444, 445, 443, 444, 445, 443, 444, 445, 443, 444, 445, 443, 444, 445, 443, 444, 445, 443, 444, 445, 443, 444, 445],
                [401, 402, 403, 401, 402, 403, 401, 402, 403, 401, 402, 403, 401, 402, 403, 401, 402, 403, 401, 402, 403, 401, 402, 403, 401, 402, 403, 401, 402, 403],
                [422, 423, 424, 422, 423, 424, 422, 423, 424, 422, 423, 424, 422, 423, 424, 422, 423, 424, 422, 423, 424, 422, 423, 424, 422, 423, 424, 422, 423, 424],
                [443, 444, 445, 443, 444, 445, 443, 444, 445, 443, 444, 445, 443, 444, 445, 443, 444, 445, 443, 444, 445, 443, 444, 445, 443, 444, 445, 443, 444, 445],
                [401, 402, 403, 401, 402, 403, 401, 402, 403, 401, 402, 403, 401, 402, 403, 401, 402, 403, 401, 402, 403, 401, 402, 403, 401, 402, 403, 401, 402, 403],
                [422, 423, 424, 422, 423, 424, 422, 423, 424, 422, 423, 424, 422, 423, 424, 422, 423, 424, 422, 423, 424, 422, 423, 424, 422, 423, 424, 422, 423, 424],
                [443, 444, 445, 443, 444, 445, 443, 444, 445, 443, 444, 445, 443, 444, 445, 443, 444, 445, 443, 444, 445, 443, 444, 445, 443, 444, 445, 443, 444, 445],
                [401, 402, 403, 401, 402, 403, 401, 402, 403, 401, 402, 403, 401, 402, 403, 401, 402, 403, 401, 402, 403, 401, 402, 403, 401, 402, 403, 401, 402, 403],
                [422, 423, 424, 422, 423, 424, 422, 423, 424, 422, 423, 424, 422, 423, 424, 422, 423, 424, 422, 423, 424, 422, 423, 424, 422, 423, 424, 422, 423, 424],
                [443, 444, 445, 443, 444, 445, 443, 444, 445, 443, 444, 445, 443, 444, 445, 443, 444, 445, 443, 444, 445, 443, 444, 445, 443, 444, 445, 443, 444, 445],
                [401, 402, 403, 401, 402, 403, 401, 402, 403, 401, 402, 403, 401, 402, 403, 401, 402, 403, 401, 402, 403, 401, 402, 403, 401, 402, 403, 401, 402, 403],
                [422, 423, 424, 422, 423, 424, 422, 423, 424, 422, 423, 424, 422, 423, 424, 422, 423, 424, 422, 423, 424, 422, 423, 424, 422, 423, 424, 422, 423, 424],
                [443, 444, 445, 443, 444, 445, 443, 444, 445, 443, 444, 445, 443, 444, 445, 443, 444, 445, 443, 444, 445, 443, 444, 445, 443, 444, 445, 443, 444, 445],
                [401, 402, 403, 401, 402, 403, 401, 402, 403, 401, 402, 403, 401, 402, 403, 401, 402, 403, 401, 402, 403, 401, 402, 403, 401, 402, 403, 401, 402, 403],
                [422, 423, 424, 422, 423, 424, 422, 423, 424, 422, 423, 424, 422, 423, 424, 422, 423, 424, 422, 423, 424, 422, 423, 424, 422, 423, 424, 422, 423, 424],
                [443, 444, 445, 443, 444, 445, 443, 444, 445, 443, 444, 445, 443, 444, 445, 443, 444, 445, 443, 444, 445, 443, 444, 445, 443, 444, 445, 443, 444, 445],
                [401, 402, 403, 401, 402, 403, 401, 402, 403, 401, 402, 403, 401, 402, 403, 401, 402, 403, 401, 402, 403, 401, 402, 403, 401, 402, 403, 401, 402, 403],
                [422, 423, 424, 422, 423, 424, 422, 423, 424, 422, 423, 424, 422, 423, 424, 422, 423, 424, 422, 423, 424, 422, 423, 424, 422, 423, 424, 422, 423, 424]
            ]
        }, {

            tiles: [
                [250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 383, 383, 383, 250, 250, 250, 250, 250, 250, 250, 250],
                [250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 383, 383, 383, 250, 250, 250, 250, 250, 250, 250, 250],
                [250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250],
                [250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250],
                [250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 383, 383, 250, 250, 250, 250, 125, 125, 125, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250],
                [250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 383, 383, 250, 250, 250, 250, 125, 125, 125, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250],
                [250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 383, 383, 250, 250, 250, 250, 125, 125, 125, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250],
                [250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 383, 383, 250, 250, 250, 250, 125, 125, 125, 250, 397, 250, 250, 250, 250, 250, 250, 250, 250, 250],
                [250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 383, 383, 250, 250, 250, 250, 125, 125, 125, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250],
                [250, 250, 250, 250, 383, 383, 383, 383, 383, 383, 383, 383, 250, 250, 250, 250, 125, 125, 125, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250],
                [250, 250, 250, 250, 383, 383, 383, 383, 383, 383, 383, 383, 250, 250, 250, 250, 125, 125, 125, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250],
                [250, 250, 250, 250, 383, 383, 383, 383, 383, 383, 383, 383, 250, 250, 250, 250, 125, 125, 125, 250, 250, 250, 250, 250, 250, 250, 250, 383, 383, 383],
                [250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 125, 125, 125, 250, 250, 250, 250, 250, 250, 250, 250, 383, 383, 383],
                [250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250],
                [250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250],
                [250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250],
                [383, 383, 383, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 394, 395, 250],
                [383, 383, 383, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 415, 416, 250],
                [250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250],
                [250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250]
            ],
            background: [
                [113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 112, 112, 112, 112, 112, 112, 112, 112, 112, 112, 113, 112, 112, 112],
                [113, 113, 113, 112, 112, 112, 112, 113, 113, 113, 112, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 112, 112, 112, 112, 113, 112, 112, 112, 112],
                [113, 113, 113, 113, 113, 113, 113, 112, 112, 112, 112, 112, 112, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 112, 112, 112, 112, 112, 112, 112],
                [113, 113, 112, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 112, 112, 112, 113, 113, 113, 113, 113, 112, 113, 113, 112, 112, 112, 112, 112, 112],
                [113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 112, 112, 112, 112, 112],
                [113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 112, 112, 112, 112],
                [113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 112, 112, 112],
                [112, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 112, 112],
                [112, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 112, 112],
                [112, 113, 113, 113, 113, 113, 112, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 112, 113, 113, 113, 112, 112],
                [112, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 112, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 112],
                [112, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 112],
                [112, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 112],
                [112, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 112],
                [112, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 112],
                [112, 112, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 112, 113, 113, 113, 113, 113, 113, 112],
                [112, 112, 112, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 112],
                [112, 112, 112, 113, 113, 113, 113, 113, 113, 113, 112, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 112, 113, 113, 113],
                [112, 112, 112, 112, 112, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 112, 112, 112, 112, 112, 112, 113, 113, 113, 113, 113, 113, 113, 147],
                [113, 112, 112, 112, 112, 112, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 112, 112, 112, 112, 113, 113, 113, 113]
            ]
        }]
    };

    return game;
})(Game || {});