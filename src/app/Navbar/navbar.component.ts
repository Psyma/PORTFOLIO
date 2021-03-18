import { Component, OnInit } from '@angular/core';
import { SharedVariables } from '../Utils/SharedVariables';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

    title: string = ""
    collapsed = true;
    constructor() { }

    ngOnInit(): void {
        this.title = SharedVariables.app_title
    }

}
