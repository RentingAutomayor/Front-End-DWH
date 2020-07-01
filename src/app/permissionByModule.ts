import { Permission } from "./Permission";
import { Module } from "./module";

export class PermissionByModule{
    id:number;
    lsPermission:Permission[];
    module:Module;
}