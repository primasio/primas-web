var startSolarSystem = function ($p) {
    var Planet = (function () {
        function Planet() {
            var $this_1 = this;

            function $superCstr() {
                $p.extendClassChain($this_1)
            }

            $this_1.satellites = new $p.ArrayList();
            $this_1.parent = null;
            $this_1.pos = new $p.PVector();
            $this_1.size = 0;
            $this_1.sizeRate = 0;
            $this_1.angle = 0;
            $this_1.angleRate = 0.1;
            $this_1.reverseAngleRate = false;
            $this_1.mainColor = $p.color(0, 0, 0, 0);
            function draw$0() {
                if (drawFill) {
                    $p.fill($this_1.mainColor);
                    $p.noStroke();
                } else {
                    $p.stroke($this_1.mainColor);
                    $p.noFill();
                }
                $p.pushMatrix();
                var planetHierarchy = new $p.ArrayList();
                var parentPlanet = $this_1.parent;
                while (parentPlanet != null) {
                    planetHierarchy.add(0, parentPlanet);
                    parentPlanet = parentPlanet.parent;
                }
                for (var $it0 = new $p.ObjectIterator(planetHierarchy), planet = void(0); $it0.hasNext() && ((planet = $it0.next()) || true);) {
                    $p.rotate(planet.angle);
                    $p.translate(planet.pos.x, planet.pos.y);
                }
                if ($this_1.parent != null) {

                    if(window.innerWidth < 768)
                    {
                        $this_1.pos.x = ($this_1.size + $this_1.parent.size) / 4;
                    }else{
                        $this_1.pos.x = ($this_1.size + $this_1.parent.size) / 1.2;
                    }
                }
                $p.rotate($this_1.angle);
                $p.translate($this_1.pos.x, $this_1.pos.y);
                $p.line(-$this_1.size, -$this_1.size, $this_1.size, $this_1.size);
                $p.popMatrix();
                if ($this_1.parent != null) {
                    if ($this_1.reverseAngleRate) {
                        $this_1.angle -= $this_1.angleRate;
                    } else {
                        $this_1.angle += $this_1.angleRate;
                    }
                }
                if ($this_1.sizeRate != 0) {
                    $this_1.size -= $this_1.sizeRate;
                }
            }

            $p.addMethod($this_1, 'draw', draw$0, false);
            function addSatellites$1(planetCount) {
                var newSatellites = new $p.ArrayList();
                var newSize = 100;
                var newSizeRate = $p.random(0.01, 0.2);
                var newColor = $p.color(globalHue, 255, 255, 20);
                globalHue += 10;
                if (globalHue > 255) {
                    globalHue = 0;
                }
                var newAngleRate = 0.015;
                var newReverseAngleRate = false;
                if ($p.parseInt($p.random(2)) == 1) {
                    newReverseAngleRate = true;
                }
                for (var i = 0; i < planetCount; i++) {
                    var newPlanet = new Planet(newSize);
                    newPlanet.parent = $this_1.$self;
                    newPlanet.sizeRate = newSizeRate;
                    newPlanet.mainColor = newColor;
                    var startAngle = $p.radians((360 / planetCount) * (i + 1));
                    newPlanet.angle = startAngle;
                    newPlanet.angleRate = newAngleRate;
                    newPlanet.reverseAngleRate = newReverseAngleRate;
                    $this_1.satellites.add(newPlanet);
                    newSatellites.add(newPlanet);
                }
                return newSatellites;
            }

            $p.addMethod($this_1, 'addSatellites', addSatellites$1, false);
            function $constr_1(sizeInput) {
                $superCstr();
                $this_1.size = sizeInput;
            }

            function $constr() {
                if (arguments.length === 1) {
                    $constr_1.apply($this_1, arguments);
                } else $superCstr();
            }

            $constr.apply(null, arguments);
        }

        return Planet;
    })();
    $p.Planet = Planet;
    var allPlanets = new $p.ArrayList();
    var drawFill = false;
    var globalHue = 0;

    function setup() {
        $p.size(window.innerWidth, 600);
        $p.ellipseMode($p.CENTER);
        $p.colorMode($p.HSB, 255);
        $p.frameRate(10);
        reset();
    }

    $p.setup = setup;
    setup = setup.bind($p);
    function draw() {
        if (allPlanets.get(0).size <= (window.innerWidth < 768?180:100)) {
            return;
        }
        for (var $it1 = new $p.ObjectIterator(allPlanets), p = void(0); $it1.hasNext() && ((p = $it1.next()) || true);) {
            p.draw();
        }
    }

    $p.draw = draw;
    draw = draw.bind($p);
    function reset() {
        allPlanets.clear();
        $p.background(0);
        globalHue = 80;
        createSolarSystem(4, 3, 3);
    }

    $p.reset = reset;
    reset = reset.bind($p);
    function resizeSketch(containerHeight) {
        $p.size(window.innerWidth, containerHeight);
        reset();
    }

    $p.resizeSketch = resizeSketch;
    resizeSketch = resizeSketch.bind($p);
    function createSolarSystem(nestedCount, minSatCount, maxSatCount) {
        allPlanets.clear();
        var masterPlanet = new Planet(200);
        masterPlanet.pos.set($p.width / 2, $p.height / 2);
        masterPlanet.sizeRate = $p.random(0.1, 0.25);
        masterPlanet.mainColor = $p.color(255, 255, 255, 0);
        var newPlanets = new $p.ArrayList();
        newPlanets.add(masterPlanet);
        for (var i = 0; i < nestedCount; i++) {
            var tempSatellites = new $p.ArrayList();
            for (var $it2 = new $p.ObjectIterator(newPlanets), p = void(0); $it2.hasNext() && ((p = $it2.next()) || true);) {
                var satelliteCount = $p.parseInt($p.random(minSatCount, maxSatCount));
                if (satelliteCount == 0) {
                    continue;
                }
                var satellites = p.addSatellites(satelliteCount);
                tempSatellites.addAll(satellites);
            }
            allPlanets.addAll(newPlanets);
            newPlanets.clear();
            newPlanets = tempSatellites;
        }
    }

    $p.createSolarSystem = createSolarSystem;
    createSolarSystem = createSolarSystem.bind($p);
};
