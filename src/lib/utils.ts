import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export async function capitalizeParola(frase: string | undefined | null ){

  try{

    if(!frase)return
  
    const frasenUova = frase.slice(0,1).toUpperCase() +  frase.slice(1)
  
  
    return frasenUova
  }catch(errore){
    console.error('errore nel capitalize parola', errore)
  }

}


export function formDate(date:any){
  return date.toLocaleDateString('en-US')
}