import { createParamDecorator, ExecutionContext } from '@nestjs/common';


export const Owner = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    console.log(request.user)
    console.log(ctx)

    return request.user;
  },
);