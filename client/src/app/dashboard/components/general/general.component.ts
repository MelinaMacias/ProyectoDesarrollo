
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { GeneralService } from '../../services/general/general.service';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.css']
})
export class GeneralComponent implements OnInit {

  estadisticas:any;

  constructor(
    private generalService: GeneralService) { }

  ngOnInit(): void {

    this.generalService.getEstadisticas()
    .subscribe((estadistica) => {
      this.estadisticas = estadistica
    });

  }

}
