import ShippingForm from '../components/checkout/ShippingForm';
import PaymentMethod from '../components/checkout/PaymentMethod';
import OrderSummary from '../components/checkout/OrderSummary';

export default function CheckoutPage() {
  return (
    <main className="pt-24 pb-16">
      <div className="container-main">
        <h1 className="text-4xl md:text-5xl font-black text-primary mb-2 tracking-tight">CHECKOUT</h1>
        <p className="text-on-surface-variant mb-10">Finalize your acquisition of premium digital artifacts. Complete the shipping details below.</p>
        <div className="flex flex-col lg:flex-row gap-10">
          <div className="flex-1">
            <ShippingForm />
            <PaymentMethod />
          </div>
          <div className="lg:w-[400px]">
            <OrderSummary />
          </div>
        </div>
      </div>
    </main>
  );
}
