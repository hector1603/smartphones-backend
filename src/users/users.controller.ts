import { Controller, Post, Body, Get, UsePipes, ValidationPipe, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { GetUser } from './get-user.decorator';
  
@Controller('users')
export class UsersController {
constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
) {}

@Post()
@UsePipes(ValidationPipe)
create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
}

@Post('login')
@UsePipes(ValidationPipe)
login(@Body() loginUserDto: LoginUserDto) {
    return this.usersService.login(loginUserDto);
}

@Get('profile')
@UseGuards(AuthGuard('jwt'))
@GetUser()
profile(@Req() req) {
    return this.usersService.profile(req.user);
}
}
