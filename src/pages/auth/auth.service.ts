import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { GeneralException } from 'src/utils/generalException';

interface IpropsQuery{
    username: string,
    password: string,
    code: string,
}

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) { }

    async validateUser(query: IpropsQuery, session): Promise<any> {
        const {username, password, code} = query;
        if(!code) {
            GeneralException('验证码不能为空');
        }else if(code !== session.code) {
            GeneralException('验证码不正确');
        }
        
        const user = await this.usersService.findOne(username);
        if (user && user.password === password) {
            const { password, ...result } = user;
            return this.login(result)
        }else {
            GeneralException('用户名或密码错误');
        }
    }

    async login(user: any) {
        const payload = { username: user.username, userId: user.userId };
        const result = this.jwtService.sign(payload);
       
        return {
            access_token: result,
        };
    }
}
