import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronRight, Check } from 'lucide-react';
import { vehicleCategories } from '@/lib/vehicleCategories';

const FleetPreview = () => {
  return (
    <section className="bg-muted/30 section-padding">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 animate-fade-in">
            Browse by Category
          </h2>
          <p className="text-muted-foreground text-lg animate-fade-in animation-delay-100">
            Find the perfect vehicle for your journey. From compact cars to spacious SUVs.
          </p>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {vehicleCategories.map((category, index) => (
            <Link
              key={category.id}
              to={`/vehicles?category=${category.id}`}
              className="group"
            >
              <div
                className="bg-card rounded-2xl p-6 shadow-soft hover:shadow-lg transition-all hover:-translate-y-1 animate-fade-in h-full"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Icon */}
                <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">
                  {category.icon}
                </div>

                {/* Title & Price */}
                <div className="mb-3">
                  <h3 className="font-display text-xl font-semibold text-foreground mb-1">
                    {category.name}
                  </h3>
                  <p className="text-secondary font-semibold">
                    {category.priceRange}
                  </p>
                </div>

                {/* Description */}
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                  {category.description}
                </p>

                {/* Features */}
                <div className="space-y-2 mb-6">
                  {category.features.slice(0, 3).map(feature => (
                    <div key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Check className="w-4 h-4 text-secondary flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <div className="flex items-center gap-2 text-secondary font-semibold group-hover:gap-3 transition-all">
                  <span>View All</span>
                  <ChevronRight className="w-5 h-5" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Button variant="secondary" size="lg" asChild>
            <Link to="/vehicles">
              Browse All Vehicles
              <ChevronRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FleetPreview;
