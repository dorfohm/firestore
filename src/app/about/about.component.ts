import { AngularFireModule } from '@angular/fire';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Course } from 'app/model/course';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor(private db: AngularFirestore) { }

  ngOnInit() {
    
  }

}
