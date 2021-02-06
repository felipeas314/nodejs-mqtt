CREATE SEQUENCE public.measurements_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 2147483647
    CACHE 1;
    
CREATE TABLE public.measurements
(
    id integer NOT NULL DEFAULT nextval('measurements_id_seq'::regclass),
    locale character varying(255) COLLATE pg_catalog."default",
    ip character varying(255) COLLATE pg_catalog."default",
    date timestamp with time zone,
    weight double precision,
    CONSTRAINT measurements_pkey PRIMARY KEY (id)
)