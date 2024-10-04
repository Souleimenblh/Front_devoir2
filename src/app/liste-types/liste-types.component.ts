import { Component, OnInit } from '@angular/core';
import { TypeAv } from '../model/TypeAv.model';
import { AvionService } from '../services/avion.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-liste-types',
  templateUrl: './liste-types.component.html',
  styles: [],
})
export class ListeTypesComponent implements OnInit {
  typesAv: TypeAv[] = []; // Initialize as an empty array

  ajout: boolean = true;

  updatedTyp: TypeAv = { idAv: 0, matriculeAv: '' };

  constructor(private avionService: AvionService, public authService: AuthService) {}

  ngOnInit(): void {
    this.chargerTypes()

  }

  chargerTypes() {
    this.avionService.listeTypes().subscribe(typs => {
      this.typesAv = typs._embedded.typeAvs;
      console.log(typs);
});
}
  typeUpdated(typ: TypeAv) {
    console.log('Type updated event', typ);

    if (this.ajout) {
      // Adding a new type
      this.avionService.ajouterTypeAv(typ).subscribe(() => {
        this.chargerTypes(); // Reload the type list
        this.resetForm();
      });
    } else {
      // Updating an existing type
      this.avionService.updateTypeAv(typ).subscribe(() => {
        this.chargerTypes(); // Reload the type list
        this.resetForm();
      });
    }
  }

  updateTyp(typ: TypeAv) {
    this.updatedTyp = typ;
    this.ajout = false;
  }

  supprimerType(typ: TypeAv) {
    let conf = confirm('Etes-vous sûr ?');
    if (conf) {
      this.avionService.supprimerTypeAv(typ.idAv).subscribe(() => {
        console.log('Type supprimé');
        this.chargerTypes();
      });
    }
  }

  resetForm() {
    this.updatedTyp = { idAv: 0, matriculeAv: '' };
    this.ajout = true;
  }
}