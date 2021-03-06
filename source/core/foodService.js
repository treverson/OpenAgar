"use strict";
/*
    OpenAgar - Open source web game
    Copyright (C) 2016 Andrew S

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as published
    by the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/
module.exports = class FoodService {
    constructor(main) {
        this.main = main;
        this.loops = [];
    }
    checkFood() {
        // console.log(this.main.dataService.world.nodes.getWithMerged(this.main.bounds).length)
        if (this.main.food < this.main.getConfig().minFood) {
            this.addFood(this.main.getConfig().minFood - this.main.food);
        } else {
            // console.log(this.main.dataService.world.getNodes())
        }

    }
    getRandomPos() {
        var x = Math.floor(this.main.bounds.width * Math.random());
        var y = Math.floor(Math.random() * this.main.bounds.height);
        return {
            x: x,
            y: y
        };
    }
    addFood(m) {
        for (var i = 0; i < m; i++) {
            var pos = this.getRandomPos();
            // console.log(pos)
            this.main.addNode(pos, 2, 4);
        }
    }
    checkVirus() {
        if (this.main.viruses < this.main.getConfig().minVirus) {
            this.addVirus(this.main.getConfig().minVirus - this.main.viruses);
        } else {
            // console.log(this.main.dataService.world.getNodes())
        }
    }
    addWormHole(m) {
        for (var i = 0; i < m; i++) {
            var pos = this.getRandomPos();
            // console.log(pos)
            var mass = Math.floor(Math.random() * 500) + 100
            if (this.main.checkCollide(pos, Math.ceil(Math.sqrt(this.mass) * 10) + 5)) {
                --i;
                continue;
            };
            this.main.addNode(pos, mass, 6);
        }
    }
    checkWormHole() {
        if (this.main.wormHoles < this.main.getConfig().minWormHole) {
            this.addWormHole(this.main.getConfig().minWormHole - this.main.wormHoles);
        } else {
            // console.log(this.main.dataService.world.getNodes())
        }
    }
    addVirus(m) {

        for (var i = 0; i < m; i++) {
            var pos = this.getRandomPos();
            if (this.main.checkCollide(pos, 120)) {
                --i;
                continue;
            };
            // console.log(pos)
            this.main.addNode(pos, this.main.getConfig().virusMass, 2);
        }
    }
    loop() {
        this.loops.forEach((l) => {
            this.checkNode(l.min, l.id, l.name, l.start)
        });
    }
    addLoop(min, id, name, start) {
        this.loops.push({
            min: min,
            id: id,
            name: name,
            start: start
        })
    }

    checkNode(min, id, name, start) {
        var amount = this.main.getWorld().getNodes(name).size
        if (amount < min) {
            this.addNode(min - amount, id, start)
        }
    }
    addNode(m, id, start) {
        for (var i = 0; i < m; i++) {
            var pos = this.getRandomPos();
            // console.log(pos)
            this.main.addNode(pos, start, id);
        }
    }
};