import Link from 'next/link';
import { apostilaCover, margarethPhoto } from './mediaData';

const strategies = [
  ['01', 'Leia antes de corrigir', 'Descubra o que a criança já tenta comunicar e qual necessidade aparece antes da ação.'],
  ['02', 'Conecte antes de pedir', 'Entre na brincadeira, acompanhe o interesse e construa atenção compartilhada sem exigir contato visual.'],
  ['03', 'Modele e espere', 'Use linguagem curta, uma pausa real e aceite respostas por gesto, olhar, símbolo, escrita ou fala.'],
  ['04', 'Torne visível', 'Use rotina visual e CAA para pedir, recusar, escolher, comentar e solicitar ajuda ou pausa.'],
  ['05', 'Ensine na vida real', 'Transforme refeições, banho, brincadeira e escola em oportunidades funcionais de comunicação.'],
];

const contents = [
  '22 páginas ilustradas, organizadas como uma apostila prática',
  'Exemplos visuais de brincadeira, alimentação, rotina, escola e autorregulação',
  'Ficha A-C-R para entender o que acontece antes, durante e depois da comunicação',
  'Prancha inicial de mensagens funcionais e exemplos de CAA',
  'Scripts para recusa, sobrecarga, espera, ajuda e pausa',
  'Plano de prática de 30 dias e planejador semanal preenchível',
  'Orientações responsáveis, sem promessas milagrosas nem técnicas de obediência',
];

const useCases = [
  ['Na hora da refeição', 'Ajude a criança a escolher, pedir mais, recusar e indicar que terminou.'],
  ['Durante a brincadeira', 'Crie turnos, modele palavras possíveis e compartilhe o interesse da criança.'],
  ['Nas transições', 'Antecipe o que vai acontecer e ensine formas de pedir tempo, ajuda ou pausa.'],
  ['Na escola', 'Apoie participação, comunicação social e autonomia sem transformar tudo em teste.'],
];

const faqs = [
  ['Para quem é?', 'Para famílias, professores, cuidadores e profissionais que desejam apoiar a comunicação de pessoas autistas no cotidiano.'],
  ['Serve apenas para crianças não oralizadas?', 'Não. As estratégias contemplam diferentes perfis de comunicação, incluindo gestos, CAA, escrita, vocalizações e fala.'],
  ['O plano de 30 dias garante resultados?', 'Não. Os 30 dias organizam observação e prática. Cada pessoa possui ritmo, necessidades e formas de acesso diferentes.'],
  ['A apostila substitui terapia?', 'Não. É um material educativo para orientar a prática diária e qualificar a conversa com a equipe profissional.'],
  ['Como recebo?', 'Após a confirmação do pagamento, a página libera o acesso digital ao material.'],
];

export default function Home() {
  return (
    <main>
      <div className="announcement">
        <span aria-hidden="true">✦</span>
        Comunicação não começa na fala. Começa quando alguém percebe que há algo a ser dito.
      </div>

      <section className="hero">
        <div className="container heroGrid">
          <div>
            <span className="eyebrow">APOSTILA ILUSTRADA • APLICAÇÃO NO DIA A DIA</span>
            <h1>Antes de pedir que a criança fale, aprenda a reconhecer tudo o que ela já comunica.</h1>
            <p className="lead">
              Cinco estratégias para reduzir adivinhações, ampliar escolhas e transformar momentos comuns em oportunidades reais de comunicação — sem forçar fala, contato visual ou obediência.
            </p>

            <div className="proofStrip">
              <span>✓ 22 páginas ilustradas</span>
              <span>✓ Fichas e pranchas práticas</span>
              <span>✓ Para casa e escola</span>
            </div>

            <div className="heroOffer">
              <div>
                <small>Oferta especial</small>
                <span style={{ marginBottom: 5 }}>De <s>R$ 19,90</s> por</span>
                <strong>R$ 5,10</strong>
                <span>pagamento único • sem assinatura</span>
              </div>
              <Link className="button primary" href="/checkout">
                Quero aplicar as 5 estratégias <span aria-hidden="true">→</span>
              </Link>
            </div>
            <p className="micro">🔒 Pagamento seguro pelo Stripe • acesso liberado após confirmação</p>
          </div>

          <div className="coverStage">
            <div className="coverGlow" aria-hidden="true" />
            <img
              className="apostilaCover"
              src={apostilaCover}
              alt="Apostila em espiral 5 Estratégias Secretas para Comunicação com Autismo, de Margareth Almeida"
            />
            <span className="coverBadge">
              Material visual<br />
              <strong>prático e preenchível</strong>
            </span>
          </div>
        </div>
      </section>

      <section className="section problem">
        <div className="container narrow center">
          <span className="eyebrow">O PROBLEMA NÃO É FALTA DE VONTADE</span>
          <h2>Muitas tentativas de comunicação passam despercebidas porque os adultos procuram apenas palavras.</h2>
          <p>
            Apontar, afastar, entregar um objeto, repetir uma frase, cobrir os ouvidos ou sair do lugar também pode comunicar. Quando o adulto entende o padrão, deixa de apenas reagir e começa a ensinar uma alternativa possível.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="sectionHead">
            <span className="eyebrow">O MÉTODO EM CINCO MOVIMENTOS</span>
            <h2>Você não recebe uma lista de truques. Recebe uma sequência para observar, conectar, modelar e generalizar.</h2>
          </div>
          <div className="strategyGrid">
            {strategies.map(([number, title, description]) => (
              <article key={number}>
                <span>{number}</span>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section everyday">
        <div className="container">
          <div className="sectionHead center narrow">
            <span className="eyebrow">A COMUNICAÇÃO ACONTECE NA VIDA REAL</span>
            <h2>A apostila mostra como aplicar cada estratégia justamente nos momentos em que as dúvidas aparecem.</h2>
          </div>
          <div className="useCaseGrid">
            {useCases.map(([title, description], index) => (
              <article key={title}>
                <span aria-hidden="true">{['🍎', '🧩', '🗓️', '✦'][index]}</span>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section dark">
        <div className="container valueGrid">
          <div>
            <span className="eyebrow light">O QUE VOCÊ RECEBE</span>
            <h2>Uma apostila para abrir durante a rotina — não um arquivo para esquecer na pasta.</h2>
            <p>
              Você entende a lógica, vê exemplos ilustrados, registra o que observou e escolhe uma ação pequena para testar no mesmo dia.
            </p>
          </div>
          <ul>
            {contents.map((item) => <li key={item}>✓ {item}</li>)}
          </ul>
        </div>
      </section>

      <section className="section author">
        <div className="container authorCard">
          <img className="authorPhoto" src={margarethPhoto} alt="Margareth Almeida" />
          <div>
            <span className="eyebrow">POR MARGARETH ALMEIDA</span>
            <h2>Conhecimento técnico traduzido para situações que acontecem dentro de casa e da escola.</h2>
            <p>
              Neuropsicopedagoga e educadora dedicada ao desenvolvimento e à inclusão de crianças e adolescentes neurodivergentes. O material orienta práticas responsáveis, sem transformar cada interação em prova, cobrança ou tentativa de normalização.
            </p>
            <div className="authorityTags">
              <span>Neuropsicopedagogia</span>
              <span>Educação inclusiva</span>
              <span>Desenvolvimento infantil</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section offer">
        <div className="container offerCard">
          <div>
            <span className="eyebrow light">COMECE POR UMA ÚNICA ROTINA</span>
            <h2>Você não precisa mudar tudo hoje. Precisa saber qual pequeno ajuste fazer primeiro.</h2>
            <p>
              Escolha uma situação, observe o padrão, modele uma mensagem funcional e registre o que aconteceu. A apostila mostra como fazer isso passo a passo.
            </p>
          </div>
          <div className="priceCard">
            <img src={apostilaCover} alt="Capa da apostila" />
            <small>Oferta especial</small>
            <span>De <s>R$ 19,90</s> por</span>
            <strong>R$ 5,10</strong>
            <span>pagamento único • sem assinatura</span>
            <Link className="button paper" href="/checkout">Acessar a apostila agora</Link>
            <em>Checkout embedded e seguro</em>
          </div>
        </div>
      </section>

      <section className="section faq">
        <div className="container faqGrid">
          <div>
            <span className="eyebrow">DÚVIDAS IMPORTANTES</span>
            <h2>Clareza antes da compra.</h2>
          </div>
          <div>
            {faqs.map(([question, answer]) => (
              <details key={question}>
                <summary>{question}</summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <footer>
        <span>Margareth Almeida • Comunicação com respeito</span>
        <span>Material educativo • 2026</span>
      </footer>
    </main>
  );
}
