import Link from 'next/link';

const strategies = [
  ['01', 'Leia antes de corrigir', 'Descubra o que a pessoa já comunica e qual necessidade aparece por trás da ação.'],
  ['02', 'Conecte antes de pedir', 'Use interesse, brincadeira e atenção compartilhada sem exigir contato visual.'],
  ['03', 'Modele e espere', 'Troque excesso de perguntas por linguagem curta, pausa real e respostas possíveis.'],
  ['04', 'Torne visível', 'Use apoios visuais e CAA para pedir, recusar, comentar, escolher e regular.'],
  ['05', 'Ensine na vida real', 'Transforme refeições, banho, brincadeira e escola em oportunidades funcionais.'],
];

const contents = [
  '15 páginas com linguagem direta e aplicação imediata',
  'Fichas para mapear o que acontece antes, durante e depois da comunicação',
  'Prancha inicial com mensagens funcionais',
  'Scripts para recusa, sobrecarga, espera, ajuda e pausa',
  'Plano de implementação de 30 dias sem promessas irreais',
  'Referências clínicas e científicas confiáveis',
];

const faqs = [
  ['Para quem é?', 'Para famílias, professores, cuidadores e profissionais que desejam apoiar a comunicação de pessoas autistas no cotidiano.'],
  ['Serve apenas para crianças não oralizadas?', 'Não. As estratégias apoiam diferentes perfis de fala e comunicação, incluindo CAA, gestos, escrita e fala.'],
  ['A apostila substitui terapia?', 'Não. É um material educativo para organizar práticas diárias e qualificar a conversa com a equipe profissional.'],
  ['Como recebo?', 'Após a confirmação do pagamento, a página libera o acesso ao material digital.'],
];

export default function Home() {
  return <main>
    <div className="announcement">Conhecimento que vira ação: comunicação mais acessível no dia a dia.</div>
    <section className="hero"><div className="container heroGrid">
      <div><span className="eyebrow">APOSTILA PRÁTICA • ACESSO DIGITAL</span><h1>Antes de pedir que a pessoa fale, aprenda a reconhecer tudo o que ela já comunica.</h1><p className="lead">Cinco estratégias para reduzir adivinhações, ampliar escolhas e transformar rotinas comuns em oportunidades reais de comunicação.</p><div className="proofStrip"><span>✓ Baseada em evidências</span><span>✓ Sem promessas milagrosas</span><span>✓ Aplicação em casa e na escola</span></div><div className="heroOffer"><div><small>Pagamento único</small><strong>R$ 19,90</strong><span>sem assinatura</span></div><Link className="button primary" href="/checkout">Quero aplicar as 5 estratégias →</Link></div><p className="micro">Pagamento seguro pelo Stripe • acesso liberado após confirmação</p></div>
      <div className="coverStage"><div className="bookMock"><span>5</span><h2>ESTRATÉGIAS PARA COMUNICAÇÃO NO AUTISMO</h2><p>Guia prático para famílias, educadores e profissionais</p><b>Margareth Almeida</b></div><span className="coverBadge">15 páginas<br/><strong>práticas e preenchíveis</strong></span></div>
    </div></section>
    <section className="section problem"><div className="container narrow center"><span className="eyebrow">O PROBLEMA NÃO É FALTA DE VONTADE</span><h2>Muitas tentativas de comunicação passam despercebidas porque os adultos procuram apenas palavras.</h2><p>Quando gesto, recusa, afastamento, entrega de objeto, pausa ou expressão corporal não são reconhecidos, a pessoa precisa se esforçar mais para ser compreendida. Esta apostila ensina a mudar esse olhar.</p></div></section>
    <section className="section"><div className="container"><div className="sectionHead"><span className="eyebrow">O MÉTODO EM CINCO MOVIMENTOS</span><h2>Não é uma lista de truques. É uma sequência para compreender, modelar e generalizar.</h2></div><div className="strategyGrid">{strategies.map(([n,t,d])=><article key={n}><span>{n}</span><h3>{t}</h3><p>{d}</p></article>)}</div></div></section>
    <section className="section dark"><div className="container valueGrid"><div><span className="eyebrow light">O QUE VOCÊ RECEBE</span><h2>Um material para abrir, marcar e usar durante a rotina.</h2><p>Você entende a lógica, vê exemplos e sai com uma ação pequena para testar no mesmo dia.</p></div><ul>{contents.map(x=><li key={x}>✓ {x}</li>)}</ul></div></section>
    <section className="section author"><div className="container authorCard"><div className="authorMark">MA</div><div><span className="eyebrow">POR MARGARETH ALMEIDA</span><h2>Conhecimento técnico traduzido para a vida real.</h2><p>Neuropsicopedagoga e educadora dedicada ao desenvolvimento e à inclusão de crianças e adolescentes neurodivergentes. O material orienta práticas responsáveis, sem transformar cada interação em teste ou cobrança.</p></div></div></section>
    <section className="section offer"><div className="container offerCard"><div><span className="eyebrow light">COMECE POR UMA ROTINA</span><h2>Você não precisa mudar tudo hoje. Precisa saber qual pequeno ajuste fazer primeiro.</h2><p>Escolha uma situação, observe padrões, modele uma mensagem funcional e registre o que realmente mudou.</p></div><div className="priceCard"><small>Acesso digital</small><strong>R$ 19,90</strong><span>pagamento único</span><Link className="button paper" href="/checkout">Acessar a apostila agora</Link><em>Checkout embedded e seguro</em></div></div></section>
    <section className="section faq"><div className="container faqGrid"><div><span className="eyebrow">DÚVIDAS IMPORTANTES</span><h2>Clareza antes da compra.</h2></div><div>{faqs.map(([q,a])=><details key={q}><summary>{q}</summary><p>{a}</p></details>)}</div></div></section>
    <footer><span>Margareth Almeida • Comunicação com respeito</span><span>Material educativo • 2026</span></footer>
  </main>;
}
