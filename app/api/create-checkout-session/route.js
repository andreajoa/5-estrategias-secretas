import { NextResponse } from 'next/server';
export const runtime='nodejs'; export const dynamic='force-dynamic';
const BACKEND='https://descobrindo-os-cinco-sentidos.vercel.app';
export async function POST(){try{const r=await fetch(`${BACKEND}/api/estrategias-checkout`,{method:'POST',cache:'no-store',signal:AbortSignal.timeout(20000)});const d=await r.json().catch(()=>({}));if(!r.ok||!d.clientSecret)return NextResponse.json({error:d.error||'A sessão de pagamento não pôde ser criada.'},{status:r.ok?502:r.status});return NextResponse.json({clientSecret:d.clientSecret},{headers:{'Cache-Control':'no-store'}})}catch(e){return NextResponse.json({error:'Não foi possível conectar ao servidor de pagamentos.'},{status:502})}}
