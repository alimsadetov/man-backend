import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import {
	ValidationException,
	Message,
} from '../exceptions/validation.exception';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
	async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
		const obj = plainToClass(metadata.metatype, value);
		const errors = await validate(obj);

		if (errors.length) {
			const messages: Message[] = errors.map((error) => {
				return <Message>{
					key: error.property,
					message: Object.values(error.constraints).join(', '),
				};
			});
			throw new ValidationException(messages);
		}
		return value;
	}
}
