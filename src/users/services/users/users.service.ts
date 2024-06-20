import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { CreateCustomerDto } from 'src/customers/dtos/CreateCustomer.dto';
import { User as UserEntity } from 'src/typeorm';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { SerializedUser, User } from 'src/users/types';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>) {

    }

    private users: User[] = [
        {
            username: "Dev",
            password:"hello"
        }
    ]

    getUsers(){
        return this.users.map((user)=> new SerializedUser(user));
    }

    createUser(createUserDto: CreateUserDto){   
        this.userRepository.create(createUserDto)
        return this.userRepository.save(createUserDto)
    }
}
