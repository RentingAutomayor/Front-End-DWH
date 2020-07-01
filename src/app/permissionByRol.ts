import { Rol } from "./rol"
import { PermissionByModule } from "./permissionByModule";

export class PermissionByRol{
    rol:Rol;
    permissionByModule: PermissionByModule[];
}