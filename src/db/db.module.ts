import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './ormconfig';

export function DatabaseOrmModule(): DynamicModule {
	return TypeOrmModule.forRoot(config.options);
}
@Module({
	imports: [DatabaseOrmModule()],
})
export class DatabaseModule {}
