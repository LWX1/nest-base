import { AuthGuard } from '@nestjs/passport';
import { ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../../common/filterAuthDecorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    constructor(private readonly reflector: Reflector) {
        super();
    }

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
       
        const isAuth = this.reflector.getAllAndOverride<boolean>(
            IS_PUBLIC_KEY,
            [context.getHandler(), context.getClass()],
        );
        if (isAuth) {
            return true;
        }
        const ctx = context.switchToHttp();
        const request = ctx.getRequest();
        delete request.headers.authorization;
        if(request.headers.token) {
            request.headers.authorization = `Bearer ${request.headers.token}`
        }
        return super.canActivate(context);
    }
}
