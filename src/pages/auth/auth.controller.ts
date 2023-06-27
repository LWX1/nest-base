import { Controller, Post, UseGuards, Request, Response, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { Public } from '../../common/filterAuthDecorator';
import * as svgCaptcha from 'svg-captcha';

@Controller('')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @UseGuards(AuthGuard('local'))
    @Public()
    @Post('/login')
    async login(@Request() req, res) {
        return this.authService.validateUser(req.query, req.session);
    }

    // 加盐
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }

    @Public()
    @Get('/code')
    async getCode(@Request() req, @Response() res) {
        const captcha = svgCaptcha.create({
            size: 4, //生成几个验证码
            fontSize: 50, //文字大小
            width: 100, //宽度
            height: 34, //高度
            background: '#cc9966', //背景颜色
        });
        req.session.code = captcha.text; //存储验证码记录到session
        res.type('image/svg+xml');
        res.send(captcha.data);
    }
    
}

