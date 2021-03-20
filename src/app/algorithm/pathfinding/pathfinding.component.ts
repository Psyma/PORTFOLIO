import { Component, OnInit } from '@angular/core';
import { SharedVariables } from 'src/app/Utils/SharedVariables';
import * as $ from "jquery";

enum Algorithm {
    None = 0, Astar, Dijkstra, FloodFill, GreedyBestFirst
}

@Component({
    selector: 'app-pathfinding',
    templateUrl: './pathfinding.component.html',
    styleUrls: ['./pathfinding.component.css']
})
export class PathfindingComponent implements OnInit {
    private row: number = 41;
    private column: number = 51;
    private addWall: boolean = false;
    private move_sNode: boolean = false;
    private move_eNode: boolean = false;
    private removeWall: boolean = false;
    private sNode: any = undefined;
    private eNode: any = undefined;
    private initial_pos_sNode: any = undefined;
    private initial_pos_eNode: any = undefined;
    private orig_pos_sNode: any = undefined;
    private orig_pos_eNode: any = undefined;
    public algorithm_mssg = "Welcome to Pathfinding Visualizer! please select an algorithm";

    private algorithm: Algorithm = Algorithm.None;
    private td_array: Array<any>[] = []
    private djkstra_count = 0
    constructor() {

    }

    public ngOnInit(): void {
        SharedVariables.app_title = "PATHFINDING VISUALIZER"

        this.SetGrid(this.row, this.column);
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
                td.setAttribute("style", "font-size: 10px; margin: auto; background-color: white; color: blue; width: 18px; height: 18px");
                td.setAttribute("y", i.toString());
                td.setAttribute("x", j.toString());
                td.appendChild(btn);
                tr.appendChild(td);

                // populate 2d array 
                if (!this.td_array[i]) {
                    this.td_array[i] = [];
                }
                this.td_array[i][j] = td;

                // sNode, eNode initial position
                if (Math.ceil(row / 2) == i && j == 5) {
                    td.style.backgroundColor = 'green';
                    this.sNode = td;
                    this.initial_pos_sNode = this.sNode;
                    this.orig_pos_sNode = this.sNode;
                }
                else if (Math.ceil(row / 2) == i && j == (column - 5 - 1)) {
                    td.style.background = 'red';
                    this.eNode = td;
                    this.initial_pos_eNode = this.eNode;
                    this.orig_pos_eNode = this.eNode;
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
                        component.initial_pos_sNode = component.sNode;
                    }
                    if (component.move_eNode) {
                        if (td.style.backgroundColor == "black" || td.style.backgroundColor == "green") return;
                        td.style.backgroundColor = 'red';
                        component.eNode.style.backgroundColor = 'white';

                        component.eNode = td;
                        component.initial_pos_eNode = component.eNode;
                    }
                }
            }
        }
    }

    public VisualizeAlgorithm() {
        if (this.algorithm == Algorithm.Astar || this.algorithm == Algorithm.Dijkstra || this.algorithm == Algorithm.GreedyBestFirst) {
            this.RunPathfinding(this.row, this.column, this.td_array, this.algorithm)
        }
    }

    public ClearBoard() {
        for (let i = 0; i < this.row; i++) {
            for (let j = 0; j < this.column; j++) {
                this.td_array[i][j].style.backgroundColor = 'white';
            }
        }
        this.sNode = this.orig_pos_sNode;
        this.eNode = this.orig_pos_eNode;

        this.sNode.style.backgroundColor = "green"
        this.eNode.style.backgroundColor = "red"
        this.initial_pos_sNode = this.sNode;
        this.initial_pos_eNode = this.eNode;
    }

    public VisualizeAStar() {
        this.algorithm_mssg = "visualize a* algorithm";
        this.algorithm = Algorithm.Astar;
    }

    public VisualizeDijkstra() {
        this.algorithm_mssg = "visualize dijkstra algorithm";
        this.algorithm = Algorithm.Dijkstra;
    }

    public VisualizeFloodFill() {
        this.algorithm_mssg = "visualize flood fill algorithm";
    }

    public VisualizeGreedyBestFirst() {
        this.algorithm_mssg = "visualize greedy best first algorithm";
        this.algorithm = Algorithm.GreedyBestFirst;
    }

    public GenerateMazePrims() {
        this.algorithm_mssg = "generating maze (prims algorithm)";
    }

    public GenerateMazeRecursizeDivion() {
        this.algorithm_mssg = "generating maze (recursize division algorithm)";
    }

    public GenerateMazeRecursizeBacktracker() {
        this.algorithm_mssg = "generating maze (recursive backtracker algorithm)";
    }

    private AddNode(neighbour: Array<any>, td_array: Array<any>[], sx: number, sy: number, cost: number) {
        let node = td_array[sy][sx];
        if (node.style.backgroundColor != "black") {
            node.setAttribute("cost", cost)
            neighbour.push(node);
        }
    }

    private CalculateScores(node: any, sNode: any, eNode: any, algorithm: Algorithm, cost: number = 0) {
        let x = Number.parseInt(node.getAttribute("x"));
        let y = Number.parseInt(node.getAttribute("y"));
        let sx = Number.parseInt(sNode.getAttribute("x"));
        let sy = Number.parseInt(sNode.getAttribute("y"));
        let ex = Number.parseInt(eNode.getAttribute("x"));
        let ey = Number.parseInt(eNode.getAttribute("y"));

        let gScore = 0;
        let hScore = 0;
        if (algorithm == Algorithm.Dijkstra) {
            gScore = this.djkstra_count++;
            hScore = Math.max(Math.abs(ex - x), Math.abs(ey - y));
            this.algorithm_mssg = "visualizing djkstra"
        }
        else if (algorithm == Algorithm.GreedyBestFirst) {
            gScore = 0;
            hScore = Math.abs(x - ex) + Math.abs(y - ey);
            this.algorithm_mssg = "visualizing greedy best first"
        }
        else if (algorithm == Algorithm.Astar) {
        }

        let fScore = gScore + hScore;
        node.setAttribute("gScore", gScore);
        node.setAttribute("hScore", hScore);
        node.setAttribute("fScore", fScore);
    }

    private async sleep(msec: number): Promise<unknown> { return new Promise(resolve => setTimeout(resolve, msec)); }
    private async RunPathfinding(row: number, column: number, td_array: Array<any>[], algorithm: Algorithm) {
        let open_list = new Array<any>();
        let open_list_map = new Map<any, any>();
        let closed_list = new Map<any, any>();
        let parent_nodes = new Map<any, any>();
        open_list.push(this.sNode);
        open_list_map.set(this.sNode.id, this.sNode);

        while (true) {
            await this.sleep(0);
            if (open_list.length == 0) {
                this.algorithm_mssg = "no path found!"
                return;
            }
            let current = open_list.sort((a, b) => Number.parseInt(b.getAttribute("fScore")) - Number.parseInt(a.getAttribute("fScore"))).pop();
            open_list_map.delete(current.id)
            current.style.backgroundColor = "violet"
            this.CalculateScores(current, this.initial_pos_sNode, this.initial_pos_eNode, algorithm);
            closed_list.set(current.id, current);

            if (current == this.eNode) {
                while (true) {
                    await this.sleep(10)
                    this.initial_pos_sNode.style.backgroundColor = "green";
                    this.initial_pos_eNode.style.backgroundColor = "red";
                    let node = parent_nodes.get(current)
                    if (node == this.sNode) {
                        this.algorithm_mssg = "Path created!"
                        return;
                    }
                    current = node;
                    node.style.backgroundColor = "yellow"
                    this.algorithm_mssg = "Creating path..."
                }
            }

            let sx = Number.parseInt(current.getAttribute("x"));
            let sy = Number.parseInt(current.getAttribute("y"));
            let neighbour = new Array<any>();
            if (sx + 1 < column) { // east 
                this.AddNode(neighbour, td_array, sx + 1, sy, 10);
            }
            if (sx - 1 >= 0) { // west 
                this.AddNode(neighbour, td_array, sx - 1, sy, 10);
            }
            if (sy + 1 < row) { // south 
                this.AddNode(neighbour, td_array, sx, sy + 1, 10);
            }
            if (sy - 1 >= 0) { // north 
                this.AddNode(neighbour, td_array, sx, sy - 1, 10);
            }
            if (sy + 1 < row && sx + 1 < column) { // southwest  
                this.AddNode(neighbour, td_array, sx + 1, sy + 1, 14);
            }
            if (sy - 1 >= 0 && sx - 1 >= 0) { // northeast 
                this.AddNode(neighbour, td_array, sx - 1, sy - 1, 14);
            }
            if (sy + 1 < row && sx - 1 >= 0) { // southeast 
                this.AddNode(neighbour, td_array, sx - 1, sy + 1, 14);
            }
            if (sy - 1 >= 0 && sx + 1 < column) { // northwest 
                this.AddNode(neighbour, td_array, sx + 1, sy - 1, 14);
            }

            for (let i = 0; i < neighbour.length; i++) {
                let node = neighbour[i]
                if (closed_list.has(node.id)) {
                    continue;
                }

                if (!open_list_map.has(node.id)) {
                    this.CalculateScores(node, this.initial_pos_sNode, this.initial_pos_eNode, algorithm, Number.parseInt(node.getAttribute("cost")));
                    if (node.style.backgroundColor != "green" || node.style.backgroundColor != "red") {
                        node.style.backgroundColor = "skyblue"
                    }
                    // node.innerHTML = node.getAttribute("fScore")
                    parent_nodes.set(node, current);
                    if (Number.parseInt(current.getAttribute("fScore")) < Number.parseInt(node.getAttribute("fScore")) || !(open_list_map.has(node.id))) {
                        open_list.push(node)
                        open_list_map.set(node.id, node)
                    }
                }

            }

            this.initial_pos_sNode.style.backgroundColor = "green";
            this.initial_pos_eNode.style.backgroundColor = "red";
            // alert("")
        }
    }
}
