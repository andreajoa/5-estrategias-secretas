import Link from 'next/link';
import CheckoutForm from './CheckoutForm';

export const metadata = { title: 'Finalizar acesso | 5 Estratégias', robots: { index: false, follow: false } };

export default function CheckoutPage() {
  return <main className="checkoutShell">
    <header className="checkoutTop"><Link href="/">← Voltar</Link><span>🔒 Pagamento protegido pelo Stripe</span></header>
    <section className="checkoutGrid">
      <div className="checkoutCopy">
        <span className="eyebrow">VOCÊ NÃO ESTÁ COMPRANDO MAIS INFORMAÇÃO</span>
        <h1>Você está levando um roteiro para saber o que observar e o que fazer na próxima tentativa de comunicação.</h1>
        <p className="lead">A apostila transforma conceitos de comunicação funcional em ações pequenas, registráveis e possíveis de aplicar em casa ou na escola.</p>
        <div className="checkoutBenefits"><strong>Ao finalizar, você recebe:</strong><ul><li>✓ 5 estratégias baseadas em práticas reconhecidas</li><li>✓ fichas, checklists e scripts prontos</li><li>✓ plano de implementação de 30 dias</li><li>✓ acesso digital após confirmação</li></ul></div>
        <div className="checkoutAuthor"><b>Margareth Almeida</b><span>Neuropsicopedagoga e educadora</span></div>
      </div>
      <aside className="paymentCard">
        <div className="productMini"><small>APOSTILA DIGITAL</small><h2>5 Estratégias para Comunicação no Autismo</h2></div>
        <div className="priceLine"><div><span>Pagamento único</span><strong>R$ 19,90</strong></div><small>Sem mensalidade<br/>Sem cobrança recorrente</small></div>
        <div className="decision"><h3>Finalize para receber o material.</h3><p>Os dados são processados diretamente pelo Stripe.</p></div>
        <div className="stripeBox"><CheckoutForm/></div>
        <div className="trust"><span>🔒 Dados protegidos</span><span>⚡ Acesso após confirmação</span><span>✓ Compra única</span></div>
      </aside>
    </section>
  </main>;
}
