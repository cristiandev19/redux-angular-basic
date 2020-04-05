import { Component, OnInit } from '@angular/core';
import { AppState } from '../../app.reducer';
import { Store } from '@ngrx/store';
import { IngresoEgreso } from '../../models/ingreso-egreso.model';


import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';


@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styleUrls: ['./estadistica.component.scss']
})
export class EstadisticaComponent implements OnInit {

  totalIngresos: number = 0;
  totalEgresos: number = 0;
  ingresos: number = 0;
  egresos: number = 0;


  public doughnutChartLabels: Label[] = ['Ingresos', 'Egresos'];
  public doughnutChartData: MultiDataSet = [
    []
  ];
  public doughnutChartType: ChartType = 'doughnut';


  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.store.select('ingresosEgresos')
      .subscribe( ({ items }) => {
        this.generarEstadistica(items);
      });
  }

  generarEstadistica(items: IngresoEgreso[]) {
    items.map(item => {
      if (item.tipo === 'ingreso') {
        this.totalIngresos += +item.monto;
        this.ingresos++;
      } else {
        this.totalEgresos += +item.monto;
        this.egresos++;
      }
    });

    this.doughnutChartData = [[this.totalIngresos,this.totalEgresos]];
  }

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

}
