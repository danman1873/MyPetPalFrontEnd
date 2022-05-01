import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll, ModalController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';
import { User } from 'src/app/auth/models/user.model';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Appointment } from '../../models/AppointmentInterface';
import { AppointmentService } from '../../services/appointment.service';
import { AppointmentModalComponent } from '../modal/appointment-modal/appointment-modal.component';

@Component({
  selector: 'app-appointment-log',
  templateUrl: './appointment-log.component.html',
  styleUrls: ['./appointment-log.component.scss'],
})
export class AppointmentLogComponent implements OnInit {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  queryParams: string;
  allLoadedAppointments: Appointment[] = [];
  numberOfAppointments = 20;
  skipAppointments = 0;
  auhtorId: User['id'];

  userId$ = new BehaviorSubject<number>(null);


  constructor(private appointmentService: AppointmentService, private authService: AuthService, public modalController: ModalController ) {}

  ngOnInit() {
    this.getAppointments(false, '');

    this.authService.userId.pipe(take(1)).subscribe((userId: number) => {
      this.userId$.next(userId);
    });
  }

  getAppointments(isInitialLoad: boolean, event) {
    if (this.skipAppointments === 20) {
      event.target.disabled = true;

    }
    this.queryParams =`?take=${this.numberOfAppointments}&skip=${this.skipAppointments}`;

    this.appointmentService.getSelectedAppointment(this.queryParams).subscribe((appointments: Appointment[])=> {
      for (let i = 0; i < appointments.length; i++) {
        this.allLoadedAppointments.push(appointments[i])
      }
      if (isInitialLoad) event.target.complete;
      this.skipAppointments = this.skipAppointments + 5;
    }, (error) => {
      console.log(error);
    })
  }

  loadData(event) {
    this.getAppointments(true, event)
  }

  async presentUpdateModal(appointmentId: number) {
    console.log('EDIT Appointment');
    const modal = await this.modalController.create({
      component: AppointmentModalComponent,
      cssClass: 'my-custom-class2',
      componentProps: {
        appointmentId,
      },
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
    if (!data) return;

    const newAppointmentDate = data.appointment.date;
    const newAppointmentDescription = data.appointment.description;
    const newPetName = data.appointment.petName;


    this.appointmentService.updateAppointment(appointmentId, newAppointmentDate, newAppointmentDescription, newPetName).subscribe(() => {
      const appointmentIndex = this.allLoadedAppointments.findIndex((appointment: Appointment) => appointment.id === appointmentId
      );
      this.allLoadedAppointments[appointmentIndex].date = newAppointmentDate;
      this.allLoadedAppointments[appointmentIndex].description = newAppointmentDescription;
      this.allLoadedAppointments[appointmentIndex].petName = newPetName;
    });

  }

  deleteAppointment(appointmentId: number){
    this.appointmentService.deleteAppointment(appointmentId).subscribe(() => {
      this.allLoadedAppointments = this.allLoadedAppointments.filter((appointment: Appointment)=> appointment.id !== appointmentId );
    });
  }

}
