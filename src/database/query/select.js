export const viewCustomerOrder = `select * from orders.viewCustomerOrder($1, $2)`

export const products = `select id, name, description from orders.product;`

export const categories = `select id, name, description from orders.category;`
