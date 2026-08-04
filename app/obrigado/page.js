import AccessClient from './AccessClient';
export const metadata={title:'Acesso à apostila | Compra confirmada',robots:{index:false,follow:false}};
export default async function Obrigado({searchParams}){const p=await searchParams;return <main className="thanksShell"><section className="thanksCard"><span className="eyebrow">COMPRA CONCLUÍDA</span><h1>Seu próximo passo já está organizado.</h1><AccessClient sessionId={p?.session_id||''}/></section></main>}
