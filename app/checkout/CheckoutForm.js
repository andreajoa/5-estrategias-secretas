'use client';
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useCallback, useEffect, useMemo, useState } from 'react';

export default function CheckoutForm() {
  const [key,setKey]=useState('');
  const [error,setError]=useState('');
  useEffect(()=>{let active=true;fetch('/api/payment-config',{cache:'no-store'}).then(async r=>{const d=await r.json().catch(()=>({}));if(!r.ok||!d.publishableKey)throw new Error(d.error||'Não foi possível carregar o pagamento.');if(active)setKey(d.publishableKey)}).catch(e=>active&&setError(e.message));return()=>{active=false}},[]);
  const stripe=useMemo(()=>key?loadStripe(key):null,[key]);
  const fetchClientSecret=useCallback(async()=>{const r=await fetch('/api/create-checkout-session',{method:'POST',cache:'no-store'});const d=await r.json().catch(()=>({}));if(!r.ok||!d.clientSecret)throw new Error(d.error||'Não foi possível iniciar o pagamento.');return d.clientSecret},[]);
  const options=useMemo(()=>({fetchClientSecret}),[fetchClientSecret]);
  if(error)return <div className="paymentError"><b>O pagamento não carregou.</b><p>{error}</p><button onClick={()=>location.reload()}>Tentar novamente</button></div>;
  if(!stripe)return <div className="paymentLoading"><span></span><b>Carregando pagamento seguro...</b></div>;
  return <EmbeddedCheckoutProvider stripe={stripe} options={options}><EmbeddedCheckout/></EmbeddedCheckoutProvider>;
}
