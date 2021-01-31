-- CreateEnum
CREATE TYPE "Post_types" AS ENUM ('IR20_Story', 'Fund');

-- CreateEnum
CREATE TYPE "Campus_tag" AS ENUM ('Anschutz', 'Boulder', 'Denver', 'UCCS');

-- CreateEnum
CREATE TYPE "Interest_tag" AS ENUM ('Research', 'Society', 'Students');

-- CreateEnum
CREATE TYPE "Component_types" AS ENUM ('Text', 'Image', 'Quote');

-- CreateTable
CREATE TABLE "accounts" (
"id" SERIAL,
    "compound_id" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    "provider_type" TEXT NOT NULL,
    "provider_id" TEXT NOT NULL,
    "provider_account_id" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "access_token_expires" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sessions" (
"id" SERIAL,
    "user_id" INTEGER NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    "session_token" TEXT NOT NULL,
    "access_token" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
"id" SERIAL,
    "name" TEXT,
    "email" TEXT,
    "email_verified" TIMESTAMP(3),
    "image" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "verification_requests" (
"id" SERIAL,
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "spaces" (
"id" SERIAL,
    "label" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "color" TEXT,
    "imageId" INTEGER,
    "active" BOOLEAN NOT NULL,
    "members" TEXT NOT NULL DEFAULT E'alex.finnarn@gmail.com',

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "images" (
"id" SERIAL,
    "file_name" TEXT NOT NULL,
    "public_id" TEXT NOT NULL,
    "asset_id" TEXT NOT NULL,
    "resource_type" TEXT NOT NULL,
    "src" TEXT NOT NULL,
    "thumbnail" TEXT NOT NULL,
    "format" TEXT NOT NULL,
    "height" INTEGER NOT NULL,
    "width" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "posts" (
"id" SERIAL,
    "type" "Post_types" NOT NULL,
    "title" TEXT NOT NULL,
    "subtitle" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "priority" INTEGER NOT NULL,
    "campus" "Campus_tag" NOT NULL,
    "interest" "Interest_tag" NOT NULL,
    "main_image_id" INTEGER,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "authorId" INTEGER,
    "postId" INTEGER,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "components" (
"id" SERIAL,
    "label" TEXT NOT NULL,
    "props" JSONB NOT NULL,
    "type" "Component_types" NOT NULL,
    "postId" INTEGER,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "accounts.compound_id_unique" ON "accounts"("compound_id");

-- CreateIndex
CREATE INDEX "providerAccountId" ON "accounts"("provider_account_id");

-- CreateIndex
CREATE INDEX "providerId" ON "accounts"("provider_id");

-- CreateIndex
CREATE INDEX "userId" ON "accounts"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "sessions.session_token_unique" ON "sessions"("session_token");

-- CreateIndex
CREATE UNIQUE INDEX "sessions.access_token_unique" ON "sessions"("access_token");

-- CreateIndex
CREATE UNIQUE INDEX "users.email_unique" ON "users"("email");

-- CreateIndex
CREATE INDEX "email" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "verification_requests.token_unique" ON "verification_requests"("token");

-- CreateIndex
CREATE UNIQUE INDEX "spaces.key_unique" ON "spaces"("key");

-- CreateIndex
CREATE UNIQUE INDEX "spaces_imageId_unique" ON "spaces"("imageId");

-- CreateIndex
CREATE UNIQUE INDEX "images.asset_id_unique" ON "images"("asset_id");

-- CreateIndex
CREATE UNIQUE INDEX "posts.slug_unique" ON "posts"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "posts_main_image_id_unique" ON "posts"("main_image_id");

-- AddForeignKey
ALTER TABLE "spaces" ADD FOREIGN KEY("imageId")REFERENCES "images"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "posts" ADD FOREIGN KEY("main_image_id")REFERENCES "images"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "posts" ADD FOREIGN KEY("authorId")REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "posts" ADD FOREIGN KEY("postId")REFERENCES "posts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "components" ADD FOREIGN KEY("postId")REFERENCES "posts"("id") ON DELETE SET NULL ON UPDATE CASCADE;
