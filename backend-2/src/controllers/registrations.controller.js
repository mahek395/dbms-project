const pool = require('../config/db')
// GET /api/registrations
async function getAll(req, res) {
  try {
    const [rows] = await pool.query('SELECT * FROM registrations ORDER BY created_at DESC')
    res.json(rows)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch registrations' })
  }
}

// GET /api/registrations/:id
async function getById(req, res) {
  try {
    const [rows] = await pool.query('SELECT * FROM registrations WHERE id = ?', [req.params.id])
    if (rows.length === 0) return res.status(404).json({ error: 'Not found' })
    res.json(rows[0])
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch registration' })
  }
}

async function create(req, res) {
  const {
    full_name, email, phone, course_category, preferred_batch,
    start_date, prior_experience, years_of_experience,
    placement_assistance, agree_terms,
  } = req.body

  const profile_photo = req.file ? req.file.filename : null

  try {
    const [result] = await pool.query(
      `INSERT INTO registrations
       (full_name, email, phone, profile_photo, course_category, preferred_batch, start_date,
        prior_experience, years_of_experience, placement_assistance, agree_terms)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [full_name, email, phone, profile_photo, course_category, preferred_batch, start_date,
       prior_experience, Number(years_of_experience),
       placement_assistance === 'true' ? 1 : 0,
       agree_terms === 'true' ? 1 : 0]
    )
    res.status(201).json({ id: result.insertId })
  } catch (err) {
    res.status(500).json({ error: 'Failed to create registration' })
  }
}

async function update(req, res) {
  const {
    full_name, email, phone, course_category, preferred_batch,
    start_date, prior_experience, years_of_experience,
    placement_assistance, agree_terms,
  } = req.body

  try {
    let query, params
    if (req.file) {
      query = `UPDATE registrations SET full_name=?, email=?, phone=?, profile_photo=?, course_category=?,
                preferred_batch=?, start_date=?, prior_experience=?, years_of_experience=?,
                placement_assistance=?, agree_terms=? WHERE id=?`
      params = [full_name, email, phone, req.file.filename, course_category, preferred_batch, start_date,
                prior_experience, Number(years_of_experience),
                placement_assistance === 'true' ? 1 : 0, agree_terms === 'true' ? 1 : 0, req.params.id]
    } else {
      query = `UPDATE registrations SET full_name=?, email=?, phone=?, course_category=?,
                preferred_batch=?, start_date=?, prior_experience=?, years_of_experience=?,
                placement_assistance=?, agree_terms=? WHERE id=?`
      params = [full_name, email, phone, course_category, preferred_batch, start_date,
                prior_experience, Number(years_of_experience),
                placement_assistance === 'true' ? 1 : 0, agree_terms === 'true' ? 1 : 0, req.params.id]
    }
    const [result] = await pool.query(query, params)
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Not found' })
    res.json({ message: 'Updated' })
  } catch (err) {
    res.status(500).json({ error: 'Failed to update registration' })
  }
}

// DELETE /api/registrations/:id
async function remove(req, res) {
  try {
    const [result] = await pool.query('DELETE FROM registrations WHERE id = ?', [req.params.id])
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Not found' })
    res.json({ message: 'Deleted' })
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete registration' })
  }
}

module.exports = { getAll, getById, create, update, remove }


