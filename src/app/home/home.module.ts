import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { HeaderComponent } from './components/header/header.component'
import { ProfileSummaryComponent } from './components/profile-summary/profile-summary.component';
import { PetLogComponent } from './components/pet-log/pet-log.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { EditPetComponent } from './components/edit-pet/edit-pet.component';
import { CreateProfileComponent } from './components/create-profile/create-profile.component';
import { AddAppointmentComponent } from './components/add-appointment/add-appointment.component';
import { PopoverComponent } from './components/header/popover/popover.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { ModalComponent } from './components/modal/modal.component';
import { AppointmentLogComponent } from './components/appointment-log/appointment-log.component';
import { AppointmentModalComponent } from './components/modal/appointment-modal/appointment-modal.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
  ],
  declarations: [HomePage, HeaderComponent, PopoverComponent, ProfileSummaryComponent, PetLogComponent, CalendarComponent, EditPetComponent, CreateProfileComponent, AddAppointmentComponent, UserProfileComponent, ModalComponent, AppointmentLogComponent, AppointmentModalComponent],
})
export class HomePageModule {}
