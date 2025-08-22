import dotenv from 'dotenv';
dotenv.config();

export const env = {
    nodeEnv: process.env.NODE_ENV ?? 'development',
    port: Number(process.env.PORT ?? 3000),
    corsOrigin:  process.env.CORS_ORIGIN ?? '*',
    mongoUri: process.env.MONGODB_URI,
    jwt: {
        accessSecret: process.env.JWT_ACCESS_SECRET ,
        refreshSecret: process.env.JWT_REFRESH_SECRET ,
        accessTtl: process.env.JWT_ACCESS_TTL ?? '15m',
        refreshTtl:process.env.JWT_REFRESH_TTL ?? '7d',
    },
    qrSigningSecret:process.env.QR_SIGNING_SECRET,
    supabase: {
        url: process.env.SUPABASE_URL,
        serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
        bucket: process.env.SUPABASE_BUCKET
    }
}

['mongoUri', 'jwt', 'qrSigningSecret', 'supabase'].forEach((k) => {
    if (k === 'jwt') {
        if (!env.jwt.accessSecret || !env.jwt.refreshSecret ) {
            console.warn('[WARN] Missing JWT secrets. Set JWT_ACCESS_SECRET and JWT_REFRESH_SECRET');
        }
    } else if (k === 'supabase'){
        if (!env.supabase.url || !env.supabase.serviceRoleKey ) {
            console.warn('[WARN] Missing Supabase config. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY');
        }
    } else if (!env[k]){
        console.warn(`[WARN] Missing env var for ${k}`);
    }
});