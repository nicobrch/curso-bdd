create table if not exists usuario(
    id int NOT NULL,
    username varchar NOT NULL,
    pp int NOT NULL,
    global_rank int NOT NULL,
    country_rank int NOT NULL,
    playcount int not null,
    play_time int not null,
    avatar_url varchar not null,
    region varchar,
    country varchar not null,
    created_at timestamp not null DEFAULT current_timestamp,
    updated_at timestamp not null DEFAULT current_timestamp,
    PRIMARY KEY (id)
);
create table if not exists torneo(
    id serial,
    name varchar not null,
    rank_range varchar not null,
    badged varchar not null,
    prizepool varchar,
    bws varchar not null,
    url varchar not null,
    spreadsheet_url varchar,
    cierre_regs varchar,
    formato varchar,
    cover_url varchar,
    descripcion varchar,
    PRIMARY KEY (id)
);
create table if not exists red_social(
    id serial,
    nombre varchar not null,
    primary key (id)
);
create table if not exists tipo_periferico(
    id serial,
    tipo varchar(64) not null,
    PRIMARY KEY (id)
);
create table if not exists badge(
    id serial,
    descripcion varchar not null,
    image_url varchar not null,
    primary key (id)
);
create table if not exists api_map(
    id int not null,
    title varchar not null,
    difficulty varchar not null,
    star_rating float not null,
    cover varchar not null,
    url varchar not null,
    primary key (id)
);
create table if not exists periferico(
    id serial,
    marca varchar not null,
    modelo varchar not null,
    url varchar,
    tipo_id int not null,
    PRIMARY KEY (id),
    constraint fk_tipo foreign key (tipo_id) references tipo_periferico(id)
);
create table if not exists usuario_periferico(
    id serial,
    user_id int not null,
    periferico_id int not null,
    config json,
    PRIMARY KEY (id),
    CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES usuario(id),
    CONSTRAINT fk_periferico FOREIGN KEY(periferico_id) REFERENCES periferico(id)
);
create table if not exists usuario_torneo(
    id serial,
    user_id int not null,
    torneo_id int not null,
    estado varchar,
    PRIMARY KEY (id),
    CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES usuario(id),
    CONSTRAINT fk_torneo FOREIGN KEY(torneo_id) REFERENCES torneo(id)
);
create table if not exists usuario_red(
    id serial,
    user_id int not null,
    red_id int not null,
    valor varchar,
    primary key (id),
    constraint fk_user foreign key (user_id) references usuario(id),
    constraint fk_red foreign key (red_id) references red_social(id)
);
create table if not exists usuario_badge(
    id serial,
    user_id int not null,
    badge_id int not null,
    primary key (id),
    constraint fk_user foreign key (user_id) references usuario(id),
    constraint fk_badge foreign key (badge_id) references badge(id)
);
create table if not exists api_score(
    id int not null,
    user_id int not null,
    map_id int not null,
    score_url varchar not null,
    pp int not null,
    rank varchar not null,
    mods varchar not null,
    accuracy float not null,
    score int not null,
    primary key (id),
    constraint fk_user foreign key (user_id) references usuario(id),
    constraint fk_map foreign key (map_id) references api_map(id)
);