CREATE TABLE "match" (
	"id" serial PRIMARY KEY NOT NULL,
	"state" text NOT NULL,
	"result" text,
	"start_date" timestamp,
	"end_date" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	CONSTRAINT "state_check" CHECK ("match"."state" IN ('waiting_players','ongoing','finished')),
	CONSTRAINT "result_check" CHECK ("match"."result" IN ('x','o','draw'))
);
--> statement-breakpoint
CREATE TABLE "match_player" (
	"match_id" integer,
	"account_id" integer,
	"player_symbol" text NOT NULL,
	CONSTRAINT "match_player_match_id_account_id_pk" PRIMARY KEY("match_id","account_id"),
	CONSTRAINT "match_player_match_id_player_symbol_unique" UNIQUE("match_id","player_symbol"),
	CONSTRAINT "check_player_symbol" CHECK ("match_player"."player_symbol" IN ('x','o'))
);
--> statement-breakpoint
CREATE TABLE "match_move" (
	"match_id" integer,
	"account_id" integer,
	"turn" integer NOT NULL,
	"symbol_placement" integer NOT NULL,
	"move_date" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "match_move_match_id_turn_pk" PRIMARY KEY("match_id","turn")
);
--> statement-breakpoint
ALTER TABLE "match_player" ADD CONSTRAINT "match_player_match_id_match_id_fk" FOREIGN KEY ("match_id") REFERENCES "public"."match"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "match_player" ADD CONSTRAINT "match_player_account_id_account_id_fk" FOREIGN KEY ("account_id") REFERENCES "public"."account"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "match_move" ADD CONSTRAINT "match_move_match_id_match_id_fk" FOREIGN KEY ("match_id") REFERENCES "public"."match"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "match_move" ADD CONSTRAINT "match_move_account_id_account_id_fk" FOREIGN KEY ("account_id") REFERENCES "public"."account"("id") ON DELETE no action ON UPDATE no action;