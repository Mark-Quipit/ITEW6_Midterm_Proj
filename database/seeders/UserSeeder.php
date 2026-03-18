<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create default admin user
        User::create([
            'name' => 'Admin User',
            'email' => 'admin@ccs.edu',
            'password' => Hash::make('password'),
            'role' => 'admin',
        ]);

        // Create default regular user
        User::create([
            'name' => 'Test User',
            'email' => 'user@ccs.edu',
            'password' => Hash::make('password'),
            'role' => 'user',
        ]);
    }
}
