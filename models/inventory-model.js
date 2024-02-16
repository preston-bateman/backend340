const pool = require("../database/")

/* ***************************
 *  Get all classification data
 * ************************** */
async function getClassifications(){
  return await pool.query("SELECT * FROM public.classification ORDER BY classification_name")
}

async function getInventory(){
  return await pool.query("SELECT * FROM public.inventory ORDER BY inv_id")
}


/* ***************************
 *  Get all inventory items and classification_name by classification_id
 * ************************** */
async function getInventoryByClassificationId(classification_id) {
  try {
    const data = await pool.query(
      `SELECT * FROM public.inventory AS i 
      JOIN public.classification AS c 
      ON i.classification_id = c.classification_id 
      WHERE i.classification_id = $1`,
      [classification_id]
    )
    return data.rows
  } catch (error) {
    console.error("getclassificationsbyid error " + error)
  }
}

/* ***************************
 *  Get all inventory items by inventory id
 * ************************** */
async function getInvByInvId(inv_id) {
  try {
    const data = await pool.query(
      `SELECT * FROM public.inventory AS x
      WHERE x.inv_id = $1`, [inv_id]
    )
    return data.rows
  } catch(error) {
    console.error("Your getInvByInvId function threw an error: " + error)
  }
}

/* ***************************
 *  Insert new classification into db
 * ************************** */
async function addClassification(classification_name) {
  try {
    const text = "INSERT INTO classification (classification_name) VALUES($1)"
    const values = [classification_name]
    return await pool.query(test, values)
  } catch(error) {
    return error.message
  }
}

/* ***************************
 *  Insert new inventory item into db
 * ************************** */


module.exports = {getClassifications, getInventoryByClassificationId, getInventory, getInvByInvId, addClassification,};

