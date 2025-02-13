const inquirer = require("inquirer");
const { Pool } = require("pg");

// Connection to database
const pool = new Pool({
  user: "postgres",
  password: "123123",
  host: "localhost",
  database: "employeeTracker_db",
  port: 5432,
});

pool.connect((err) => {
  if (err) {
    console.error("Connection error:", err.message);
    return;
  }
  console.log("Connected to the employeeTracker_db database.");
  promptUser();
});

const promptUser = () => {
  inquirer
    .prompt([
      {
        name: "choices",
        type: "list",
        message: "Please select an option:",
        choices: [
          "View All Employees",
          "View All Roles",
          "View All Departments",
          "View All Employees By Department",
          "Update Employee Role",
          "Add Employee",
          "Add Role",
          "Add Department",
          "Exit",
        ],
      },
    ])
    .then((answers) => {
      const { choices } = answers;

      if (choices === "View All Employees") {
        viewAllEmployees();
      }
      if (choices === "View All Departments") {
        viewAllDepartments();
      }
      if (choices === "View All Roles") {
        viewAllRoles();
      }

      if (choices === "View All Employees By Department") {
        viewEmployeesByDepartment();
      }
      if (choices === "View Employee Role") {
        viewEmployeeRole();
      }
      if (choices === "View Employee") {
        viewEmployee();
      }
      if (choices === "View Role") {
        viewRole();
      }
      if (choices === "View Department") {
        viewDepartment();
      }
      if (choices === "Add Employee") {
        addEmployee();
      }

      if (choices === "Add Department") {
        addDepartment();
      }
      if (choices === "Add Role") {
        addRole();
      }
      if (choices === "Update Employee Role") {
        updateEmployeeRole();
      }
      if (choices === "Exit") {
        pool.end();
        process.exit();
      }
    });
};

// View All Employees
const viewAllEmployees = () => {
  let sql = `SELECT employee.id, 
                      employee.first_name, 
                      employee.last_name, 
                      role.title, 
                      department.name, 
                      role.salary
                      FROM employee, role, department 
                      WHERE department.id = role.department_id 
                      AND role.id = employee.role_id
                      ORDER BY employee.id ASC`;
  pool.query(sql, (error, response) => {
    if (error) throw error;

    console.table(response.rows);

    promptUser();
  });
};
// View all Departments
const viewAllDepartments = () => {
  const sql = `SELECT department.id AS id, department.name AS department FROM department`;
  pool.query(sql, (error, response) => {
    if (error) throw error;
    console.table(response.rows);
    promptUser();
  });
};
// View all Roles
const viewAllRoles = () => {
  const sql = `SELECT role.id, role.title, department.name AS department
                  FROM role
                  INNER JOIN department ON role.department_id = department.id`;
  pool.query(sql, (error, response) => {
    if (error) throw error;
    console.table(response.rows);

    promptUser();
  });
};
// View all Employees by Department
const viewEmployeesByDepartment = () => {
  const sql = `SELECT employee.first_name, 
                          employee.last_name, 
                          department.name AS department
                          FROM employee 
                          LEFT JOIN role ON employee.role_id = role.id 
                          LEFT JOIN department ON role.department_id = department.id`;
  pool.query(sql, (error, response) => {
    if (error) throw error;
    console.table(response.rows);
    promptUser();
  });
};
// View Employee Role
const viewEmployeeRole = async () => {
  const sql = `
    SELECT 
      employee.first_name, 
      employee.last_name, 
      role.title AS role, 
      department.name AS department
    FROM employee 
    LEFT JOIN role ON employee.role_id = role.id 
    LEFT JOIN department ON role.department_id = department.id`;

  try {
    const { rows } = await pool.query(sql);
    console.table(respnose.rows);
  } catch (error) {
    console.error("Error fetching employee roles:", error.message);
  }
  promptUser();
};
// View Employee
const viewEmployee = () => {
  const sql = `
    SELECT 
      employee.first_name, 
      employee.last_name 
    FROM employee`;

  pool.query(sql, (error, response) => {
    if (error) throw error;
    console.table(response.rows);
    promptUser();
  });
};
// View Role
const viewRole = () => {
  const sql = `
    SELECT 
      role.title AS role, 
      role.salary 
    FROM role`;

  pool.query(sql, (error, response) => {
    if (error) throw error;
    console.table(response.rows);
    promptUser();
  });
};
// View Department
const viewDepartment = () => {
  const sql = `
    SELECT 
      department.name AS department 
    FROM department`;

  pool.query(sql, (error, response) => {
    if (error) throw error;
    console.table(response.rows);
    promptUser();
  });
};
// Add a New Employee
const addEmployee = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "firstName",
        message: "What is the employee's first name?",
      },
      {
        type: "input",
        name: "lastName",
        message: "What is the employee's last name?",
      },
    ])
    .then((answer) => {
      const crit = [answer.firstName, answer.lastName];
      const roleSql = `SELECT role.id, role.title FROM role`;
      pool.query(roleSql, (error, data) => {
        if (error) throw error;
        const roles = data.rows.map(({ id, title }) => ({
          name: title,
          value: id,
        }));
        inquirer
          .prompt([
            {
              type: "list",
              name: "role",
              message: "What is the employee's role?",
              choices: roles,
            },
          ])
          .then((roleChoice) => {
            const role = roleChoice.role;
            crit.push(role);
            const managerSql = `SELECT * FROM employee`;
            pool.query(managerSql, (error, data) => {
              if (error) throw error;
              const managers = data.rows.map(
                ({ id, first_name, last_name }) => ({
                  name: first_name + " " + last_name,
                  value: id,
                })
              );
              inquirer
                .prompt([
                  {
                    type: "list",
                    name: "manager",
                    message: "Who is the employee's manager?",
                    choices: managers,
                  },
                ])
                .then((managerChoice) => {
                  const manager = managerChoice.manager;
                  crit.push(manager);
                  const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
                                  VALUES ($1, $2, $3, $4)`;
                  pool.query(sql, crit, (error) => {
                    if (error) throw error;
                    console.log("Employee has been added!");
                    viewAllEmployees();
                  });
                });
            });
          });
      });
    });
};

// Add a New Department
const addDepartment = () => {
  inquirer
    .prompt([
      {
        name: "newDepartment",
        type: "input",
        message: "What is the name of your new Department?",
      },
    ])
    .then((answer) => {
      let sql = "INSERT INTO department (name) VALUES ($1)";
      pool.query(sql, [answer.newDepartment], (error, response) => {
        if (error) throw error;
        console.log("");
        console.log(answer.newDepartment + ` Department successfully created!`);
        console.log("");
        viewAllDepartments();
      });
    });
};
// Add role

// Add a New Role
const addRole = () => {
  const sql = "SELECT * FROM department";
  pool.query(sql, (error, response) => {
    if (error) throw error;
    let deptNamesArray = [];
    response.rows.forEach((department) => {
      deptNamesArray.push(department.name);
    });
    deptNamesArray.push("Create Department");
    inquirer
      .prompt([
        {
          name: "departmentName",
          type: "list",
          message: "Which department is this new role in?",
          choices: deptNamesArray,
        },
      ])
      .then((answer) => {
        if (answer.departmentName === "Create Department") {
        addDepartment();
        } else {
          addRoleResume(answer);
        }
      });

    const addRoleResume = (departmentData) => {
      inquirer
        .prompt([
          {
            name: "newRole",
            type: "input",
            message: "What is the name of your new role?",
          },
          {
            name: "salary",
            type: "input",
            message: "What is the salary of this new role?",
          },
        ])
        .then((answer) => {
          let createdRole = answer.newRole;
          let departmentId;

          response.rows.forEach((department) => {
            if (departmentData.departmentName === department.name) {
              departmentId = department.id;
            }
          });

          let sql = `INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)`;
          let crit = [createdRole, answer.salary, departmentId];

          pool.query(sql, crit, (error) => {
            if (error) throw error;
            console.log(`Role successfully created!`);
            viewAllRoles();
          });
        });
    };
  });
};
// Update an Employee's Role
const updateEmployeeRole = () => {
  let sql = `SELECT employee.id, employee.first_name, employee.last_name, role.id AS "role_id"
                  FROM employee, role, department WHERE department.id = role.department_id AND role.id = employee.role_id`;
  pool.query(sql, (error, responseOne) => {
    if (error) throw error;
    let employeeNamesArray = [];
    responseOne.rows.forEach((employee) => {
      employeeNamesArray.push(`${employee.first_name} ${employee.last_name}`);
    });

    let sql = `SELECT role.id, role.title FROM role`;
    pool.query(sql, (error, responseTwo) => {
      if (error) throw error;
      let rolesArray = [];
      responseTwo.rows.forEach((role) => {
        rolesArray.push(role.title);
      });

      inquirer
        .prompt([
          {
            name: "chosenEmployee",
            type: "list",
            message: "Which employee has a new role?",
            choices: employeeNamesArray,
          },
          {
            name: "chosenRole",
            type: "list",
            message: "What is their new role?",
            choices: rolesArray,
          },
        ])
        .then((answer) => {
          let newTitleId, employeeId;

          responseTwo.rows.forEach((role) => {
            if (answer.chosenRole === role.title) {
              newTitleId = role.id;
            }
          });
          responseOne.rows.forEach((employee) => {

            if (
              answer.chosenEmployee ===
              `${employee.first_name} ${employee.last_name}`
            ) {
              employeeId = employee.id;
              return;
            }
          });

          let sqls = `UPDATE employee SET role_id = $1 WHERE id = $2`;
          pool.query(sqls, [newTitleId, employeeId], (error) => {
            if (error) throw error;
            console.log(`Employee Role Updated`);

            promptUser();
          });
        });
    });
  });
};
