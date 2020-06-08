import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class TestService {
  
  constructor(private db: AngularFirestore) { }

  getTests(companie: string) {
    return this.db
      .collection('tests', (ref) => ref.where('companie', '==', companie))
      .snapshotChanges();
  }

  getTest(testId: string) {
    return this.db
      .collection('tests').doc(testId).snapshotChanges()
  }

  deleteTest(testId: string) {
    return this.db.collection('tests').doc(testId).delete();
  }

  addTest(title: string, time: number, questions, companie: string) {
    const testRef: AngularFirestoreCollection<any> = this.db.collection(`tests`);
    const data = {
      questions: questions,
      companie: companie,
      time: time,
      title: title
    }
    return testRef.add(data);
  }
}
