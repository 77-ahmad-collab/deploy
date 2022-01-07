// import { Injectable } from '@nestjs/common';
// import { PassportStrategy } from '@nestjs/passport';
// import { ExtractJwt, Strategy } from 'passport-jwt';
// @Injectable()
// export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
//   constructor() {
//     super({
//       jwtFormRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),

//       secretOrKey: 'helloworld',
//     });
//   }

// //   strategy = new JwtStrategy();

//   async validate(payload: any) {
//     return { userId: payload.sub, username: payload.username };
//   }
// }
