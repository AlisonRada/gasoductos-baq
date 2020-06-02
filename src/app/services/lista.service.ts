import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class CrudService {
  constructor(public db: AngularFirestore) {}

  getAvatars() {
    return this.db.collection('/avatar').valueChanges();
  }

  getUser(userKey: string) {
    return this.db.collection('employees').doc(userKey).snapshotChanges();
    
  }

  updateUser(userKey, value) {
    value.nameToSearch = value.name.toLowerCase();
    return this.db.collection('employees').doc(userKey).set(value);
  }

  deleteUser(userKey) {
    return this.db.collection('employees').doc(userKey).delete();
  }

  getUsers(companie) {
    return this.db
      .collection('employees', (ref) => ref.where('companie', '>=', companie))
      .snapshotChanges();
  }

  searchUsers(searchValue) {
    return this.db
      .collection('employees', (ref) =>
        ref
          .where('nameToSearch', '>=', searchValue)
          .where('nameToSearch', '<=', searchValue + '\uf8ff')
      )
      .snapshotChanges();
  }

  searchUsersByAge(value) {
    return this.db
      .collection('users', (ref) => ref.orderBy('age').startAt(value))
      .snapshotChanges();
  }

  available(userKey,available){
    if(available==1){
      return this.db.collection('employees').doc(userKey).update({
        available: 0
      });
    }else{
      return this.db.collection('employees').doc(userKey).update({
        available: 1
      });
    }
   
  }

  createUser(value, avatar) {
    return this.db.collection('employees').add({
      name: value.name,
      nameToSearch: value.name.toLowerCase(),
      tipoDocumento: value.tipoDocumento,
      numeroDocumento: value.id,
      password: value.password,
      address: value.address,
      avatar: avatar,
      companie: 'a',
      available: 1,
    });
  }
}
