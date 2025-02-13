-- Insert departments
INSERT INTO department (name) VALUES 
    ('Administration'), 
    ('Human Resources'), 
    ('Finance');

-- Insert roles
INSERT INTO role (title, salary, department_id) VALUES 
    ('Administrator', 7800, 1),
    ('Human Resources Specialist', 6230, 2), 
    ('Financial Analyst', 4780, 3);

-- Insert employees
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES 
    ('Alicia', 'Bertrand', 1, NULL), 
    ('Bob', 'Spong', 2, 1),
    ('Patrick', 'Star', 3, 1); 