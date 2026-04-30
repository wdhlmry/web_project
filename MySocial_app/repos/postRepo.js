import {prisma} from "../lib/prisma"



export default class PostRepo{


   static async createPost(data){
    return await prisma.post.create({
        data: {
            content: data.content,
            userId: data.userId
        }
    });
   }



   static async getAllPosts(){
    return await prisma.post.findMany({
        include: {
            user: true
        }
    });
   }


   static async getPostsByUser(userId){
    return prisma.post.findMany({
        where: {userId: Number(userId)},
        orderBy: {id: desc}
    });
   }


   static async updatePost(id, data){
    return prisma.post.update({
        where: {id: Number(id)},
        data: {
            content: data.content
        }
    });
   }


   static async deletePost(id){
    return prisma.post.delete({
        where: {id: Number(id)}
    });
   }


   static async countPostPerUser(userId){
    return prisma.post.count({
        where: {userId: Number(userId)}
    });
   }














}