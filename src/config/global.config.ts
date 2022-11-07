export const PORT = 'PORT';
export const USER_SERVICE_URL = 'USER_SERVICE_URL';
export const JWT_SECRET = 'JWT_SECRET';
export const ACCESS_SECRET = 'ACCESS_SECRET';
export const SALT_ROUNDS = 'SALT_ROUNDS';
export const FRONTEND_PATH = 'FRONTEND_PATH';
export const MAIL_AMQP_URL = 'MAIL_AMQP_URL';

export default () => ({
	[PORT]: process.env[PORT] || 3000,
	[USER_SERVICE_URL]: process.env[USER_SERVICE_URL] || 'http://localhost:3001',
	[JWT_SECRET]: process.env[JWT_SECRET] || 'JWT_SECRET',
	[SALT_ROUNDS]: process.env[SALT_ROUNDS] || 10,
	[ACCESS_SECRET]: process.env[ACCESS_SECRET] || 'ACCESS_SECRET',
	[FRONTEND_PATH]: process.env[FRONTEND_PATH] || 'http://localhost:3001',
	[MAIL_AMQP_URL]: process.env[MAIL_AMQP_URL] || 'amqp://localhost:5672',
});
