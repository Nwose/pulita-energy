import { ConvexHttpClient } from "convex/browser";
import { api } from "../convex/_generated/api.js";
import { config } from 'dotenv';
config({ path: '.env.local' });

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL);

async function createSuperadmin() {
    try {
        console.log("Creating superadmin user...");

        const result = await convex.mutation(api.auth.register, {
            email: "superadmin@pulitaenergy.ng",
            password: "superadmin123",
            role: "superadmin"
        });

        console.log("✅ Superadmin created successfully!");
        console.log("Email: superadmin@pulitaenergy.ng");
        console.log("Password: superadmin123");
        console.log("Role: superadmin");
        console.log("User ID:", result.id);

    } catch (error) {
        console.error("❌ Error creating superadmin:", error.message);
    }
}

createSuperadmin(); 