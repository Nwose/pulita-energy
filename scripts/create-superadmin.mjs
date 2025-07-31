import { ConvexHttpClient } from 'convex/browser';
import { api } from '../convex/_generated/api.js';
import { config } from 'dotenv';

// Load environment variables
config({ path: '.env.local' });

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL);

async function createSuperAdmin() {
    const email = 'admin@pulita.com';
    const password = 'admin123';
    const role = 'superadmin';

    try {
        // Create superadmin using Convex
        const result = await convex.mutation(api.auth.register, {
            email,
            password,
            role,
        });

        console.log('Superadmin created successfully:');
        console.log('Email:', email);
        console.log('Password:', password);
        console.log('Role:', role);
        console.log('ID:', result.id);

    } catch (error) {
        if (error.message?.includes('already exists')) {
            console.log('Superadmin already exists:', email);
        } else {
            console.error('Error creating superadmin:', error);
        }
    }
}

createSuperAdmin(); 