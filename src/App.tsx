import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { CartProvider } from "@/contexts/CartContext";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Formacion from "@/pages/Formacion";
import Catalogo from "@/pages/Catalogo";
import ProductDetail from "@/pages/ProductDetail";
import Cart from "@/pages/Cart";
import OrderConfirmed from "@/pages/OrderConfirmed";
import CatalogoAdmin from "@/pages/CatalogoAdmin";
import FormacionAdmin from "@/pages/FormacionAdmin";
import PoliticaPrivacidad from "@/pages/PoliticaPrivacidad";
import PoliticaCookies from "@/pages/PoliticaCookies";
import AvisoLegal from "@/pages/AvisoLegal";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/formacion/admin" component={FormacionAdmin} />
      <Route path="/formacion" component={Formacion} />
      <Route path="/catalogo/producto/:id" component={ProductDetail} />
      <Route path="/catalogo/carrito" component={Cart} />
      <Route path="/catalogo/pedido-confirmado" component={OrderConfirmed} />
      <Route path="/catalogo/admin" component={CatalogoAdmin} />
      <Route path="/catalogo" component={Catalogo} />
      <Route path="/privacidad" component={PoliticaPrivacidad} />
      <Route path="/cookies" component={PoliticaCookies} />
      <Route path="/aviso-legal" component={AvisoLegal} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <CartProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </CartProvider>
    </ErrorBoundary>
  );
}

export default App;
