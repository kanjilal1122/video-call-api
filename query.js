const Pool = require("pg").Pool;
const dotenv = require("dotenv");
dotenv.config();
const uuidv1 = require("uuid");
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const get_meeting_details = (req, res) => {
  pool.query("SELECT * FROM meetings ORDER BY id ASC", (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
};

const get_meeting_details_by_id = (req, res) => {
  const id = req.params.id; 

  pool.query(
    'SELECT *  FROM meetings WHERE uuid = $1',
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows);
    }
  );
};

const create_meeting = (req, res) => {
  const { meeting_name, callback_url, recording_status } = req.body;
  const uuid = uuidv1.v1();
  const created_at = Date.now();
  //console.log(meeting_name, callback_url, recording_status, uuid);
  pool.query(
    'INSERT INTO meetings(uuid , meeting_name , created_at ,callback_url  , recording_status) VALUES($1 , $2 , $3  , $4 ,$5) RETURNING *',
    [uuid, meeting_name, created_at, callback_url, recording_status],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(201).send(`create new meeting`);
    }
  );
};

module.exports = {
  create_meeting,
  get_meeting_details,
  get_meeting_details_by_id,
};
