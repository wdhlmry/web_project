import {prisma} from "../lib/prisma";


export default class UserRepo{



    static async createUser(data){
        return await prisma.user.create({
            data: {
                username: data.username,
                email: data.email,
                password: data.password
            }
        });
    }




    static async findByEmail(email){
        return await prisma.user.findUnique({
            where: { email }
        });
    }




    static async getAllUsers(){
        return await prisma.user.findMany();
    }





    static async getUserById(id){
        return prisma.user.findUnique({
            where: {id: Number(id)}
        })
    }



    static async updateUser(id, data){
        return prisma.user.update({
            data: {
                username: data.username,
                email: data.email
            }
        });
    }


    static async deleteUser(id){
        return prisma.user.delete({
            where: {id: Number(id)}
        });
    }


    static async countUsers(){
        return prisma.user.count();
    }











}