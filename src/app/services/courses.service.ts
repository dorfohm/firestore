import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { first, map } from 'rxjs/operators';
import { from, Observable } from 'rxjs';
import { Course } from 'app/model/course';
import { convertSnaps } from './db-utils';
import { CourseResolver } from './course.resolver';
import { Lesson } from 'app/model/lesson';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  saveCourse(courseId: string, changes: Partial<Course>):Observable<any> {
   return from (this.db.doc(`courses/${courseId}`).update(changes));
  }

  constructor(private db: AngularFirestore) { }

  loadAllCourses(): Observable<Course[]> {
    return this.db.collection(
      'courses',
      ref => ref
        .orderBy("seqNo")
    )
      .snapshotChanges()
      .pipe(map(snaps => convertSnaps<Course>(snaps)),
        first());
  }

  findCourseByUrl(courseUrl: string): Observable<Course> {
    return this.db.collection('courses',
      ref => ref.where("url", "==", courseUrl))
      .snapshotChanges()
      .pipe(
        map(snaps => {
          const courses = convertSnaps<Course>(snaps);
          return courses.length == 1 ? courses[0] : undefined;
        }),
        first());
  }

  findLessons(courseId: string,
    pageNumber = 0, pageSize = 3): Observable<Lesson[]> {
    return this.db.collection(`courses/${courseId}/lessons`,
      ref => ref.orderBy('seqNo')
      .limit(pageSize)
      .startAfter (pageNumber * pageSize)
      ).snapshotChanges()
      .pipe(
        map(snaps => convertSnaps<Lesson>(snaps)),
        first()
      )
  }



}
