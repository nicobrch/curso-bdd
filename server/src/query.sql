/* top 10 segun global rank */
select * from usuario where global_rank <= 10;

/* top 10 segun country rank */
select * from usuario where country_rank <= 10;

/* usuario con mayor numero de torneos */
select u.id, u.username from usuario u
join (
    select count(*), user_id from usuario_torneo group by user_id
) t1 on t1.user_id = u.id
join (
    select max(cont) from (select count(*) as cont from usuario_torneo group by user_id) contador
) t2 on t1.count = t2.max;

/* perifericos del usuario top 1 country */
select tp.tipo, p.marca, p.modelo, up.config from periferico p
join tipo_periferico tp on p.tipo_id = tp.id
join usuario_periferico up on p.id = up.periferico_id
join usuario u on up.user_id = u.id
and u.country_rank = 1;

/* perifericos del usuario top 1 country */
select tp.tipo, p.marca, p.modelo, up.config from periferico p
join tipo_periferico tp on p.tipo_id = tp.id
join usuario_periferico up on p.id = up.periferico_id
join usuario u on up.user_id = u.id
and u.global_rank = 1;

/* usuarios que posean badge X */
select u.id, u.username, b.descripcion from usuario u
join usuario_badge ub on u.id = ub.user_id
join badge b on ub.badge_id = b.id
and b.descripcion like '%Perennial%';

/* marcas mas usadas por los usuarios */
select p.marca, t1.count from periferico p
join (
    select count(*), p2.marca from usuario_periferico up
    join periferico p2 on up.periferico_id = p2.id
    group by p2.marca
) t1 on t1.marca = p.marca
join (
    select max(cont) from (
        select count(*) as cont from usuario_periferico up
        join periferico p2 on up.periferico_id = p2.id
        group by p2.marca
    ) contador
) t2 on t2.max = t1.count group by p.marca, t1.count;