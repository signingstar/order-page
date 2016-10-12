export const updateOrderTable = `UPDATE orders.order SET status=$3 WHERE user_id=$1 AND id=$2`

export const addAdditionalUser = `UPDATE orders.order
                                  SET additional_users=jsonb_insert(additional_users, $1, $2::jsonb)
                                  WHERE id=$3 AND on_behalf=$4`

export const updateAdditionalUser = `UPDATE orders.order SET additional_users=jsonb_set(additional_users, $1, $2, true)  where id=$3 AND user_id=$4`
