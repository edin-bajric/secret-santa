create table employee (
                          id int primary key generated always as identity,
                          name varchar(45) not null,
                          surname varchar(45) not null,
                          username varchar(15) not null,
                          password varchar(255) not null,
                          role varchar(10) not null
);

create table pair (
                      id int primary key generated always as identity,
                      giver_id int not null,
                      receiver_id int not null,
                      foreign key (giver_id) references employee(id),
                      foreign key (receiver_id) references employee(id),
                      constraint unique_pair unique (giver_id, receiver_id),
                      constraint not_equals check (giver_id != receiver_id)
);

create index fk_employee_id_pair_giver_id on pair(giver_id);
create index fk_employee_id_pair_receiver_id on pair(receiver_id);