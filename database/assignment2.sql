INSERT INTO account (
    account_firstname,
    account_lastname,
    account_email,
    account_password

  )
VALUES (
    'Tony',
    'Stark',
    'tony@starkent.com',
    'Iam1ronM@n'
  );

UPDATE account
SET 
	account_type = 'Admin'
WHERE 
	account_id = 1;

DELETE
FROM
	account
WHERE
	account_id = 1;

UPDATE inventory
SET inv_description = REPLACE(inv_description ,'the small interior', 'a huge interior')
WHERE inv_id = 10;

SELECT 
	inv_make,
	inv_model,
	classification_name
FROM
	inventory
INNER JOIN classification
	ON classification.classification_id = inventory.classification_id
WHERE inventory.classification_id = 2;

UPDATE inventory
SET inv_image = REPLACE(inv_image ,'/image/', '/image/vehicles/'), 
inv_thumbnail = REPLACE(inv_thumbnail, '/image/', '/image/vehicles/');
