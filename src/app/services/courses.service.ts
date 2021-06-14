import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { first, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Course } from 'app/model/course';
import { convertSnaps} from './db-utils';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  findCourseByUrl(CourseUrl: string):Observable<Course> {
    return this.db.collection('courses',
    ref => ref.where("url", "==", CourseUrl))
    .snapshotChanges()
    .pipe(
      map(snaps => {
        const courses = convertSnaps<Course>(snaps);
        return courses.length == 1 ? courses[0]: undefined;
      })
    )
    throw new Error("Method not implemented.");
  }

  constructor(private db: AngularFirestore) { }

  loadAllCourses(): Observable<Course[] >{
    return this.db.collection(
      'courses',
      ref=> ref
      .orderBy("seqNo")
      )
    .snapshotChanges()
    .pipe(map(snaps => convertSnaps<Course>(snaps)),
    first());
  }



}
