import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { ExerciseService } from './exercise.service';

@Controller('exercise')
export class ExerciseController {
	constructor(private readonly exerciseService: ExerciseService) {}

    @Get('get-exercise/:id')
	async getExercise(@Param('id') id: number) {
		return await this.exerciseService.getRandomExerciseByExerciseType(id);
	}

	@Post('add-exercise')
	async addExercise(@Body() { exerciseType, text, correctAnswer }: {exerciseType: number, text: string, correctAnswer: string}) {
		return await this.exerciseService.saveExercise(exerciseType, text, correctAnswer);
	}

    @Post('register')
	async register(@Body() { username, password, passwordConfirm }: {username: string, password: string, passwordConfirm: string}) {
		return await this.exerciseService.register(username, password, passwordConfirm);
	}

    @Post('login')
	async login(@Body() { username, password }: {username: string, password: string}) {
		return await this.exerciseService.login(username, password);
	}
}
