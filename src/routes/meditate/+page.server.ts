import { mysqlconnFn } from "$lib/db/mysql";

interface UserData{
    name:string;
    id:number
}

export async function load():Promise<{data:UserData | null} | Error>{
   try{
    const mysqlconn = await mysqlconnFn();
    const [rows, _] = await mysqlconn.query("SELECT name, id FROM innerpease_oasis.user LIMIT 1;");
    if(rows.length === 0){
        return {
            data:null,
        }
    }
    const firstRow:UserData = rows[0];
    console.log(firstRow);
    return {
        data:firstRow,
    }
   }catch(error:any){
    console.error('Got and error!!!');
    console.log(error);
    return error;
   }
}