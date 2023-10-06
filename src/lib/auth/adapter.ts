import type {
  Adapter,
  AdapterSession,
  AdapterUser,
  VerificationToken,
} from "@auth/core/adapters";

import type { Connection } from "mysql2/promise";

function convertToMySQLDatetime(date: Date):string{
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');
  const hours = String(date.getUTCHours()).padStart(2, '0');
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');
  const seconds = String(date.getUTCSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
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
      const [rows, _] = await client.query(sql);
      if(rows.length === 0){
        return {} as VerificationToken
      }
      return rows[0];
    },
    async createUser(user: Omit<AdapterUser, "id">) {
      const { name, email, emailVerified, image } = user;
      const sql = `INSERT INTO innerpease_oasis.user (name, email, emailVerified, image) VALUES(?,?,?,?)ON DUPLICATE KEY UPDATE name = VALUES(name), emailVerified = VALUES(emailVerified), image = VALUES(image)`;
      const values = [name, email, emailVerified, image];
      try{
        await client.query(sql, values);
        const [rows, _] = await client.query('SELECT * FROM innerpease_oasis.user WHERE email = ?', [email])
        if(rows.length === 0){
          return null
        }
        return rows[0];

      }catch(error){
        console.error("Got an error");
        console.log(error);
        throw error
      }
      
    },
    async getUser(id) {
      const sql = `select * from innerpease_oasis.user where id = ${id};`;
      try {
        const [rows, _] = await client.query(sql);
        if(rows.length === 0){
          return null;
        }
        return rows[0]
      } catch (e) {
        return null;
      }
    },
    async getUserByEmail(email) {
      const sql = `SELECT * FROM innerpease_oasis.user WHERE email = "${email}";`;
      
      const [rows, _] = await client.query(sql);
      if(rows.length === 0){
       
        return null;
      }
      
      return rows[0];
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
        const[rows, _] = await client.query(sql);
        if(rows.length === 0){
          return null
        }
        return rows[0]
       
      } catch (error) {
        console.error("Got an error");
        console.log(error);
        throw error;
      }
    },
    async updateUser(user: Partial<AdapterUser>): Promise<AdapterUser> {
      const fetchSql = `select * from innerpease_oasis.user where id = ${user.id};`;
      const [rows, _] = await client.query(fetchSql);
      if(rows.length === 0){
        return {} as AdapterUser
      }
      const oldUser = rows[0];
      const newUser = {
        ...oldUser,
        ...user,
      };

      const { id, name, email, emailVerified, image } = newUser;
      const updateSql = `
              UPDATE innerpease_oasis.user set
              name = "${name}", email = "${email}", emailVerified = "${emailVerified}", image = "${image}"
              where id = ${id};`;
      await client.query(updateSql);
      const [rows2, _2] = await client.query('SELECT * FROM innerpease_oasis.user WHERE email = ?', [email]) 
      return rows2[0];
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
            
            await client.query(sql);
            const [rows, _] = await client.query('SELECT * FROM innerpease_oasis.account WHERE userId = ?', [account.userId]);
            
      return rows[0];
    },
    async createSession({ sessionToken, userId, expires }) {
      if (userId === undefined) {
        throw Error(`userId is undef in createSession`);
      }
      const expiresDate = convertToMySQLDatetime(expires);
      const sql = `insert into innerpease_oasis.session (userId, expires, sessionToken)
            values (${userId}, "${expiresDate}", "${sessionToken}");`;
      await client.query(sql);
      const [rows, _] = await client.query(`SELECT * FROM innerpease_oasis.session WHERE userId = ${userId}`);
      return rows[0];
    },

    async getSessionAndUser(sessionToken: string | undefined): Promise<{
      session: AdapterSession;
      user: AdapterUser;
    } | null> {
      if (sessionToken === undefined) {
        return null;
      }
      const [result1, _] = await client.query(
        `select * from innerpease_oasis.session where sessionToken = "${sessionToken}";`
      );
      if (result1 === 0) {
        return null;
      }
      let session: AdapterSession = result1[0];

      const [result2, _2] = await client.query(
        `select * from innerpease_oasis.user where id = ${session.userId};`
      );
      if (result2 === 0) {
        return null;
      }
      const user = result2[0];
      return {
        session,
        user,
      };
    },
    async updateSession(
      session: Partial<AdapterSession> & Pick<AdapterSession, "sessionToken">
    ): Promise<AdapterSession | null | undefined> {
      const { sessionToken } = session;
      const [result1, _] = await client.query(
        `select * from innerpease_oasis.session where sessionToken = "${sessionToken}";`
      );
      if (result1 === 0) {
        return null;
      }
      const originalSession: AdapterSession = result1[0];

      const newSession: AdapterSession = {
        ...originalSession,
        ...session,
      };
      const expiresDate = convertToMySQLDatetime(newSession.expires)
      const sql = `
              UPDATE innerpease_oasis.session set
              expires = "${expiresDate}"
              where sessionToken = "${newSession.sessionToken}";`;
      await client.query(sql);
      const [result, _2] = await client.query('SELECT*FROM innerpease_oasis.session WHERE sessionToken = "$"', [newSession.sessionToken])
      return result[0];
    },
    async deleteSession(sessionToken) {
      const sql = `delete from innerpease_oasis.session where sessionToken = "${sessionToken}";`;
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
