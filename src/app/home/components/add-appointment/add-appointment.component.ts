import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AppointmentService } from '../../services/appointment.service';
import { AppointmentModalComponent } from '../modal/appointment-modal/appointment-modal.component';

@Component({
  selector: 'app-add-appointment',
  templateUrl: './add-appointment.component.html',
  styleUrls: ['./add-appointment.component.scss'],
})
export class AddAppointmentComponent implements OnInit {

  constructor(public modalController: ModalController, private appointmentService: AppointmentService) { }

  ngOnInit() {}

  async presentModal() {
    console.log('CREATE APPOINTMENT');
    const modal = await this.modalController.create({
      component: AppointmentModalComponent,
      cssClass: 'my-custom-class2',
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
    if (!data) return;
    
    return this.appointmentService.createAppointment( data.appointment.date, data.appointment.description, data.appointment.petName).subscribe();
  }
}
