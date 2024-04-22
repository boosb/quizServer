import { Controller, Request, Post, UseGuards, Get, Body, Param } from "@nestjs/common";
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from "./auth.service";
import { JwtAuthGuard } from "./quards/jwt-auth.guard";
import { LocalAuthGuard } from "./quards/local-auth.guard";
import { ConfirmEmailDto } from "./dto/confirmEmailDto";

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ) {}

    @Post('login')
    @UseGuards(LocalAuthGuard) 
    async login(@Request() req) {
      return await this.authService.login(req.user);
    }

    @Get('profile')
    @UseGuards(JwtAuthGuard)
    getProfile(@Request() req) {
      return req.user;
    }

    @Post('confirm')
    async confirm(@Body() confirmationData: ConfirmEmailDto) {
      const {email, oldEmail} = await this.authService.decodeConfirmationToken(confirmationData.token);

      if(oldEmail) {
        return await this.authService.confirmUpdatedEmail(email, oldEmail);
      }
      return await this.authService.confirmEmail(email);
    }

    @Post('refresh-token')
    refreshToken() {
      console.log('hi')
      this.authService.refreshToken();
    }
}