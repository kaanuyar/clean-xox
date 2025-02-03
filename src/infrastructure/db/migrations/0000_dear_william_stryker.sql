CREATE TYPE "public"."match_result" AS ENUM('X', 'O', 'Draw');--> statement-breakpoint
CREATE TYPE "public"."match_state" AS ENUM('Waiting for players', 'Ongoing', 'Finished');--> statement-breakpoint
CREATE TYPE "public"."player_symbol" AS ENUM('X', 'O');--> statement-breakpoint
CREATE TABLE "account" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	CONSTRAINT "account_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "match" (
	"id" serial PRIMARY KEY NOT NULL,
	"code" text NOT NULL,
	"state" "match_state" NOT NULL,
	"result" "match_result",
	"started_at" timestamp,
	"finished_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	CONSTRAINT "match_code_unique" UNIQUE("code")
);
--> statement-breakpoint
CREATE TABLE "match_player" (
	"match_id" integer,
	"account_id" integer,
	"player_symbol" "player_symbol" NOT NULL,
	"joined_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "match_player_match_id_account_id_pk" PRIMARY KEY("match_id","account_id"),
	CONSTRAINT "match_player_match_id_player_symbol_unique" UNIQUE("match_id","player_symbol")
);
--> statement-breakpoint
CREATE TABLE "match_move" (
	"match_id" integer,
	"account_id" integer,
	"turn" integer NOT NULL,
	"symbol_placement" integer NOT NULL,
	"moved_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "match_move_match_id_turn_pk" PRIMARY KEY("match_id","turn")
);
--> statement-breakpoint
ALTER TABLE "match_player" ADD CONSTRAINT "match_player_match_id_match_id_fk" FOREIGN KEY ("match_id") REFERENCES "public"."match"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "match_player" ADD CONSTRAINT "match_player_account_id_account_id_fk" FOREIGN KEY ("account_id") REFERENCES "public"."account"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "match_move" ADD CONSTRAINT "match_move_match_id_match_id_fk" FOREIGN KEY ("match_id") REFERENCES "public"."match"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "match_move" ADD CONSTRAINT "match_move_account_id_account_id_fk" FOREIGN KEY ("account_id") REFERENCES "public"."account"("id") ON DELETE no action ON UPDATE no action;