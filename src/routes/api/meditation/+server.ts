import { mysqlconnFn } from "$lib/db/mysql.js";
import { json } from "@sveltejs/kit";

export async function POST({ request }) {
  const { userId, end_time, duration, notes } = await request.json();
  try {
    let mysqlconn = await mysqlconnFn();
    
    let results = await mysqlconn.query(
      `INSERT INTO innerpease_oasis.meditation_sessions (userId, end_time, duration, notes) VALUES (${userId}, "${end_time}", ${duration}, "${notes}");`
    );
    
    console.log('POST RESULT=> ', results);
    return json({ message: "The meditation session was registered!"})
  } catch (error: any) {
    const query = `INSERT INTO innerpease_oasis.meditation_sessions (userId, end_time, duration, notes) VALUES (${userId}, "${end_time}", ${duration}, "${notes}");`
    console.log('query => ', query)
    return json(
      { message: "An server error has occurred ", error: error.message },
      { status: 500 }
    );
  }
}
