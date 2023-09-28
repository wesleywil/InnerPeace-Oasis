import { mysqlconnFn } from "$lib/db/mysql";
import type { MeditationData } from "../../utils/interfaces";


export async function load():Promise<{data:MeditationData[] | null}|Error>{
    try{
        const mysqlconn = await mysqlconnFn();
        const [rows, _] = await mysqlconn.query("SELECT*FROM innerpease_oasis.meditation_sessions;");
        if(rows.length === 0){
            return{
                data:null
            }
        }
        return {
            data:rows
        }
    }catch(error:any){
    console.error('Got and error!!!');
    console.log(error);
    return new Error('An error occurred!');
   }
}