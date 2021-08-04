import { Component, OnInit } from '@angular/core';
import { SharedVariables } from '../Utils/SharedVariables';

@Component({
	selector: 'app-resume',
	templateUrl: './resume.component.html',
	styleUrls: ['./resume.component.css'],
})
export class ResumeComponent implements OnInit {
	constructor() {} 
	
	ngOnInit(): void {
		SharedVariables.app_title = 'resume';
	}
}
