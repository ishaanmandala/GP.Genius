
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'Home1Creek2';
create database login_GPA;
use login_GPA;

show tables;
create table users(
ID int auto_increment primary key,
NAME varchar(100),
EMAIL varchar(100),
PASS varchar(200)
);
select * from gpa_user;

create table gpa_user(
studentID varchar (8),
UN_GPA decimal(10,2),
WG_GPA decimal(10,2)
);

insert into gpa_user VALUES(
'100', 3.89, 4.25);

select * from gpa_user;

drop table gpa_user;
