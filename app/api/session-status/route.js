import { NextResponse } from 'next/server';
export const runtime='nodejs'; export const dynamic='force-dynamic';
const BACKEND='https://descobrindo-os-cinco-sentidos.vercel.app';
export async function GET(request){const id=request.nextUrl.searchParams.get('session_id');if(!id||!id.startsWith('cs_'))return NextResponse.json({error:'Sessão inválida.'},{status:400});try{const r=await fetch(`${BACKEND}/api/estrategias-session-status?session_id=${encodeURIComponent(id)}`,{cache:'no-store',signal:AbortSignal.timeout(15000)});const d=await r.json().catch(()=>({}));return NextResponse.json(d,{status:r.status,headers:{'Cache-Control':'no-store'}})}catch(e){return NextResponse.json({error:'Não foi possível confirmar o pagamento.'},{status:502})}}
