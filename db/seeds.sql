INSERT INTO department (name)
 VALUES ('Administration'), 
        ('Human Resources'),
        ('Finance');


INSERT INTO role (title, salary, department_id)
VALUES ('Administrator',7800,1),
       ('Human Resourses Specialist',6230,3),
       ('Financial Analyst',4780,3);
       

INSERT INTO employee (first_name,last_name,role_id,manager_id)
VALUES    ('licia','Bertrand', 1, NULL),
           ('Bob', 'Spong',2,1),
           ('Patrcik', 'Star', 3,1);