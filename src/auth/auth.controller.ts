import { Controller, Request, Post, UseGuards, Get } from "@nestjs/common";
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from "./auth.service";
import { JwtAuthGuard } from "./quards/jwt-auth.guard";
import { LocalAuthGuard } from "./quards/local-auth.guard";

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ) {}

    @Post('login')
    @UseGuards(LocalAuthGuard) 
    async login(@Request() req) {
      return this.authService.login(req.user);
    }

    @Get('profile')
    @UseGuards(JwtAuthGuard)
    getProfile(@Request() req) {
      return req.user;
    }
}