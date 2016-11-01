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

export const getFiles = `SELECT files
  FROM orders.order_item oi
  WHERE order_id = $1;`

// export const sampleImageQuery = `select files #> '{0}' from orders.order_item where order_id=148 and files #> '{0}' @> '{"id":"aaeb1758526a4a0f8d81bb0a2472dca7"}';`

// export const multipleFieldQuery = `select section ->> 'id', section ->> 'originalname' from orders.order_item t
//     cross join jsonb_array_elements(files) section
//     where order_id=148`


// export const multipleFieldQueryForObject = ` select files #> array[section, 'originalname'] from orders.order_item t
    // cross join jsonb_object_keys(files) section
    // where order_id=148`


 // select files #> array[section] ->> 'index', section from orders.order_item t
 //    cross join jsonb_object_keys(files) section
 //    where order_id=148 and files #>> array[section, 'index'] >= '0'
 //    order by files #>> array[section, 'index'] ;
