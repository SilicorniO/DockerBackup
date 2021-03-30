export default interface PermissionService {
  validate(authorization: string): boolean
  validateUser(authorization: string): string | null
}
