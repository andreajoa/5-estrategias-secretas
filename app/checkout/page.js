import Link from 'next/link';
import CheckoutForm from './CheckoutForm';
import { apostilaCover, margarethPhoto } from '../mediaData';

export const metadata = {
  title: 'Finalizar acesso | 5 Estratégias',
  robots: { index: false, follow: false },
};

export default function CheckoutPage() {
  return (
    <main className="checkoutShell">
      <header className="checkoutTop">
        <Link href="/">← Voltar</Link>
        <span>🔒 Pagamento protegido pelo Stripe</span>
      </header>

      <section className="checkoutGrid">
        <div className="checkoutCopy">
          <span className="eyebrow">VOCÊ NÃO ESTÁ COMPRANDO MAIS INFORMAÇÃO</span>
          <h1>Você está levando um roteiro para saber o que observar e o que fazer na próxima tentativa de comunicação.</h1>
          <p className="lead">
            A apostila transforma conceitos de comunicação funcional em ações visuais, registráveis e possíveis de aplicar durante as rotinas reais da criança.
          </p>

          <div className="checkoutBenefits">
            <strong>Ao finalizar, você recebe:</strong>
            <ul>
              <li>✓ 22 páginas ilustradas e organizadas como apostila</li>
              <li>✓ cinco estratégias explicadas com situações do cotidiano</li>
              <li>✓ fichas, pranchas, checklists e scripts prontos</li>
              <li>✓ plano de prática de 30 dias sem promessa artificial</li>
              <li>✓ acesso digital após a confirmação do pagamento</li>
            </ul>
          </div>

          <div className="checkoutAuthor">
            <img className="checkoutAuthorPhoto" src={margarethPhoto} alt="Margareth Almeida" />
            <div>
              <b>Margareth Almeida</b>
              <span>Neuropsicopedagoga e educadora</span>
              <small>Conteúdo técnico traduzido para casa, escola e atendimento.</small>
            </div>
          </div>
        </div>

        <aside className="paymentCard">
          <div className="productMini">
            <img className="checkoutCover" src={apostilaCover} alt="Capa da apostila 5 Estratégias para Comunicação com Autismo" />
            <div>
              <small>APOSTILA DIGITAL ILUSTRADA</small>
              <h2>5 Estratégias para Comunicação com Autismo</h2>
              <p>Material prático, visual e preenchível.</p>
            </div>
          </div>

          <div className="priceLine">
            <div>
              <span>Oferta especial</span>
              <small style={{ display: 'block', marginTop: 4, color: 'rgba(255,255,255,.72)', textAlign: 'left' }}>
                De <s>R$ 19,90</s> por
              </small>
              <strong>R$ 5,10</strong>
            </div>
            <small>Sem mensalidade<br />Sem cobrança recorrente</small>
          </div>

          <div className="decision">
            <span className="eyebrow">FINALIZE SEU ACESSO</span>
            <h3>Preencha os dados abaixo para receber a apostila após a confirmação.</h3>
            <p>O pagamento é processado diretamente pelo Stripe. Seus dados de cartão não ficam armazenados neste site.</p>
          </div>

          <div className="stripeBox"><CheckoutForm /></div>

          <div className="trust">
            <span>🔒 Dados protegidos</span>
            <span>⚡ Acesso após confirmação</span>
            <span>✓ Compra única</span>
          </div>
        </aside>
      </section>
    </main>
  );
}
