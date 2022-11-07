import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class User extends BaseEntity {
	constructor(init?: Partial<User>) {
		super();
		Object.assign(this, init);
	}

	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: 'varchar', nullable: false })
	username: string;

	@Column({ type: 'varchar', nullable: false })
	password: string;
}
