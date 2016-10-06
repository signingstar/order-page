create schema orders;

CREATE TABLE orders.product (
    id serial primary key not null,
    name varchar(32) not null,
    description text,
    created_at timestamptz default now(),
    min_price integer,
    currency varchar(8)
    );



create table orders.category (
    id serial primary key not null,
    name varchar(32) not null,
    description text,
    created_at timestamptz not null default now()
    );


create table orders.order_item (
	id serial primary key not null,
    order_id integer references orders.order (id),
    product_id integer references orders.product (id),
    quoted_price integer,
    final_price integer,
    files jsonb,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

create type orders.status as enum (
    'initiated', 'in_process', 'confirmed', 'waiting_for_feedback',
    'feedback_received', 'handling_feedback', 'in_design', 'review_complete',
    'ready_to_print', 'printing_complete', 'delivered', 'resolved',
    'waiting_for_payment', 'on_hold', 'closed'
    );

create table orders.order (
    id serial primary key not null,
    user_id uuid references user_account.users (id),
    status orders.status,
    on_behalf uuid references user_account.users (id),
    additional_users jsonb,
    category_id integer references orders.category (id),
    transaction_id bigint,
    currency varchar(8),
    payment_mode varchar(32),
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
    );
