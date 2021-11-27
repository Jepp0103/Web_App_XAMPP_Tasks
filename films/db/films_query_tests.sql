INSERT INTO `movie` (`title`, `overview`, `release_date`, `runtime`) VALUES
('Working???', 'Please work', '1995-12-09', 98);

INSERT INTO `movie` (`title`, `overview`, `release_date`, `runtime`) VALUES
('Mamacita???', 'Mama work', '1997-12-09', 98);

select * from movie where title like "%Working?%";


SELECT title, release_date, runtime 
                                FROM movie 
                                    WHERE title LIKE "%Mama%"
                                    ORDER BY title;
                                    
                                    describe movie;
              
select * from user;
              
select * from user
	WHERE email = 'knud@mail.com' AND pwd = '$2y$10$tReZaL.5q4U870EHmJ0tBOQQ5MRQTTSH4e6IowlodQzUBu0lpYcM6';
    
select * from films;