export const customerOrder = `select * from orders.viewCustomerOrder($1, $2, $3)`

export const products = `select id, name, description from orders.product;`

export const categories = `select id, name, description from orders.category;`

export const ownerOrders = `
    SELECT o.id, o.status, o.category_id, u.email, u.first_name, u.last_name, u.phone_number FROM orders.order o INNER JOIN user_account.users u
    ON o.on_behalf = u.id
    WHERE o.user_id=$1
    ORDER BY o.status ASC, o.id DESC
  `

export const lastOpenOrder = `
  SELECT * FROM orders.order WHERE id IN (
    SELECT id FROM orders.order
    WHERE user_id = $1
    ORDER BY updated_at DESC LIMIT 1
  )
  AND status < 'confirmed'`
