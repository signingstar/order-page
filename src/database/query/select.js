export const customerOrder = `select * from orders.viewCustomerOrder($1, $2, $3)`

export const products = `select id, name, description from orders.product;`

export const categories = `select id, name, description from orders.category;`

export const ownerOrder = `
    SELECT o.id, o.status, o.category_id, u.email, u.first_name, u.last_name FROM orders.order o INNER JOIN user_account.users u
    ON o.on_behalf = u.id
    WHERE o.user_id=$1
    ORDER BY o.id
  `
