--
-- PostgreSQL database dump
--

-- Dumped from database version 15.4 (Debian 15.4-1.pgdg120+1)
-- Dumped by pg_dump version 17.2 (Debian 17.2-1.pgdg120+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: tooth_timer; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.tooth_timer (
    id integer NOT NULL,
    "time" timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: tooth_timer_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.tooth_timer_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: tooth_timer_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.tooth_timer_id_seq OWNED BY public.tooth_timer.id;


--
-- Name: tooth_timer id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tooth_timer ALTER COLUMN id SET DEFAULT nextval('public.tooth_timer_id_seq'::regclass);


--
-- Name: tooth_timer tooth_timer_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tooth_timer
    ADD CONSTRAINT tooth_timer_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

