import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('exercise')
export class Exercise extends BaseEntity {
	constructor(init?: Partial<Exercise>) {
		super();
		Object.assign(this, init);
	}

	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: 'int', nullable: false })
	exerciseType: number;

	@Column({ type: 'text', nullable: false })
	text: string;

	@Column({ type: 'varchar', nullable: true })
	correctAnswer?: string;
}
