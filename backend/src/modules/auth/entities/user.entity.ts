import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Role } from '../../../common/enums/roles.enum';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column('simple-array')
  roles: Role[];
}
