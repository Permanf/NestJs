import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { CreateCustomerDto } from 'src/customers/dtos/CreateCustomer.dto';
import { User as UserEntity } from 'src/typeorm';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { SerializedUser, User } from 'src/users/types';
import { encodePassword } from 'src/utils/bcrypt';
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
        const password = encodePassword(createUserDto.password)
        console.log(password)
        const newUser = this.userRepository.create({...createUserDto , password})
        return this.userRepository.save(newUser)
    }

    findUserByUsername(username: string) {
        console.log(username)
        return this.userRepository.findOne({ where: { username } })
    }

    findUserById(id: number) {
        return this.userRepository.findOne({ where: { id } })
    }
}
