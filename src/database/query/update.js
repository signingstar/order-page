export const updateOrderTable = `UPDATE orders.order SET status=$3 WHERE user_id=$1 AND id=$2`
