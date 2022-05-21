import { WorkoutService } from './../../services/workout.service';
import { Exerciseset } from './../../models/exerciseset';
import { Component, OnInit } from '@angular/core';
//import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  closeResult = '';
  newItem: Exerciseset = new Exerciseset();
  selectedItem: Exerciseset = new Exerciseset();
  items:Exerciseset[] = [];

  constructor(private workoutService:WorkoutService, private modalService: NgbModal,
      private date:DatePipe) { }

  ngOnInit(): void {
    this.index();
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
    console.log(this.selectedItem);
  }

  addNewItem(item: Exerciseset){
    item.datetime = this.date.transform(Date.now(),"YYYY-MM-dd mm:ss:SS");
    console.log(item);
  }

  index(){
    this.workoutService.index().subscribe(
      (data) => {
        this.items = data;
        console.log(this.items);
      },
      (error) => {
        console.error("Error in Home component.index()");
      }
    )
  }

  update(item: Exerciseset){
    console.log("Updating item: ")
    console.log(item);
  }

  delete(item: Exerciseset){
    console.log("Deleting item: ")
    console.log(item);
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



}
