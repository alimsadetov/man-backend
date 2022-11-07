import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import globals from './config/global.config';
import pgConfig from './config/postgres-db.config';
import { DatabaseModule } from './db/db.module';
import { LoggerModule } from './logger/logger.module';
import { LoggerMiddleware } from './middlewares/log-incoming-request.middleware';
import { ExerciseModule } from './modules/exercise/exercise.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: `.${process.env.NODE_ENV}.env`,
			load: [globals, pgConfig],
		}),
		DatabaseModule,
		LoggerModule,
		ExerciseModule,
	],
	controllers: [],
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(LoggerMiddleware).forRoutes('*');
	}
}
