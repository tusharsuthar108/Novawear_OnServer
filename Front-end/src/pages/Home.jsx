import { useParams } from "react-router-dom";
import HeroSlider from "../components/HeroSlider";
import CardSlider from "../components/CardSlider";
import CategorySlider from "../components/CategorySlider";

export default function Home() {
  const { main, sub, type } = useParams();

  return (
    <div className="min-h-screen">
      {/* 1. Full Width Hero Section (No Padding) */}
      <HeroSlider />
      
      {/* This will now automatically show New Arrivals, Men, Women, etc. */}
      <CategorySlider />
      
      {/* Trending Products */}
      <CardSlider badgeType="trending" />
      
      {/* Best Seller Products */}
      <CardSlider badgeType="bestseller" />
      
      {/* New Products */}
      <CardSlider badgeType="new" />
    </div>
  );
}