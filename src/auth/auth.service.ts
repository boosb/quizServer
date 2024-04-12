import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../user/user.service';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { IUser } from 'src/types/user';
import { ConfigService } from '@nestjs/config';
import { VerificationTokenPayload } from 'src/types/verificationTokenPayload';
import { createTransport } from 'nodemailer';
import * as Mail from 'nodemailer/lib/mailer';

@Injectable()
export class AuthService {
  private nodemailerTransport: Mail;
  
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
    //@InjectRepository(Role) private readonly roleRepository: Repository<Role>,
  ) {
    this.nodemailerTransport = createTransport({
      host: 'smtp.mail.ru',
      port: 465,
      secure: true, // use SSL
      auth: {
        user: configService.get('EMAIL_USER'),
        pass: configService.get('EMAIL_PASSWORD'),
      }
    });
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.getUser(email);

    if(!user) {
      throw new UnauthorizedException('User not found!');
    }

    const passwordIsMatch = await argon2.verify(user.password, password);

    if(!passwordIsMatch) {
      throw new UnauthorizedException('Password are incorrect!'); 
    }
    
    return user;
  }

  async login(user: IUser) {
    const {id, email, alias, avatar, role, isEmailConfirmed} = user;
    return {
      id, 
      email,
      alias,
      avatar,
      role,
      isEmailConfirmed,
      token: this.jwtService.sign({
        id: user.id, 
        email: user.email
      })
    }
  }

  public sendVerificationLink(email: string, oldEmail: string | null) {
    const payload: VerificationTokenPayload = { email, oldEmail };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_VERIFICATION_TOKEN_SECRET'),
      expiresIn: `${this.configService.get('JWT_VERIFICATION_TOKEN_EXPIRATION_TIME')}s`
    });
 
    const url = `${this.configService.get('EMAIL_CONFIRMATION_URL')}?token=${token}`;
 
    const text = `Welcome to the application Quiz. To confirm the email address, click here ${url}`;

    return this._sendMail({
      from: this.configService.get('EMAIL_USER'),
      to: email,
      subject: 'Email confirmation',
      text,
    });
  }

  public async confirmUpdatedEmail(email: string, oldEmail: string) {
    const user = await this.usersService.getUser(oldEmail);

    if(!user) {
      throw new BadRequestException('Oops, something went wrong!');
    }

    await this.usersService.updateUserEmail(user.id, {email});
    await this.usersService.markEmailAsConfirmed(email);

    return await this.usersService.getUser(email);
  }

  public async confirmEmail(email: string) {
    const user = await this.usersService.getUser(email);
    if (user.isEmailConfirmed) {
      throw new BadRequestException('Email already confirmed!');
    }

    await this.usersService.markEmailAsConfirmed(email);

    return await this.usersService.getUser(email);
  }
 
  public async decodeConfirmationToken(token: string) {
    try {
      const payload = await this.jwtService.verify(token, {
        secret: this.configService.get('JWT_VERIFICATION_TOKEN_SECRET'),
      });

      if (typeof payload === 'object' && 'email' in payload && 'oldEmail' in payload) {
        return {
          email: payload.email,
          oldEmail: payload.oldEmail
        };
      }
      throw new BadRequestException();
    } catch (error) {
      if (error?.name === 'TokenExpiredError') {
        throw new BadRequestException('Email confirmation token expired');
      }
      throw new BadRequestException('Bad confirmation token');
    }
  }

  async _sendMail(options: Mail.Options) {
    try {
      return await this.nodemailerTransport.sendMail(options);
    } catch (error) {
      throw new BadRequestException('The server was unable to send the message!');
    }
  }
}
