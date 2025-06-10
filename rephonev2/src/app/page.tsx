import AllProductsSection from "@/components/AllProductsSection";
import CategoryGrid from "@/components/CategoryGrid";
import FeaturedProducts from "@/components/FeaturedProducts";
import HeroSection from "@/components/HeroSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import NewsletterSection from "@/components/NewsletterSection";
import MobileFooter from "@/components/MobileFooter";
import RecentlyViewed from "@/components/RecentlyViewed";
import BrandMarquee from "@/components/brand-marquee";

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <BrandMarquee />
      <CategoryGrid />
      <FeaturedProducts />
      <RecentlyViewed limit={6} />
      <WhyChooseUs />
      <AllProductsSection />
      <NewsletterSection />
      <MobileFooter />
    </div>
  );
}
