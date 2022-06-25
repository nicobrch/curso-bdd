/* tipos de periferico */
insert into tipo_periferico(tipo) values ('Mouse');
insert into tipo_periferico(tipo) values ('Tablet');
insert into tipo_periferico(tipo) values ('Teclado');
insert into tipo_periferico(tipo) values ('Monitor');

/* perifericos */
insert into periferico(marca, modelo, tipo_id) values ('Wacom', 'CTL-480', (select id from tipo_periferico where tipo = 'Tablet'));
insert into periferico(marca, modelo, tipo_id) values ('Wacom', 'CTL-472', (select id from tipo_periferico where tipo = 'Tablet'));
insert into periferico(marca, modelo, tipo_id) values ('Wacom', 'CTL-490', (select id from tipo_periferico where tipo = 'Tablet'));
insert into periferico(marca, modelo, tipo_id) values ('XP-PEN', 'G640S', (select id from tipo_periferico where tipo = 'Tablet'));
insert into periferico(marca, modelo, tipo_id) values ('Logitech', 'Pro X Superlight', (select id from tipo_periferico where tipo = 'Mouse'));
insert into periferico(marca, modelo, tipo_id) values ('Logitech', 'G203', (select id from tipo_periferico where tipo = 'Mouse'));
insert into periferico(marca, modelo, tipo_id) values ('Logitech', 'G102', (select id from tipo_periferico where tipo = 'Mouse'));
insert into periferico(marca, modelo, tipo_id) values ('HyperX', 'Alloy Origins Core', (select id from tipo_periferico where tipo = 'Teclado'));
insert into periferico(marca, modelo, tipo_id) values ('HyperX', 'Alloy FPS Pro', (select id from tipo_periferico where tipo = 'Teclado'));
insert into periferico(marca, modelo, tipo_id) values ('HyperX', 'Alloy Origins', (select id from tipo_periferico where tipo = 'Teclado'));
insert into periferico(marca, modelo, tipo_id) values ('HyperX', 'Alloy Elite', (select id from tipo_periferico where tipo = 'Teclado'));
insert into periferico(marca, modelo, tipo_id) values ('GMMK', 'TKL', (select id from tipo_periferico where tipo = 'Teclado'));
insert into periferico(marca, modelo, tipo_id) values ('Custom', 'Custom', (select id from tipo_periferico where tipo = 'Teclado'));
insert into periferico(marca, modelo, tipo_id) values ('Durgod', 'Taurus K320', (select id from tipo_periferico where tipo = 'Teclado'));
insert into periferico(marca, modelo, tipo_id) values ('Asus', 'TUF VG279QM', (select id from tipo_periferico where tipo = 'Monitor'));
insert into periferico(marca, modelo, tipo_id) values ('Asus', 'TUF VG24VQ', (select id from tipo_periferico where tipo = 'Monitor'));
insert into periferico(marca, modelo, tipo_id) values ('Alienware', 'AW2518HF', (select id from tipo_periferico where tipo = 'Monitor'));
insert into periferico(marca, modelo, tipo_id) values ('Lenovo', 'Y25-25', (select id from tipo_periferico where tipo = 'Monitor'));
insert into periferico(marca, modelo, tipo_id) values ('LG', '24MK430H-B', (select id from tipo_periferico where tipo = 'Monitor'));
insert into periferico(marca, modelo, tipo_id) values ('HP', 'X24ih', (select id from tipo_periferico where tipo = 'Monitor'));

/* red social */
insert into red_social(nombre) values ('Discord');
insert into red_social(nombre) values ('Twitch');
insert into red_social(nombre) values ('Youtube');
insert into red_social(nombre) values ('Twitter');

/* usuario periferico */
insert into usuario_periferico(user_id, periferico_id, config) values ((select id from usuario where username = 'Mathi'), (select id from periferico where marca = 'Wacom' and modelo = 'CTL-480'), '{"area": "https://pbs.twimg.com/media/EM8G-lWXkAAjZup?format=png&name=900x900"}');
insert into usuario_periferico(user_id, periferico_id, config) values ((select id from usuario where username = 'Mathi'), (select id from periferico where marca = 'Alienware' and modelo = 'AW2518HF'), '{"resolucion": "1920x1080", "herzios": "240"}');
insert into usuario_periferico(user_id, periferico_id, config) values ((select id from usuario where username = 'Mathi'), (select id from periferico where marca = 'Durgod' and modelo = 'Taurus K320'), '{"switch": "Cherry Brown"}');

insert into usuario_periferico(user_id, periferico_id, config) values ((select id from usuario where username = 'Intercambing'), (select id from periferico where marca = 'XP-PEN' and modelo = 'G640S'), '{"area": "https://i.gyazo.com/1eddc1245c1dcdaca654e2541ac77f1f.png"}');
insert into usuario_periferico(user_id, periferico_id, config) values ((select id from usuario where username = 'Intercambing'), (select id from periferico where marca = 'Asus' and modelo = 'TUF VG279QM'), '{"resolucion": "1920x1080", "herzios": "280"}');
insert into usuario_periferico(user_id, periferico_id, config) values ((select id from usuario where username = 'Intercambing'), (select id from periferico where marca = 'Hyperx' and modelo = 'Alloy Origins Core'), '{"switch": "Hyperx Red"}');

insert into usuario_periferico(user_id, periferico_id, config) values ((select id from usuario where username = 'Pancho'), (select id from periferico where marca = 'Wacom' and modelo = 'CTL-490'), '{"area": "https://i.gyazo.com/1eddc1245c1dcdaca654e2541ac77f1f.png"}');
insert into usuario_periferico(user_id, periferico_id, config) values ((select id from usuario where username = 'Pancho'), (select id from periferico where marca = 'LG' and modelo = '24MK430H-B'), '{"resolucion": "1920x1080", "herzios": "75"}');
insert into usuario_periferico(user_id, periferico_id, config) values ((select id from usuario where username = 'Pancho'), (select id from periferico where marca = 'GMMK' and modelo = 'TKL'), '{"switch": "Kailh Pro Light Green"}');

insert into usuario_periferico(user_id, periferico_id, config) values ((select id from usuario where username = 'Unable'), (select id from periferico where marca = 'Logitech' and modelo = 'G102'), '{"dpi": "800", "polling": "1000"}');
insert into usuario_periferico(user_id, periferico_id, config) values ((select id from usuario where username = 'Unable'), (select id from periferico where marca = 'HP' and modelo = 'X24ih'), '{"resolucion": "1920x1080", "herzios": "144"}');
insert into usuario_periferico(user_id, periferico_id, config) values ((select id from usuario where username = 'Unable'), (select id from periferico where marca = 'Hyperx' and modelo = 'Alloy Elite'), '{"switch": "Cherry Red"}');

insert into usuario_periferico(user_id, periferico_id, config) values ((select id from usuario where username = 'mocaccino'), (select id from periferico where marca = 'Wacom' and modelo = 'CTL-472'), '{"area": "https://i.gyazo.com/1eddc1245c1dcdaca654e2541ac77f1f.png"}');
insert into usuario_periferico(user_id, periferico_id, config) values ((select id from usuario where username = 'mocaccino'), (select id from periferico where marca = 'Asus' and modelo = 'TUF VG24VQ'), '{"resolucion": "1920x1080", "herzios": "144"}');
insert into usuario_periferico(user_id, periferico_id, config) values ((select id from usuario where username = 'mocaccino'), (select id from periferico where marca = 'Hyperx' and modelo = 'Alloy Origins Core'), '{"switch": "Hyperx Red"}');

/* usuario red */
insert into usuario_red(user_id, red_id, valor) values ((select id from usuario where username = 'Mathi'), (select id from red_social where nombre = 'Twitch'), 'https://www.twitch.tv/mathi');
insert into usuario_red(user_id, red_id, valor) values ((select id from usuario where username = 'Intercambing'), (select id from red_social where nombre = 'Twitch'), 'https://www.twitch.tv/intercambing_');
insert into usuario_red(user_id, red_id, valor) values ((select id from usuario where username = 'Pancho'), (select id from red_social where nombre = 'Twitch'), 'https://www.twitch.tv/notpanchowo');
insert into usuario_red(user_id, red_id, valor) values ((select id from usuario where username = 'Unable'), (select id from red_social where nombre = 'Twitch'), 'https://www.twitch.tv/unablesan');
insert into usuario_red(user_id, red_id, valor) values ((select id from usuario where username = 'mocaccino'), (select id from red_social where nombre = 'Twitch'), 'https://www.twitch.tv/mocaccino0');