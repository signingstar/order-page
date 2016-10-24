export const updateOrderTable = `UPDATE orders.order SET status=$3, short_name=COALESCE($4, short_name) WHERE user_id=$1 AND id=$2`

export const addAdditionalUser = `UPDATE orders.order
                                  SET additional_users=jsonb_set(additional_users, ARRAY[$1], $2::jsonb, true)
                                  WHERE id=$3 AND on_behalf=$4`

export const updateToConfirmOrder = `UPDATE orders.order SET status=$3, category_id=$5, short_name=COALESCE($4, short_name) WHERE user_id=$1 AND id=$2`
