import { NextResponse } from 'next/server';
export const runtime='nodejs'; export const dynamic='force-dynamic';
const BACKEND='https://descobrindo-os-cinco-sentidos.vercel.app';
export async function GET(){try{const r=await fetch(`${BACKEND}/api/estrategias-stripe-config`,{cache:'no-store',signal:AbortSignal.timeout(15000)});const d=await r.json().catch(()=>({}));if(!r.ok||!d.publishableKey)return NextResponse.json({error:d.error||'Configuração de pagamento indisponível.'},{status:r.ok?502:r.status});return NextResponse.json(d,{headers:{'Cache-Control':'no-store'}})}catch(e){return NextResponse.json({error:'Não foi possível conectar ao servidor de pagamentos.'},{status:502})}}
