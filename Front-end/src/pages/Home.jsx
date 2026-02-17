import { useParams } from "react-router-dom";
import HeroSlider from "../components/HeroSlider";
import CardSlider from "../components/CardSlider";
import CategorySlider from "../components/CategorySlider";
import AdBanner from "../components/AdBanner";
import MenAdBanner from "../components/MenAdBanner";

export default function Home() {
  const { main, sub, type } = useParams();

  return (
    <div className="min-h-screen">
      {/* 1. Full Width Hero Section (No Padding) */}
      <HeroSlider />
      
      
      {/* This will now automatically show New Arrivals, Men, Women, etc. */}
      <CategorySlider />
      
      {/* Advertisement Banner */}
      <AdBanner />
      
      {/* Trending Products */}
      <CardSlider badgeType="trending" />
      
      {/* Best Seller Products */}
      <CardSlider badgeType="bestseller" />
      
      {/* Men's Advertisement Banner */}
      <MenAdBanner />
      
      {/* New Products */}
      <CardSlider badgeType="new" />
    </div>
  );
}