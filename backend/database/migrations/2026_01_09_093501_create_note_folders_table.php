<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('note_folders', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('parent_id')->nullable();
            $table->string('name');
            $table->string('icon')->default('Folder');
            $table->timestamps();

            $table->foreign('parent_id')->references('id')->on('note_folders')->cascadeOnDelete();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('note_folders');
    }
};
