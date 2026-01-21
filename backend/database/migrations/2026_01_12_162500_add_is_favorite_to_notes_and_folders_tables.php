<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('notes', function (Blueprint $table) {
            $table->boolean('is_favorite')->default(false)->after('title');
        });

        Schema::table('note_folders', function (Blueprint $table) {
            $table->boolean('is_favorite')->default(false)->after('name');
        });
    }

    public function down(): void
    {
        Schema::table('notes', function (Blueprint $table) {
            $table->dropColumn('is_favorite');
        });

        Schema::table('note_folders', function (Blueprint $table) {
            $table->dropColumn('is_favorite');
        });
    }
};
