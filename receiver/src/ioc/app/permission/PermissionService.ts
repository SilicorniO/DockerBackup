export default interface PermissionService {
  validate(authorization: string): boolean
}
