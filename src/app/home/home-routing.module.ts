import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddAppointmentComponent } from './components/add-appointment/add-appointment.component';
import { CreateProfileComponent } from './components/create-profile/create-profile.component';
import { EditPetComponent } from './components/edit-pet/edit-pet.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      { path: '', component: UserProfileComponent},
      { path: 'AddAppointment', component: AddAppointmentComponent },
      { path: 'CreateProfile', component: CreateProfileComponent },
      { path: 'EditPet', component: EditPetComponent },
    ],
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
