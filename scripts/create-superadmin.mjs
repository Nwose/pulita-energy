import { PrismaClient } from '../app/generated/prisma/index.js';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function createSuperAdmin() {
    const email = 'admin@pulita.com';
    const password = 'admin123';
    const role = 'superadmin';

    try {
        // Check if user already exists
        const existing = await prisma.user.findUnique({ where: { email } });
        if (existing) {
            console.log('Superadmin already exists:', email);
            return;
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create superadmin
        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                role,
            },
        });

        console.log('Superadmin created successfully:');
        console.log('Email:', email);
        console.log('Password:', password);
        console.log('Role:', role);
        console.log('ID:', user.id);

    } catch (error) {
        console.error('Error creating superadmin:', error);
    } finally {
        await prisma.$disconnect();
    }
}

createSuperAdmin(); 