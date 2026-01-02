import React from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductGallery from '../components/ProductGallery';

export default function ProductGalleryPage() {
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');
  const mainCategory = searchParams.get('mainCategory');
  const subCategory = searchParams.get('subCategory');
  
  console.log('ProductGalleryPage params:', { category, mainCategory, subCategory });

  return (
    <ProductGallery 
      category={category}
      mainCategory={mainCategory}
      subCategory={subCategory}
    />
  );
}