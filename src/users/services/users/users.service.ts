import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { SerializedUser, User } from 'src/users/types';

@Injectable()
export class UsersService {
    private users: User[] = [
        {
            username: "Dev",
            password:"hello"
        }
    ]

    getUsers(){
        return this.users.map((user)=> new SerializedUser(user));
    }
}
