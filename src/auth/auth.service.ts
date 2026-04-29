import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService, private jwtService: JwtService) { }
    
    async signIn(id: string, pass: string): Promise<any> {
        const user = this.usersService.findOne(+id);
        if (user?.password !== pass) {
            throw new UnauthorizedException();
        }
        const { password, ...result } = user;
        const payload = { sub: id, role: user.role, name: user.name };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
}
