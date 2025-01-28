ALTER TABLE "match" RENAME COLUMN "start_date" TO "started_at";--> statement-breakpoint
ALTER TABLE "match" RENAME COLUMN "end_date" TO "finished_at";--> statement-breakpoint
ALTER TABLE "match_move" RENAME COLUMN "move_date" TO "moved_at";--> statement-breakpoint
ALTER TABLE "match" ADD COLUMN "code" text NOT NULL;--> statement-breakpoint
ALTER TABLE "match_player" ADD COLUMN "joined_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "match" ADD CONSTRAINT "match_code_unique" UNIQUE("code");