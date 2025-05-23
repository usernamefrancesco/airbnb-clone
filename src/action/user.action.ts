'use server'
import prisma from "@/lib/prisma";
import { auth, currentUser } from "@clerk/nextjs/server"


export async function creaUserDb(){
    try{

        const user = await currentUser()
    
        if(!user?.id)return;
    
        console.log('cerca user id', user.id)
        const cercaUtente = await prisma.user.findUnique({
            where:{
                clerkId: user?.id
            }
        })
    
        if(cercaUtente) return cercaUtente;
    
        const nuovoUtente = await prisma.user.create({
            data: {
                clerkId: user!.id,
                nome: user!.firstName as string || '',
            }
        })
    
    
        return nuovoUtente
    }catch(errore){
        console.error('ERRORE NEL DB CREA USER DB', errore)
    }
}


export async function getUserImage(){
    const user = await currentUser()

    if(!user)return;


    return user.imageUrl

}

export async function getUserIdDB(clerkId: string ){
    try{
        if(!clerkId)return;
        const userIdAuth = await prisma.user.findUnique({
            where:{
                clerkId: clerkId
            }
        })
        return userIdAuth?.id
    }catch(errore){
        console.error('getUserId dal db', errore)
    }
}