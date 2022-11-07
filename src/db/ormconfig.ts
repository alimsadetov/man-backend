import { DataSource } from 'typeorm';

// You can load you .env file here synchronously using dotenv package (not installed here),
import * as dotenv from 'dotenv';
import * as fs from 'fs';
const environment = process.env.NODE_ENV || 'development';
let data: any = {};
try {
	data = dotenv.parse(fs.readFileSync(`.${environment}.env`));
} catch (e) {
	console.log('Could not parse env file');
}

// Check typeORM documentation for more information.
export const config: DataSource = new DataSource({
	type: 'postgres',
	host: process.env.POSTGRES_HOST || data.POSTGRES_HOST || 'localhost',
	port: Number(process.env.POSTGRES_PORT) || data.POSTGRES_PORT || 5432,
	username: process.env.POSTGRES_USER || data.POSTGRES_USER || 'postgres',
	password: process.env.POSTGRES_PASSWORD || data.POSTGRES_PASSWORD || 'pass',
	database: process.env.POSTGRES_DB || data.POSTGRES_DB || 'education_chess',
	entities: [__dirname + '/../**/*.entity{.ts,.js}'],

	// We are using migrations, synchronize should be set to false.
	synchronize: false,

	// Run migrations automatically,
	// you can disable this if you prefer running migration manually.
	migrationsRun: true,
	logging: true,
	logger: 'file',

	// Allow both start:prod and start:dev to use migrations
	// __dirname is either dist or src folder, meaning either
	// the compiled js in prod or the ts in dev.
	migrations: ['dist/migrations/*.js'],
});
