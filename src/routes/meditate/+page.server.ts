import { mysqlconnFn } from "$lib/db/mysql";

interface UserData{
    name:string;
    id:number
}

export async function load({locals:{getSession}}):Promise<{data:UserData | null} | Error>{
   const session = await getSession();
    try{
    if(session){
        const mysqlconn = await mysqlconnFn();
        const [rows, _] = await mysqlconn.query("SELECT name, id FROM innerpease_oasis.user WHERE id = ?;", [session.user?.id]);
        if(rows.length === 0){
            return {
                data:null,
            }
        }
        const firstRow:UserData = rows[0];
        return {
            data:firstRow,
        }
    }
    return {data:null}
   }catch(error:any){
    console.error('Got and error!!!');
    console.log(error);
    return error;
   }
}