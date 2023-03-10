// import Rol from '../models/RolModel';
import Enterprises from '../models/Enterprises/EnterprisesModel';
import Inventary from '../models/Inventary/InventaryModel';
import Roles from '../models/Roles/RolesModel';
import Users from '../models/Users/UserModel';
import { encryptData } from '../utils/encryptFile';
import { RolType, UserType } from "../utils/types"


/**
 * Create initial Schema, and fill up initial data
 */
export const createDataBase = async () =>{

  const arrayRol: Array<RolType> = [
    {name: 'Admin'},
    {name: 'External'}
  ];

  const arrayUsers: Array<UserType> = [
    {email:'Josep@gmail.com', password: await encryptData('1234567'), rol_id:1},
    {email: 'external@gmail.com', password: await encryptData('4321'), rol_id: 2}
  ]
  //Roles
  await Roles.sync();
  await Enterprises.sync();
  await Inventary.sync();
 
  arrayRol.forEach((rol:RolType) => {
    Roles.create({
      name: rol.name
    })
  });

  //Users
  await Users.sync();
    arrayUsers.forEach((user:UserType) => {
     Users.create(
       { 
         email: user.email,
         password: user.password,
         rol_id: user.rol_id
       }
     )
  })

}

