import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { AppointmentService } from 'src/app/home/services/appointment.service';

@Component({
  selector: 'app-appointment-modal',
  templateUrl: './appointment-modal.component.html',
  styleUrls: ['./appointment-modal.component.scss'],
})
export class AppointmentModalComponent implements OnInit {
  @ViewChild('form') form: NgForm;

  @Input() appointmentId?: number;

  submissionType: 'Add' | 'Edit' = 'Add'

  constructor(public modalController: ModalController, private appointmentService: AppointmentService ) { }

  ngOnInit() {}

  onDismiss(){
    this.modalController.dismiss(null, 'dismiss')
  }

  onSubmit(){
    if (!this.form.valid) return;
    const date = this.form.value['date'];
    const description = this.form.value['description'];
    const petName = this.form.value['petName'];
    this.modalController.dismiss(
      {
        appointment : {
          date, description, petName
        },
      },
      'appointment'
    );
  }

}
