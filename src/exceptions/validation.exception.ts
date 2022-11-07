import { HttpException, HttpStatus } from '@nestjs/common';

export interface Message {
	statusCode: number;
	key: string | string[];
	message: string;
	error: string;
}

export class ValidationException extends HttpException {
	messages: Message[];

	constructor(response: string | Message[], key?: string | string[]) {
		if (typeof response == 'string') {
			super(
				{ statusCode: 400, key: key, message: response, error: 'Validation' },
				HttpStatus.BAD_REQUEST,
			);
			return;
		}
		const messages: Message[] = response.map((message) => {
			return <Message>{
				statusCode: 400,
				key: message.key,
				message: message.message,
				error: 'Validation',
			};
		});
		if (messages.length === 1) {
			super(messages[0], HttpStatus.BAD_REQUEST);
		} else {
			super(messages, HttpStatus.BAD_REQUEST);
		}
		this.messages = response;
	}
}
