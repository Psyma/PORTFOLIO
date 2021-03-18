import { Component, OnInit } from '@angular/core';
import { SharedVariables } from 'src/app/Utils/SharedVariables';

@Component({
    selector: 'app-sorting',
    templateUrl: './sorting.component.html',
    styleUrls: ['./sorting.component.css']
})
export class SortingComponent implements OnInit {

    constructor() { }

    ngOnInit(): void {
        SharedVariables.app_title = "SORTING VISUALIZER"
    }

}
