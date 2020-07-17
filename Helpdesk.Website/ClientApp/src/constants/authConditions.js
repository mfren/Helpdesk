import * as ROLES from './roles';

export const withAnyUser = user => !!user;
export const withAdmin = user => !!user.roles[ROLES.ADMIN]