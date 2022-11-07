import {
	Inject,
	Injectable,
	UnprocessableEntityException,
} from '@nestjs/common';
import { ValidationException } from 'src/exceptions/validation.exception';
import { Exercise } from './entities/exercise.entity';
import {User} from './entities/user.entity'

@Injectable()
export class ExerciseService {
	constructor(
	) {}

    async saveExercise(exerciseType: number, text: string, correctAnswer: string){
        const exercise: Exercise = <Exercise>{
            exerciseType: exerciseType,
            text: text,
            correctAnswer: correctAnswer
        }
        const saved = await Exercise.save(exercise)
        return saved
    }

    async getRandomExerciseByExerciseType(exerciseType: number){
        const foundExercises = await Exercise.find({where: {exerciseType: exerciseType}})
        const randomIndex = Math.floor(Math.random() * (foundExercises.length));
        return foundExercises[randomIndex]
    }

    register(username: string, password: string, passwordConfirm: string){
        if (password!==passwordConfirm){
            throw new ValidationException('подтвреждение пароля не совпадает с паролем', password)
        }
        User.save({username, password})
    }

    async login(username: string, password: string){
        const foundUser = await User.findOne({where: {username: username, password: password}})
        if (foundUser){
            return foundUser
        }
        throw new UnprocessableEntityException('нет такого юзера')
    }
}
