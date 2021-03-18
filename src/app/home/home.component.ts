import { Component, OnInit } from '@angular/core';
import { SharedVariables } from '../Utils/SharedVariables';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    constructor() { }

    ngOnInit(): void {
        SharedVariables.app_title = "portfolio";
    }
}
