
import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { GeneralService } from 'src/app/dashboard/services/general/general.service';

@Component({
  selector: 'app-noticias-bar',
  templateUrl: './noticias-bar.component.html',
  styleUrls: ['./noticias-bar.component.css']
})
export class NoticiasBarComponent implements OnInit {

  private svg: any;
  private margin = 100;
  private width = 550 - (this.margin * 2);
  private height = 380 - (this.margin * 2);

  private svg2: any;
  private margin2 = 100;
  private width2 = 550 - (this.margin2 * 2);
  private height2 = 380 - (this.margin2 * 2);

  private dataUsuariosNoticias: any = [];
  private dataPorcentajeMensajes: any = [];

  constructor(
    private estadisticasServices: GeneralService) { }

  ngOnInit(): void {

    this.estadisticasServices.getEstadisticasStaff().subscribe(

      (estadisticas: any) => {

        estadisticas.noticias_usuario.forEach((usuario: any) => {

          this.dataUsuariosNoticias.push({
            "usuario": usuario.usuario,
            "Stars": usuario.total_noticias,
            "Released": "2021"
          });


        });

        estadisticas.mensajes_contacto.forEach((mensaje: any) => {

          this.dataPorcentajeMensajes.push({
            "usuario": mensaje.tag,
            "Stars": mensaje.valor,
            "Released": "2021"
          });

        });

        this.createSvg();
        this.drawBars(this.dataUsuariosNoticias);
        this.drawBars2(this.dataPorcentajeMensajes);

      }

    );


  }

  private createSvg(): void {
    this.svg = d3.select("#noticias")
      .append("svg")
      .attr("width", this.width + (this.margin * 2))
      .attr("height", this.height + (this.margin * 2))
      .append("g")
      .attr("transform", "translate(" + this.margin + "," + this.margin + ")");

    this.svg2 = d3.select("#mensajes")
      .append("svg")
      .attr("width", this.width2 + (this.margin2 * 2))
      .attr("height", this.height2 + (this.margin2 * 2))
      .append("g")
      .attr("transform", "translate(" + this.margin2 + "," + this.margin2 + ")");

  }

  private drawBars(data: any[]): void {

    // Create the X-axis band scale
    const x = d3.scaleBand()
      .range([0, this.width])
      .domain(data.map(d => d.usuario))
      .padding(0.2);

    // Create the Y-axis band scale
    const y = d3.scaleLinear()
      .domain([0, this.dataUsuariosNoticias.length + 4])
      .range([this.height, 0]);

    // Draw the X-axis on the DOM
    this.svg.append("g")
      .attr("transform", "translate(0," + this.height + ")")
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");


    // Draw the Y-axis on the DOM
    this.svg.append("g")
      .call(d3.axisLeft(y));

    // Create and fill the bars
    this.svg.selectAll("bars")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d: any) => x(d.usuario))
      .attr("y", (d: any) => y(d.Stars))
      .attr("width", x.bandwidth())
      .attr("height", (d: any) => this.height - y(d.Stars))
      .attr("fill", "#4AA96C");

  }

  private drawBars2(data: any[]): void {

    // Create the X-axis band scale
    const x = d3.scaleBand()
      .range([0, this.width])
      .domain(data.map(d => d.usuario))
      .padding(0.2);

    // Create the Y-axis band scale
    const y = d3.scaleLinear()
      .domain([0, 100])
      .range([this.height, 0]);

    // Draw the X-axis on the DOM
    this.svg2.append("g")
      .attr("transform", "translate(0," + this.height + ")")
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");


    // Draw the Y-axis on the DOM
    this.svg2.append("g")
      .call(d3.axisLeft(y));

    // Create and fill the bars
    this.svg2.selectAll("bars")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d: any) => x(d.usuario))
      .attr("y", (d: any) => y(d.Stars))
      .attr("width", x.bandwidth())
      .attr("height", (d: any) => this.height - y(d.Stars))
      .attr("fill", "#FFB319");

  }

}
