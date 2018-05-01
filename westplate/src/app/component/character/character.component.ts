import { Component, OnInit } from '@angular/core';
import { AbilityComponent } from './ability/ability.component';

@Component({
  selector: 'character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.css']
})
export class CharacterComponent implements OnInit {

	public name:string = "Emmylou";

	constructor(
	) {

	}

	ngOnInit() {
		console.log("hehe");
	}

}
