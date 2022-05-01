import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Pets } from '../../models/Pets';
import { PetsService } from '../../services/pets.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  @ViewChild('form') form: NgForm;

  @Input() petId?: number;

  submissionType: 'Add' | 'Edit' = 'Add'

  constructor(public modalController: ModalController, private petsService: PetsService ) { }

  ngOnInit() {}

  onDismiss(){
    this.modalController.dismiss(null, 'dismiss')
  }

  onPost() {
    if (!this.form.valid) return;
    const name = this.form.value['name'];
    const weight = this.form.value['weight']
    const type = this.form.value['type'];;
    const feedingTime = this.form.value['feedingTime']; 
    this.modalController.dismiss(
      {
        pet: {
          name, weight, type, feedingTime

        },
      },
      'pet'
    );
  }

}
