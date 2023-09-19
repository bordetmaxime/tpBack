SELECT * FROM member
SELECT * FROM member WHERE family_id =1
SELECT * FROM "member" WHERE member.member_username= 'hfh';
UPDATE member
             SET member_username = 'michel',
             member_password = 'test',
             member_lastname = 'michel',
             member_firstname = 'durant',
             member_email = 'micheldurant@gmail.com'
             WHERE member_id = 2 RETURNING *
 UPDATE member_data
            SET member_data_date_birth = '01/01/2020',
             member_data_size = '170',
             member_data_top_size = 'L',
             member_data_bottom_size = 'Xl',
             member_data_shoes_size = '35',
             member_data_school = 'fjkjlj',
             member_data_hobbies = 'ffdfsfsd'
            WHERE member_data_id = 2 RETURNING *
UPDATE member_has_role
                SET member_has_role_role_id = 1
                WHERE member_has_role_role_id = 2 RETURNING *
SELECT * FROM family_has_member_has_role WHERE family_has_member_has_role_family_id = '1' AND family_has_member_has_role_member_id = '1';
UPDATE family_has_member_has_role SET family_has_member_has_role_role_id = 2 WHERE family_has_member_has_role_id = (
	SELECT family_has_member_has_role_id FROM family_has_member_has_role WHERE family_has_member_has_role_family_id = '1' AND family_has_member_has_role_member_id = '1'
) RETURNING *
SELECT * FROM Family_has_member_has_role WHERE family_has_member_has_role_member_id = '1';

SELECT FROM member WHEN member_id > 1 

DELETE family_has_member_has_role SET family_has_member_has_role_role_id = 2
SELECT family_has_member_has_role.family_has_member_has_role_id FROM family_has_member_has_role 
WHERE family_has_member_has_role_family_id = 2 AND family_has_member_has_role_member_id = 4

DELETE FROM family_has_member_has_role
            WHERE family_has_member_has_role_id =( 
                SELECT family_has_member_has_role_id FROM family_has_member_has_role 
                WHERE family_has_member_has_role_family_id = 2
                AND family_has_member_has_role_member_id = 3
            ) RETURNING *
