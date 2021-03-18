import { Component, OnInit } from '@angular/core';
import { SharedVariables } from 'src/app/Utils/SharedVariables';
import * as $ from "jquery";

@Component({
    selector: 'app-pathfinding',
    templateUrl: './pathfinding.component.html',
    styleUrls: ['./pathfinding.component.css']
})
export class PathfindingComponent implements OnInit {
    private row: number = 31;
    private column: number = 41;
    private addWall: boolean = false;
    private move_sNode: boolean = false;
    private move_eNode: boolean = false;
    private removeWall: boolean = false;
    private sNode: any = undefined;
    private eNode: any = undefined;
    private initial_pos_sNode: any = undefined;
    private initial_pos_eNode: any = undefined;
    public algorithm_mssg = "Welcome to Pathfinding Visualizer! please select an algorithm";

    constructor() {

    }

    public ngOnInit(): void {
        SharedVariables.app_title = "PATHFINDING VISUALIZER"

        if ($('#grid').length) {
            this.SetGrid(this.row, this.column);
        }
    }

    private SetGrid(row: number, column: number) {
        let table = $("#grid").get(0);
        let id = 0;
        for (let i = 0; i < row; i++) {
            let tr = document.createElement("tr");
            table.appendChild(tr);
            for (let j = 0; j < column; j++) {
                id++;
                let td = document.createElement("td");
                let btn = document.createElement("div");
                td.id = id.toString()
                td.setAttribute("style", "font-size: 0px; margin: auto; background-color: white; color: blue; width: 25px; height: 25px");
                td.appendChild(btn);
                tr.appendChild(td);

                // sNode, eNode initial position
                if (Math.ceil(row / 2) == i && j == 5) {
                    td.style.background = 'green';
                    this.sNode = td;
                    this.initial_pos_sNode = this.sNode;
                }
                else if (Math.ceil(row / 2) == i && j == (column - 5 - 1)) {
                    td.style.background = 'red';
                    this.eNode = td;
                    this.initial_pos_eNode = this.eNode;
                }

                const component = this;
                td.ondrop = function () { return false; }
                td.ondragstart = function () { return false; }
                td.onmouseup = function () {
                    component.addWall = false;
                    component.removeWall = false;
                    component.move_sNode = false;
                    component.move_eNode = false;
                }
                td.onmousedown = function () {
                    let bColor = td.style.backgroundColor;
                    if (bColor == "white") {
                        td.style.backgroundColor = "black";
                        component.addWall = true
                    }
                    else if (bColor == "black") {
                        td.style.backgroundColor = "white";
                        component.removeWall = true
                    }
                    else if (bColor == "green") {
                        component.move_sNode = true;
                    }
                    else if (bColor == "red") {
                        component.move_eNode = true;
                    }
                }
                td.onmouseover = function () {
                    let bColor = td.style.backgroundColor;
                    if (component.addWall) {
                        if (bColor == "white") {
                            td.style.backgroundColor = "black";
                        }

                    }
                    else if (component.removeWall) {
                        if (bColor == "black") {
                            td.style.backgroundColor = "white";
                        }
                    }

                    // moving node
                    if (component.move_sNode) {
                        if (td.style.backgroundColor == "black" || td.style.backgroundColor == "red") return;
                        td.style.backgroundColor = 'green';
                        component.sNode.style.backgroundColor = 'white';

                        component.sNode = td;
                    }
                    if (component.move_eNode) {
                        if (td.style.backgroundColor == "black" || td.style.backgroundColor == "green") return;
                        td.style.backgroundColor = 'red';
                        component.eNode.style.backgroundColor = 'white';

                        component.eNode = td;
                    }
                }
            }
        }
    }

    public VisualizeAlgorithm() {
        console.log("TATA")
    }

    public VisualizeAStar() {
        this.algorithm_mssg = "visualize a* algorithm";
    }

    public VisualizeDijkstra() {
        this.algorithm_mssg = "visualize dijkstra algorithm";
    }

    public VisualizeFloodFill() {
        this.algorithm_mssg = "visualize flood fill algorithm";
    }

    public VisualizeGreedyBestFirst() {
        this.algorithm_mssg = "visualize greedy best first algorithm";
    }
}
