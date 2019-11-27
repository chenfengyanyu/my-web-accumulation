import { Component } from '@angular/core';
import { PhotoService } from '../services/photo.service';
import { Platform } from '@ionic/angular';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  currentImage: any;

  constructor(public photoService: PhotoService, public platform: Platform
    ) { }

  ngOnInit() {
    this.photoService.loadSaved();
    // this.platform.resize.subscribe(async () => {
    //   alert('Resize event detected');
    // });

  }
}
