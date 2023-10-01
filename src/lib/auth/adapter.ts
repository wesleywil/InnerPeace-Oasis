import type {
  Adapter,
  AdapterSession,
  AdapterUser,
  VerificationToken,
} from "@auth/core/adapters";
import { mysqlconnFn } from "$lib/db/mysql";
import type { Connection } from "mysql2/promise";

export function mapExpiresAt(account: any): any {
  const expires_at: number = parseInt(account.expires_at);
  return {
    ...account,
    expires_at,
  };
}

export default function MysqlAdapter(client: Connection): Adapter {
  return {
    async createVerificationToken(
      verificationToken: VerificationToken
    ): Promise<VerificationToken> {
      const { identifier, expires, token } = verificationToken;
      const sql = `INSERT INTO innerpease_oasis.verificationtoken (identifier, expires, token) VALUES ("${identifier}", "${expires}", "${token}");`;
      await client.query(sql);
      return verificationToken;
    },
    async useVerificationToken({
      identifier,
      token,
    }: {
      identifier: string;
      token: string;
    }): Promise<VerificationToken> {
      const sql = `DELETE FROM innerpease_oasis.verificationtoken WHERE identifier = "${identifier}" and token = "${token}";`;
      const result = await client.query(sql);
      return result.rowCount !== 0 ? result.rows[0] : null;
    },
    async createUser(user: Omit<AdapterUser, "id">) {
      const { name, email, emailVerified, image } = user;
      // const sql = `
      //         INSERT INTO innerpease_oasis.user (name, email, emailVerified, image) 
      //         VALUES ("${name}", "${email}", "${emailVerified}", "${image}");`;
      const sql = `INSERT INTO innerpease_oasis.user (name, email, emailVerified, image) VALUES(?,?,?,?)ON DUPLICATE KEY UPDATE name = VALUES(name), emailVerified = VALUES(emailVerified), image = VALUES(image)`;
      const values = [name, email, emailVerified, image];
      try{
        await client.query(sql, values);
        const [UserData] = await client.query('SELECT * FROM innerpease_oasis.user WHERE email = ?', [email])
        return UserData;

      }catch(error){
        console.error("Got an error");
        console.log(error);
        throw error
      }
      
    },
    async getUser(id) {
      const sql = `select * from innerpease_oasis.user where id = ${id};`;
      try {
        const result = await client.query(sql);
        return result.rowCount === 0 ? null : result.rows[0];
      } catch (e) {
        return null;
      }
    },
    async getUserByEmail(email) {
      const sql = `select * from innerpease_oasis.user where email = "${email}";`;
      console.log('EMAIL SQL=> ', sql)
      const result = await client.query(sql);
      if(result.rows && result.rows.length >0){
        return result.rows[0]
      }else{
        return null;
      }
    },
    async getUserByAccount({
      providerAccountId,
      provider,
    }): Promise<AdapterUser | null> {
      try {
        const sql = `
        select u.* from innerpease_oasis.user u join innerpease_oasis.account a on u.id = a.userId
        where 
        a.provider = "${provider}" 
        and 
        a.providerAccountId = "${providerAccountId}";`;
        const result = await client.query(sql);
        if(result.rows && result.rows.length > 0){
          return result.rows[0]
        }else{
          return null;
        }
       
      } catch (error) {
        console.error("Got an error");
        console.log(error);
        throw error;
      }
    },
    async updateUser(user: Partial<AdapterUser>): Promise<AdapterUser> {
      const fetchSql = `select * from innerpease_oasis.user where id = ${user.id};`;
      const query1 = await client.query(fetchSql);
      const oldUser = query1.rows[0];

      const newUser = {
        ...oldUser,
        ...user,
      };

      const { id, name, email, emailVerified, image } = newUser;
      const updateSql = `
              UPDATE innerpease_oasis.user set
              name = "${name}", email = "${email}", emailVerified = "${emailVerified}", image = "${image}"
              where id = ${id};`;
      const query2 = await client.query(updateSql);
      return query2.rows[0];
    },
    async linkAccount(account) {
      const sql = `
            insert into innerpease_oasis.account 
            (
              userId, 
              provider, 
              type, 
              providerAccountId, 
              access_token,
              expires_at,
              refresh_token,
              id_token,
              scope,
              session_state,
              token_type
            )
            values (${account.userId}, "${account.provider}", "${account.type}", "${account.providerAccountId}", "${account.access_token}", ${account.expires_at}, "${account.refresh_token}", "${account.id_token}", "${account.scope}", "${account.session_state}", "${account.token_type}");`;
              console.log('LINK ACCOUNT QUERY => ', sql);
            const result = await client.query(sql);
      return mapExpiresAt(result.rows[0]);
    },
    async createSession({ sessionToken, userId, expires }) {
      if (userId === undefined) {
        throw Error(`userId is undef in createSession`);
      }
      const sql = `insert into innerpease_oasis.session (userId, expires, sessionToken)
            values (${userId}, "${expires}", "${sessionToken}");`;

      const result = await client.query(sql);
      return result.rows[0];
    },

    async getSessionAndUser(sessionToken: string | undefined): Promise<{
      session: AdapterSession;
      user: AdapterUser;
    } | null> {
      if (sessionToken === undefined) {
        return null;
      }
      const result1 = await client.query(
        `select * from innerpease_oasis.session where sessionToken = "${sessionToken}";`
      );
      if (result1.rowCount === 0) {
        return null;
      }
      let session: AdapterSession = result1.rows[0];

      const result2 = await client.query(
        `select * from innerpease_oasis.user where id = ${session.userId};`
      );
      if (result2.rowCount === 0) {
        return null;
      }
      const user = result2.rows[0];
      return {
        session,
        user,
      };
    },
    async updateSession(
      session: Partial<AdapterSession> & Pick<AdapterSession, "sessionToken">
    ): Promise<AdapterSession | null | undefined> {
      const { sessionToken } = session;
      const result1 = await client.query(
        `select * from innerpease_oasis.session where sessionToken = "${sessionToken}";`
      );
      if (result1.rowCount === 0) {
        return null;
      }
      const originalSession: AdapterSession = result1.rows[0];

      const newSession: AdapterSession = {
        ...originalSession,
        ...session,
      };
      const sql = `
              UPDATE innerpease_oasis.session set
              expires = "${newSession.expires}"
              where sessionToken = "${newSession.sessionToken}";`;
      const result = await client.query(sql);
      return result.rows[0];
    },
    async deleteSession(sessionToken) {
      const sql = `delete from innerpease_oasis.session where sessionToken = ${sessionToken};`;
      await client.query(sql);
    },
    async unlinkAccount(partialAccount) {
      const { provider, providerAccountId } = partialAccount;
      const sql = `delete from innerpease_oasis.account where providerAccountId = "${providerAccountId}" and provider = "${provider}";`;
      await client.query(sql);
    },
    async deleteUser(userId: string) {
      await client.query(
        `delete from innerpease_oasis.user where id = ${userId};`
      );
      await client.query(
        `delete from innerpease_oasis.session where userId = $${userId};`
      );
      await client.query(
        `delete from innerpease_oasis.account where userId = $${userId};`
      );
    },
  };
}
