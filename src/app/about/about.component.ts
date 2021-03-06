import { AngularFireModule } from '@angular/fire';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Course } from 'app/model/course';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { AngularFirestore } from '@angular/fire/firestore';
import { of } from 'rxjs';

@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor(private db: AngularFirestore) { }

  ngOnInit() {

  }

  save(){
    const firebaseCourseRef =
    this.db.doc('/courses/dEZHuUR5MnaJA2uqedDy').ref;

    const rxjsCourseRef =
    this.db.doc('/courses/LM5r01Grh3R04oouJikx').ref;

    const batch = this.db.firestore.batch();

    batch.update(firebaseCourseRef, {titles: {description: 'Firebase Course'}});
    batch.update(rxjsCourseRef, {titles: {description: 'rxJs Course'}});
    const batch$ = of(batch.commit());
    batch$.subscribe();
  }

  async runTransaction(){
    const newCounter = await this.db.firestore
    .runTransaction(async transaction => {
      console.log('Running transaction...');
      const courseRef = this.db.doc('/courses/dEZHuUR5MnaJA2uqedDy').ref;
      const snap = await transaction.get(courseRef);
      const course = <Course> snap.data();
      const lessonsCount = course.lessonsCount + 1;
      transaction.update(courseRef, {lessonsCount});
      return lessonsCount;


    });

    console.log("result = ", newCounter);

  }

}
