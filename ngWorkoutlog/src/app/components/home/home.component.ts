import { WorkoutService } from './../../services/workout.service';
import { Exerciseset } from './../../models/exerciseset';
import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { filter } from 'rxjs';
import {Chart, registerables } from 'chart.js'


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  //-------- chart vars --------
  result: any;
  //Volume Per Day
  volumePerDay: any;
  // Date
  workoutDate: any;
  chart: any;
  //---------------------------


  closeResult = '';
  newItem: Exerciseset = new Exerciseset();
  itemStats: Object | null = null;
  distinctEx: string[] | null = null;
  selectedExercise:string | null = null;
  workoutdata: any[] | null = null;

  selectedItem: Exerciseset = new Exerciseset();
  selectedItemDate:string | null = null;
  selectedItemTime:string | null = null;

  selectedSummeryItem: Event | null | string= null;
  selectedSummeryItemTotalVolume: string | null = null;


  items:Exerciseset[] = [];

  constructor(private workoutService:WorkoutService, private modalService: NgbModal,
      private date:DatePipe) {
        Chart.register(...registerables);
       }

  ngOnInit(): void {
    this.index();
    this.stats();
  }

  createChart(){
    if(this.distinctEx){

    let exerciseName = this.distinctEx[0];
    this.selectedSummeryItem = exerciseName;
    this.selectedSummeryItem = exerciseName;
    var volumeData = this.result.totalVolumePerExercise;
    for(let i = 0; i < volumeData.length; ++i){
      if(volumeData[i][0] == exerciseName){
        this.selectedSummeryItemTotalVolume = volumeData[i][1];
        break;
      }
    }

    let tmp  = this.result.totalVolumePerExerciesPerDay.filter(function(item: string[]){
      return item[2] == exerciseName;
    });

    this.volumePerDay = tmp.map(function(item: any[]){
      return item[1];
    })
    this.workoutDate = tmp.map(function(item:any[]){
      return item[0];
    })

    //Show charts
    this.chart = new Chart('canvas', {
      type: 'line',
      data: {
        labels: this.workoutDate,
        datasets:[
          {
            label: 'volume',
            data: this.volumePerDay,
            borderWidth: 3,
            fill:false,
            backgroundColor: 'rgba(93,175,89,0.1)',
            borderColor: '#3e95cd'
          }
        ]
      }
    })

    }

  }

  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  loadSelected(item:Exerciseset){
    this.selectedItem = item;
    this.selectedItemDate = this.date.transform(this.selectedItem.datetime,"YYYY-MM-dd");
    this.selectedItemTime = this.date.transform(this.selectedItem.datetime,"hh:mm:ss");
  }

  index(){
    this.workoutService.index().subscribe(
      (data) => {
        this.items = data;
      },
      (error) => {
        console.error("Error in Home component.index()");
      }
    )
  }

  addNewItem(item: Exerciseset){
    item.datetime = this.date.transform(Date.now(),"YYYY-MM-dd hh:mm:ss");
    this.workoutService.add(item).subscribe(
      (data) => {
        this.index();
      },
      (error) => {
        console.log("Error in observable add()")
      }

    )
  }

  update(item: Exerciseset){
    item.datetime = this.selectedItemDate + " " + this.selectedItemTime;
    this.workoutService.update(item).subscribe(
      (data) => {
        console.log("sucessfully deleted item")
        this.index();
      },
      (error) => {
        console.log("Error in observable update()")
      }
    )
  }

  delete(item: Exerciseset){
    this.workoutService.delete(item.id).subscribe(
      (data) => {
        console.log("sucessfully deleted item")
        this.index();
      },
      (error) => {
        console.log("Error in observable delete()")
      }
    )
  }

  stats(){
    this.workoutService.getStats().subscribe(
      (data) => {
        this.result = data;
        this.distinctEx = this.result.distinctExercies;
        this.createChart();
      },
      (error) => {
        console.log("Error in observable stats()")
      }
    )
  }

  renderCharts(exerciseName:Event){
    this.chart.destroy();
    this.selectedSummeryItem = exerciseName;
    var volumeData = this.result.totalVolumePerExercise;
    for(let i = 0; i < volumeData.length; ++i){
      if(volumeData[i][0] == exerciseName){
        this.selectedSummeryItemTotalVolume = volumeData[i][1];
        break;
      }
    }

    let tmp  = this.result.totalVolumePerExerciesPerDay.filter(function(item: Event[]){
      return item[2] === exerciseName;
    });

    this.volumePerDay = tmp.map(function(item: any[]){
      return item[1];
    })
    this.workoutDate = tmp.map(function(item:any[]){
      return item[0];
    })

    //Show charts
    this.chart = new Chart('canvas', {
      type: 'line',
      data: {
        labels: this.workoutDate,
        datasets:[
          {
            label: 'volume',
            data: this.volumePerDay,
            borderWidth: 3,
            fill:false,
            backgroundColor: 'rgba(93,175,89,0.1)',
            borderColor: '#3e95cd'
          }
        ]
      }
    })
  }

  addData(label: any, data: any) {
    this.chart.data.labels.push(label);
    this.chart.data.datasets.forEach((dataset: { data: any[]; }) => {
        dataset.data.push(data);
    });
    this.chart.update();
}



}
