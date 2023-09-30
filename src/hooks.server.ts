import { SvelteKitAuth } from "@auth/sveltekit";
import Google from "@auth/core/providers/google";
import MysqlAdapter from "$lib/auth/adapter";
import { GOOGLE_ID, GOOGLE_SECRET, AUTH_SECRET } from "$env/static/private";
import { mysqlconnFn } from "$lib/db/mysql";
import type { User } from "@auth/core/types";

let mysqlconn = await mysqlconnFn();

interface CustomUser{
    id?: string | null | undefined;
    name?: string | null | undefined;
    email?: string | null | undefined;
    image?: string | null | undefined;
};

export const handle = SvelteKitAuth({
    adapter:MysqlAdapter(mysqlconn),
      providers: [Google({ clientId: GOOGLE_ID, clientSecret: GOOGLE_SECRET })],
      secret:AUTH_SECRET,
      callbacks:{
        async session({session, user}:{session:any, user:CustomUser}){
            if(session.user){
                session.user.id = user.id as string;
            }
            return Promise.resolve(session)
        }
    }
    });
