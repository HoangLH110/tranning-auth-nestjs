import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectIdColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum VerifyType {
  INVALID = 'invalid',
  PENDING = 'pending',
  APPROVALED = 'approved',
}

export enum Role {
  ADMIN = 'admin',
  USER1 = 'user',
}

@Entity('users')
export class User {
  Role: Role;
  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
  @ObjectIdColumn({ name: 'id' })
  id: string;
  @Column()
  name: string;
  @Column()
  phoneNumber: string;
  @Column()
  email: string;
  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;
  @UpdateDateColumn()
  updated_at: Date;
  @Column({ type: 'enum', enum: Role, default: Role.USER1 })
  public role: Role;
  @Column()
  username: string;
  @Column()
  password: string;

  @Column('enum', {
    enum: VerifyType,
    default: VerifyType.APPROVALED,
  })
  email_approval: string;

  @Column('enum', {
    enum: VerifyType,
    default: VerifyType.APPROVALED,
  })
  phoneNumber_approval: string;

  @Column('enum', {
    enum: VerifyType,
    default: VerifyType.APPROVALED,
  })
  username_approval: string;

  @Column('enum', {
    enum: VerifyType,
    default: VerifyType.APPROVALED,
  })
  password_approval: string;
}

// export interface User {
//   email: string;
//   name: string;
// }
