import { Body, ClassSerializerInterceptor, Controller, Get, Inject, Post, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthenticatedGuard } from 'src/auth/utils/LocalGuard';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { UsersService } from 'src/users/services/users/users.service';

@Controller('users')
export class UsersController {
    constructor(@Inject('USER_SERVICE') private readonly userService: UsersService){}

    @UseGuards(AuthenticatedGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    @Get('')
    getUsers(){
        return this.userService.getUsers()
    }

    @Post('create')
    @UsePipes(ValidationPipe)
    createUser(@Body() createUserDto: CreateUserDto) {
        // console.log(createUserDto)
        return this.userService.createUser(createUserDto);
    }
}
