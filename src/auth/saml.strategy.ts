import { PassportStrategy } from '@nestjs/passport';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { Strategy, Profile } from 'passport-saml';
import { User } from '../model/user';
import * as fs from 'fs';

@Injectable()
export class SamlStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      protocol: 'https://',
      issuer: '...',
      callbackUrl: 'https://.../auth/sso/saml/ac',
      cert: fs.readFileSync('./cert.pem', 'utf8'),
      entryPoint: 'https://...',
    });
  }

  async validate(profile: Profile) {
    try {
      console.log({ profile });
      const user: User = {
        email: profile.mail as string,
        issuer: profile.issuer as string,
      };
      return user;
    } catch (e) {
      throw new ForbiddenException('invalid attributes');
    }
  }
}
