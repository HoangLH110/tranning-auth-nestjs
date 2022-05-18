import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity('user-google-auth')
export class GoogleAuth {
  @ObjectIdColumn()
  id: ObjectID;
  //   @Column()
  //   firstNAme: string;
  //   @Column()
  //   lastName: string;
  //   @Column()
  //   email: string;
}

export interface GoogleAuth {
  email: string;
  name: string;
}
