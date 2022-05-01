import { HttpClient } from '@angular/common/http';
import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { IonInfiniteScroll, ModalController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Pets } from '../../models/Pets';
import { PetsService } from '../../services/pets.service';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { User } from 'src/app/auth/models/user.model';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-pet-log',
  templateUrl: './pet-log.component.html',
  styleUrls: ['./pet-log.component.scss'],
})
export class PetLogComponent implements OnInit {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  queryParams: string;
  allLoadedPets: Pets[] = [];
  numberOfPets = 20;
  skipPets = 0;
  authorId: User['id'];

  userId$ = new BehaviorSubject<number>(null);

  constructor(private petService: PetsService, private authService: AuthService, public modalController: ModalController ) {}

  ngOnInit() {
    this.getPets(false, '');

    this.authService.userId.pipe(take(1)).subscribe((userId: number) => {
      this.userId$.next(userId);
    });
  }

  getPets(isInitialLoad: boolean, event) {
    if (this.skipPets === 20) {
      event.target.disabled = true;

    }
    this.queryParams =`?take=${this.numberOfPets}&skip=${this.skipPets}&author=${this.authorId}`;

    this.petService.getSelectedPets(this.queryParams).subscribe((pets: Pets[])=> {
      for (let i = 0; i < pets.length; i++) {
        this.allLoadedPets.push(pets[i])
      }
      if (isInitialLoad) event.target.complete;
      this.skipPets = this.skipPets + 5;
    }, (error) => {
      console.log(error);
    })
  }

  loadData(event) {
    this.getPets(true, event)
  }

  async presentUpdateModal(petId: number) {
    console.log('EDIT PET');
    const modal = await this.modalController.create({
      component: ModalComponent,
      cssClass: 'my-custom-class2',
      componentProps: {
        petId,
      },
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
    if (!data) return;

    const newPetName = data.pet.name;
    const newPetWeight = data.pet.weight;
    const newPetType = data.pet.type;
    const newPetFeedingTime = data.pet.feedingTime;


    this.petService.updatePet(petId, newPetName, newPetWeight, newPetType, newPetFeedingTime).subscribe(() => {
      const petIndex = this.allLoadedPets.findIndex((pet: Pets) => pet.id === petId
      );
      this.allLoadedPets[petIndex].name = newPetName;
      this.allLoadedPets[petIndex].weight = newPetWeight;
      this.allLoadedPets[petIndex].type = newPetType;
      this.allLoadedPets[petIndex].feedingTime = newPetFeedingTime;
    });

  }

  deletePet(petId: number){
    this.petService.deletePet(petId).subscribe(() => {
      this.allLoadedPets = this.allLoadedPets.filter((pet: Pets)=> pet.id !== petId );
    });
  }

}
