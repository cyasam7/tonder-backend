import { SetMetadata } from '@nestjs/common';

export enum ERoles {
  GUEST_USER = 'guest_user',
  ADMIN = 'admin',
}

export const ROLES_KEY = 'role';

export const Roles = (...roles: ERoles[]) => SetMetadata(ROLES_KEY, roles);
