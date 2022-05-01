import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PetsService } from '../../services/pets.service';
import { ModalComponent } from '../modal/modal.component';


@Component({
  selector: 'app-edit-pet',
  templateUrl: './edit-pet.component.html',
  styleUrls: ['./edit-pet.component.scss'],
})
export class EditPetComponent implements OnInit {

  constructor(public modalController: ModalController, private petsService: PetsService) { }

  ngOnInit() {}

  async presentModal() {
    console.log('CREATE PET');
    const modal = await this.modalController.create({
      component: ModalComponent,
      cssClass: 'my-custom-class2',
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
    if (!data) return;
    
    return this.petsService.createPet( data.pet.name, data.pet.weight, data.pet.type, data.pet.feedingTime).subscribe();
  }
}
