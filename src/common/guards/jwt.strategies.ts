import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request as RequestType } from 'express';

interface JwtPayload {
  iat: number;
  exp: number;
  id: string;
}

@Injectable()
export class JwtAccessStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([JwtAccessStrategy.extractJWT]),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_ACCESS_SECRET,
    });
  }

  private static extractJWT(req: RequestType): string | null {
    if (req.cookies && 'access-token' in req.cookies) {
      return req.cookies['access-token'];
    }
    return null;
  }

  async validate(payload: JwtPayload): Promise<{ id: string }> {
    return { id: payload.id };
  }
}

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        JwtRefreshStrategy.extractJWT,
      ]),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_REFRESH_SECRET,
    });
  }

  private static extractJWT(req: RequestType): string | null {
    if (req.cookies && 'refresh-token' in req.cookies) {
      return req.cookies['refresh-token'];
    }
    return null;
  }

  async validate(payload: JwtPayload): Promise<{ id: string }> {
    return { id: payload.id };
  }
}
