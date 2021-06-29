const e = require('express')
const express = require('express')
const router = express.Router()
const db = require('../models/index')

// 登録済みbox情報取得
router.get('/box', async (req, res, next) => {
  const client = await db.pool.connect()

	let reqData = req.query;

  let fetchSql = 'SELECT * FROM box '
  let fetchData = []

  if(!reqData.boxno && !reqData.email) {
    res.status(500).json({message:'missing parameters'})
    client.release()
    return
  } else if(reqData.boxno && !reqData.email) {
    fetchSql = fetchSql + 'WHERE boxno = $1::int'
    fetchData = [reqData.boxno]
  } else if(!reqData.boxno && reqData.email) {
    fetchSql = fetchSql + 'WHERE email = $1::text'
    fetchData = [reqData.email]
  } else {
    fetchSql = fetchSql + 'WHERE boxno = $1::int AND email = $2::text'
    fetchData = [reqData.boxno, reqData.email]
  }

  const fetchRecs = await client.query(fetchSql, fetchData)

  client.release()
  if (fetchRecs === null) {
    res.status(500).json({message:'internal error'})
  } else if(fetchRecs.rows.length !== 1) {
    res.status(500).json({message:'no data available',"boxno":reqData.boxno,"email":reqData.email})
  } else {
    res.send( fetchRecs.rows[0] )
  }
})

// box情報登録
router.post('/box', async (req, res, next) => {

  const client = await db.pool.connect()

  const reqData = req.body;
  
  if(!reqData.email) {
    res.status(500).json({message:'missing parameters'})
    client.release()
    return
  } 

  const checkSql = 'SELECT * FROM box WHERE email = $1::text'
  const checkRecs = await client.query(checkSql, [reqData.email])
  if (checkRecs === null) {
    res.status(500).json({message:'internal error', point:'checkRecs'})
    client.release()
    return
  } else if(checkRecs.rows.length > 0) {
    res.send( checkRecs.rows[0] )
    client.release()
    return
  }

  try {
    await client.query('BEGIN')

    const fetchSql = 'SELECT * FROM box WHERE email IS NULL ORDER BY random() LIMIT 1 FOR UPDATE'
    const fetchRecs = await client.query(fetchSql, [])
  
    if (fetchRecs === null) {
      res.status(500).json({message:'internal error', point:'fetchRecs'})
      client.release()
      return
    } else if(fetchRecs.rows.length === 0) {
      res.status(500).json({message:'all boxes has been assigned.'})
      client.release()
      return
    }
  
    const box = fetchRecs.rows[0]
    box.email = reqData.email
  
    const updateSql = 'UPDATE box SET email = $1::text WHERE boxno = $2::int and email IS NULL'
    const updateRecs = await client.query(updateSql, [box.email, box.boxno])
  
    if(updateRecs === null) {
      await client.query('ROLLBACK')
      res.status(500).json({message:'internal error', point:'updateRecs'})
    } else if (updateRecs.rowCount !== 1) {
      await client.query('ROLLBACK')
      res.status(500).json({message:'internal error', point:'updateRow'})
    } else {
      await client.query('COMMIT')
      res.send( box )
    }

  } catch(e) {
    await client.query('ROLLBACK')
    res.status(500).json({message: 'internal error'})
  } finally {
    client.release()
  }

})

// box情報更新
router.put('/box', async (req, res, next) => {

  const client = await db.pool.connect()

  try {
    await client.query('BEGIN')

    let reqData = req.body;
  
    const fetchSql = 'SELECT * FROM box WHERE boxno = $1::int AND email = $2::text FOR UPDATE'
    const fetchRecs = await client.query(fetchSql, [reqData.boxno, reqData.email])
  
    if (fetchRecs === null) {
      res.status(500).json({message:'internal error', point:'fetchRecs'})
      client.release()
      return
    } else if(fetchRecs.rows.length === 0) {
      res.status(500).json({message:'No data available.'})
      client.release()
      return
    }
  
    const box = fetchRecs.rows[0]
    box.request = reqData.request
  
    const updateSql = 'UPDATE box SET request = $1::text WHERE boxno = $2::int and email = $3::text'
    const updateRecs = await client.query(updateSql, [box.request, box.boxno, box.request])
  
    if(updateRecs === null) {
      await client.query('ROLLBACK')
      res.status(500).json({message:'internal error', point:'updateRecs'})
    } else if (updateRecs.rowCount !== 1) {
      await client.query('ROLLBACK')
      res.status(500).json({message:'internal error', point:'updateRow'})
    } else {
      await client.query('COMMIT')
      res.send( updateRecs )
    }

  } catch(e) {
    await client.query('ROLLBACK')
    res.status(500).json({message: 'internal error'})
  } finally {
    client.release()
  }

})

module.exports = router