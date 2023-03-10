import { makeRequest } from "../utils/https";
import Enterprises from "../models/Enterprises/EnterprisesModel";
import { API_EMAIL_SERVICE } from "../utils/constants";
import { EnterpriseType, ResponseString } from "../utils/types";
import Inventary from "../models/Inventary/InventaryModel";

export const getEnterprises = async () =>  await Enterprises.findAll({attributes: ['NIT', 'enterpriseName','address','phoneNumber']});
 


export const createEnterprise = async (enterprise: EnterpriseType) => {
  console.log(`ENTERPRISE DATA => ${JSON.stringify(enterprise)}`);
  
 return await Enterprises.create({
    NIT: enterprise.NIT,
    enterpriseName: enterprise.enterpriseName,
    address: enterprise.address,
    phoneNumber: enterprise.phoneNumber
  });
  
}; 

export const deleteEnterprise = async (nit: number) => {
   const inventary = await Inventary.findAll({ where: { enterpriseNIT: nit } });

  if(inventary.length > 0) {
    throw new Error('Cannot remove this Enterprise if has articles');
  } 

  await Enterprises.destroy({ where: { NIT: nit } });
}


export const sendEmailWithEnterprises = async(emails:any) => {
  console.log('Correos =>'+ emails);
  
 const enterprises = await getEnterprises();
 let message= '';

 

 enterprises.forEach((enterprise: any) => {
    message += `NIT: ${enterprise.NIT}, Enterprise: ${enterprise?.enterpriseName}, address: ${enterprise?.address}, Phone number: ${enterprise?.phoneNumber} \n`
 });

 console.log(message);

 
 const body = {
  emails : emails,
  message: message
 }

await makeRequest({
  url: API_EMAIL_SERVICE,
  method: 'POST',
  body
 })
}


