import { SetMetadata } from '@nestjs/common';
import { Role } from 'src/module/users/entities/user.entity';

export const ROLES_KEY = 'roles';
export const Roles = (...role: Role[]) => SetMetadata(ROLES_KEY, role);