import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './exceptions/http-exception.filter';
import { CustomLoggerService } from './logger/custom-logger.service';
import { ValidationPipe } from './pipes/validation.pipe';

async function bootstrap() {
	// Logger for app
	const logger = new CustomLoggerService();
	const app = await NestFactory.create(AppModule, {
		logger: logger,
	});
	app.enableCors();
	app.useGlobalFilters(new HttpExceptionFilter());

	// Swagger setup
	const config = new DocumentBuilder()
		.setTitle('Education English Lang')
		.setDescription(
			'Here we can find all API methods of Education English Lang project',
		)
		.setVersion('0.01')
		.addBearerAuth()
		.build();

	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('api', app, document, {
		swaggerOptions: { defaultModelsExpandDepth: 0, docExpansion: 'none' },
	});

	// Global pipes
	app.useGlobalPipes(new ValidationPipe());

	const port = process.env.PORT || 3000;
	await app.listen(port, () => {
		logger.log(`App has started on port ${port}.`, 'Bootstrap');
	});
}
bootstrap();
