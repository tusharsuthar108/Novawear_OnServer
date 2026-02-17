import React from 'react';
import { useSearchParams } from 'react-router-dom';
import CategoryPage from './CategoryPage';

export default function ProductGalleryPage() {
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');
  const mainCategory = searchParams.get('mainCategory');
  const subCategory = searchParams.get('subCategory');
  
  // Use CategoryPage component for consistent UI
  return <CategoryPage />;
}