CREATE TYPE public.account_type AS ENUM
    ('Client', 'Employee', 'Admin');

ALTER TYPE public.account_type
    OWNER TO cse340pb;

CREATE TABLE public.classification (
	classification_id INT GENERATED BY DEFAULT AS IDENTITY,
	classification_name CHARACTER VARYING NOT NULL,
	CONSTRAINT classification_pk PRIMARY KEY (classification_id)
);

CREATE TABLE IF NOT EXISTS public.inventory
(
	inv_id integer NOT NULL GENERATED BY DEFAULT AS IDENTITY,
	inv_make character varying NOT NULL,
	inv_model character varying NOT NULL,
	inv_year character(4) NOT NULL,
	inv_description text NOT NULL,
	inv_image character varying NOT NULL,
	inv_thumbnail character varying NOT NULL,
	inv_price numeric(9, 0) NOT NULL,
	inv_miles integer NOT NULL,
    inv_color character varying NOT NULL,
	classification_id integer NOT NULL,
	CONSTRAINT inventory_pkey PRIMARY KEY (inv_id)
);

ALTER TABLE IF EXISTS public.inventory
	ADD CONSTRAINT fk_classification FOREIGN KEY (classification_id)
	REFERENCES public.classification (classification_id) MATCH SIMPLE
	ON UPDATE CASCADE
	ON DELETE NO ACTION;

CREATE TABLE IF NOT EXISTS public.account
(
	account_id integer NOT NULL GENERATED BY DEFAULT AS IDENTITY,
	account_firstname character varying NOT NULL,
	account_lastname character varying NOT NULL,
	account_email character varying NOT NULL,
	account_password character varying NOT NULL,
	account_type account_type NOT NULL DEFAULT 'Client'::account_type,
	CONSTRAINT account_pkey PRIMARY KEY (account_id)
);

INSERT INTO public.classification (classification_name)
VALUES ('Custom'),
	('Sport'),
	('SUV'),
	('Truck'),
	('Sedan');

UPDATE inventory
SET inv_image = REPLACE(inv_image ,'/image/', '/image/vehicles/'), 
inv_thumbnail = REPLACE(inv_thumbnail, '/image/', '/image/vehicles/');