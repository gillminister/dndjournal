import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'abilityzz',
  templateUrl: './ability.component.html',
  styleUrls: ['./ability.component.css']
})
export class AbilityComponent implements OnInit {

	public str:number = 0;
	public dex:number = 0;
	public con:number = 0;
	public int:number = 0;
	public wis:number = 0;
	public cha:number = 0;

	constructor() { }

	ngOnInit() {
	}

}
