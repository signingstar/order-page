export const updateOrderTable = `UPDATE orders.order SET status=$3, short_name=COALESCE($4, short_name) WHERE user_id=$1 AND id=$2`

export const addAdditionalUser = `UPDATE orders.order
                                  SET additional_users=jsonb_set(additional_users, ARRAY[$1], $2::jsonb, true)
                                  WHERE id=$3 AND on_behalf=$4`

export const updateToConfirmOrder = `UPDATE orders.order SET status=$3, category_id=$5, short_name=COALESCE($4, short_name) WHERE user_id=$1 AND id=$2`

export const saveAlbumnFile = `SELECT * FROM orders.persist_order($1, $2, $3, $4, $5, $6) AS customer_id;`

export const qualifyImage = `UPDATE orders.order_item SET files=jsonb_set(files, array[$2, 'force_qualify'], $3::jsonb, true) WHERE order_id=$1`

export const updateToFinalizeOrder = `UPDATE orders.order SET status=$3 WHERE on_behalf=$1 AND id=$2`
