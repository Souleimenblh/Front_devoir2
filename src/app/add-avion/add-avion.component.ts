import { TypeAv } from './../model/TypeAv.model';
import { Component } from '@angular/core';
import { Avion } from '../model/avion.model';
import { AvionService } from '../services/avion.service';
import { ActivatedRoute,Router } from '@angular/router';

@Component({
  selector: 'app-add-avion',
  templateUrl: './add-avion.component.html',
})
export class AddAvionComponent {
  types! : TypeAv[];
  newIdAvion! : number;
  newType! : TypeAv;
  newAvion = new Avion();
  ajouterAvecSucces = false;
  constructor(private avionService:AvionService,private router :Router) { 

  }

  ngOnInit(): void {
  this.avionService.listeTypes().subscribe(typs => {this.types = typs._embedded.typeAvs;
    console.log(typs);});
  }


 addAvion(){
  this.newAvion.typeAv = this.types.find(typ => typ.idAv == this.newIdAvion)!;
  this.avionService.ajouterAvion(this.newAvion)
  .subscribe(avio => {
  console.log(avio);
  this.router.navigate(['avions']);
});
}

}
