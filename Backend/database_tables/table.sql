create table users(
id serial primary key,
username varchar(30),
email varchar(50),
password varchar(100)
);

create table session(
id serial primary key,
isactive boolean,
userid integer references users(id)
);

create table movies(
id serial primary key,
name text,
link text,
price integer
);

create table series(
id serial primary key,
name text,
link text[],
season integer,
price integer
);

create table money(
id serial primary key,
money integer,
userid integer references users(id)
);

create table usermovies(
id serial primary key,
userid integer references users(id),
movieid integer references movies(id)
);

create table userseries(
id serial primary key,
userid integer references users(id),
seriesid integer references series(id)
);