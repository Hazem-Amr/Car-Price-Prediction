import Hero from "../components/Hero";
import SearchBar from "../components/SearchBar";
import FeaturedCars from "../components/FeaturedCars";
import BrandGrid from "../components/BrandGrid";
import StatsSection from "../components/StatsSection";
import CTASection from "../components/CTASection";
import PricePredictor from "../components/PricePredictorSection";
import BrowseCategories from "../components/BrowseCategories";

export default function Home() {
  return (
    <>
      <Hero />
      <SearchBar />
      <BrowseCategories />
      <FeaturedCars />
      <BrandGrid />
      <StatsSection />
      <CTASection />
    </>
  );
}
