import { mysqlconnFn } from "$lib/db/mysql";
import type { MeditationData } from "../../utils/interfaces";


export async function load({locals:{getSession}}):Promise<{data:MeditationData[] | null}|Error>{
    const session = await getSession();
    try{
        if(session){
            const mysqlconn = await mysqlconnFn();
            const [rows, _] = await mysqlconn.query("SELECT*FROM innerpease_oasis.meditation_sessions WHERE userId = ?;", [session.user?.id]);
            if(rows.length === 0){
                return{
                    data:null
                }
            }
            return {
                data:rows
            }
        }
        return {data:null}
       
    }catch(error:any){
    console.error('Got and error!!!');
    console.log(error);
    return new Error('An error occurred!');
   }
}