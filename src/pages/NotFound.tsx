import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: Tried to access:", location.pathname);
  }, [location.pathname]);

  return (
    <Layout>
      <div className="container-custom py-32 flex flex-col items-center justify-center text-center animate-fade-in">
        <span className="text-secondary font-bold tracking-widest uppercase mb-4">404 Error</span>
        <h1 className="font-display text-5xl md:text-7xl font-bold text-foreground mb-6">
          Lost in <span className="text-secondary">Tasmania?</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-lg mb-12">
          The page you're looking for was either moved or never existed.
          Let's get you back on the right track for your adventure.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button variant="hero" size="lg" asChild>
            <Link to="/">
              <Home className="w-5 h-5 mr-2" />
              Return to Website
            </Link>
          </Button>
          <Button variant="outline" size="lg" onClick={() => window.history.back()}>
            <ArrowLeft className="w-5 h-5 mr-2" />
            Go Back
          </Button>
        </div>
        <div className="mt-16 grid grid-cols-2 md:grid-cols-3 gap-8 text-sm font-medium text-muted-foreground">
          <Link to="/vehicles" className="hover:text-secondary transition-colors">View Fleet</Link>
          <Link to="/about" className="hover:text-secondary transition-colors">Our Story</Link>
          <Link to="/contact" className="hover:text-secondary transition-colors">Need Help?</Link>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
