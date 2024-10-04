import { TypeAv } from './../model/TypeAv.model';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { Avion } from '../model/avion.model';
import { Observable, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TypeAvWrapper } from '../model/TypeAvWrapped.model';
//import { apiURL } from '../config';

// const httpOptions = {
//   headers: new HttpHeaders({ 'Content-Type': 'appliavion/json' }),
// };

@Injectable({
  providedIn: 'root',
})
export class AvionService {
  private apiURL: string = 'http://localhost:8085/avions/api';
  private apiURLTyp: string = 'http://localhost:8085/avions/typ';

  //avions!: Avion[];

  //  avions: Avion[];

  // types: Type[];

  constructor(private http: HttpClient, private authService: AuthService) {}
  // listeAvions(): Avion[] {
  //   return this.avions;
  // }

  // listeAvion(): Observable<Avion[]> {
  //   //return this.http.get<Avion[]>(`${this.apiURL}/all` );
  //   return this.http.get<Avion[]>(`${this.apiURL}`);
  // }

  listeAvion(): Observable<Avion[]>{
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
    return this.http.get<Avion[]>(this.apiURL+"/all",{headers:httpHeaders});
    }
    

  // listeTypes(): Observable<TypeAvWrapper> {
  //   return this.http.get<TypeAvWrapper>(this.apiURLTyp);
  // }

//   listeTypes(): Observable<TypeAvWrapper> {
//     return this.http.get<TypeAvWrapper>(this.apiURLTyp).pipe(
//       tap((response: any) => console.log("Types API Response:", response)) // Log the response
//     );
//   }
  

//   consulterTypes(id: number): Observable<TypeAv> {
//     const url = `${this.apiURLTyp}/${id}`;
//     return this.http.get<TypeAv>(url);
//   }

//   ajouterAvion(avio: Avion): Observable<Avion> {
//     //return this.http.post<Avion>(${this.apiURL}/addavio,
//     //this.avions, { headers: this.getAuthHeaders() });
//     //return this.http.post<Avion>(`${this.apiURL}/addavio`, avio);
//     return this.http.post<Avion>(this.apiURL+"/addavio", avio);
//   }

//   supprimerAvion(id: number): Observable<void> {
//     // const url = `${this.apiURL}/delavio/${id}`;
//     // let jwt = this.authService.getToken();
//     // jwt = 'Bearer ' + jwt;
//     // let httpHeaders = new HttpHeaders({ Authorization: jwt });
//     // return this.http.delete(url, { headers: httpHeaders });
//     const url = `${this.apiURL}/${id}`;
//     return this.http.delete<void>(url);
//   }

//   consulterAvion(id: number): Observable<Avion> {
//     const url = `${this.apiURL}/${id}`;
//     return this.http.get<Avion>(url);
//   }

//   updateAvion(avio: Avion): Observable<Avion> {
//     // let jwt = this.authService.getToken();
//     // jwt = 'Bearer ' + jwt;
//     // let httpHeaders = new HttpHeaders({ Authorization: jwt });
//     // return this.http.put<Avion>(this.apiURL + '/updateavio', avio, {
//     //   headers: httpHeaders,
//     // });

//     return this.http.put<Avion>(`${this.apiURL}`, avio);
//   }

//   rechercherparTypeAv(idAv: number): Observable<Avion[]> {
//     const url = `${this.apiURL}/aviostyp/${idAv}`;
//     return this.http.get<Avion[]>(url);
//   }

//   rechercherParMatricule(matricule: string): Observable<Avion[]> {
//     const url = `${this.apiURL}/aviosByMatricule/${matricule}`;
//     return this.http.get<Avion[]>(url);
//   }

//   ajouterTypeAv(typ: TypeAv): Observable<TypeAv> {
//     return this.http.post<TypeAv>(this.apiURLTyp, typ);
//   }

//   supprimerTypeAv(id: number) {
//     const url = `${this.apiURLTyp}/${id}`;
//     return this.http.delete<void>(url);
//   }

//   // updateTypeAv(typeAv: TypeAv): Observable<TypeAv> {
//   //   const url = `${this.apiURLTyp}/${TypeAv.idAv}`;
//   //   return this.http.put<TypeAv>(url, typeAv);
//   // }
// }


  ajouterAvion( avio: Avion):Observable<Avion>{
  let jwt = this.authService.getToken();
  jwt = "Bearer "+jwt;
  let httpHeaders = new HttpHeaders({"Authorization":jwt})
  return this.http.post<Avion>(this.apiURL+"/addavio", avio, {headers:httpHeaders});
  }
  supprimerAvion(id : number) {
  const url = `${this.apiURL}/delavio/${id}`;
  let jwt = this.authService.getToken();
  jwt = "Bearer "+jwt;
  let httpHeaders = new HttpHeaders({"Authorization":jwt})
  return this.http.delete(url, {headers:httpHeaders});
  }
  consulterAvion(id: number): Observable<Avion> {
  const url = `${this.apiURL}/getbyid/${id}`;
  let jwt = this.authService.getToken();
  jwt = "Bearer "+jwt;
  let httpHeaders = new HttpHeaders({"Authorization":jwt})
  return this.http.get<Avion>(url,{headers:httpHeaders});
  }
  updateAvion(prod :Avion) : Observable<Avion> {
  let jwt = this.authService.getToken();
  jwt = "Bearer "+jwt;
  let httpHeaders = new HttpHeaders({"Authorization":jwt})
  return this.http.put<Avion>(this.apiURL+"/updateavio", prod, {headers:httpHeaders});
  }

  listeTypes():Observable<TypeAvWrapper>{
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
    return this.http.get<TypeAvWrapper>(this.apiURLTyp,{headers:httpHeaders}
    );
    }
    rechercherParTypeAv(idav: number): Observable<Avion[]> {
    const url = `${this.apiURL}/aviotyp/${idav}`;
    return this.http.get<Avion[]>(url);
    }
    rechercherParMatricule(nom: string):Observable< Avion[]> {
    const url = `${this.apiURL}/aviosByName/${nom}`;
    return this.http.get<Avion[]>(url);
    }
    ajouterTypeAv( av: TypeAv):Observable<TypeAv>{
    //return this.http.post<TypeAv>(this.apiURLTyp, av, httpOptions);
    return this.http.post<TypeAv>(this.apiURLTyp, av);
    }

    supprimerTypeAv(id: number) {
    
      let jwt = this.authService.getToken();
      jwt = "Bearer "+jwt;
      let httpHeaders = new HttpHeaders({"Authorization": jwt});
      return this.http.delete(`${this.apiURLTyp}/${id}`, { headers: httpHeaders });
    }
    updateTypeAv(typ: TypeAv): Observable<TypeAv> {
      let jwt = this.authService.getToken();
      jwt = "Bearer " + jwt;
      let httpHeaders = new HttpHeaders({ "Authorization": jwt });
      const url = `${this.apiURLTyp}/${typ.idAv}`; // Update by ID

      return this.http.put<TypeAv>(url, typ, { headers: httpHeaders });
  }
 
}