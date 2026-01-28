import React, { useState, useEffect } from 'react';
import { ShoppingCart, RefreshCcw, AlertTriangle } from 'lucide-react'; // Using lucide-react for icons
import type { Product } from './types/types';

const App: React.FC = () => {
  // 2. Use explicit TypeScript generics for useState hooks
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // The base URL for the Bun/Express server.
  // NOTE: If you run your server on a different port/host, update this URL.
  const API_BASE_URL = 'https://fakestoreapi.com';

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      // Connects to the local Bun/Express server endpoint
      const response = await fetch(`${API_BASE_URL}/products`);

      if (!response.ok) {
        // Throwing a standard Error will be caught below
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Assert data type as Product[]
      const data: Product[] = await response.json();
      setProducts(data);
    } catch (err) {
      console.error('Fetch failed:', err);
      // Type assertion for the error message
      const errorMessage =
        err instanceof Error ? err.message : 'An unknown error occurred.';
      setError(
        'Could not connect to Bun/Express server at ' +
          API_BASE_URL +
          '. Details: ' +
          errorMessage,
      );
      setProducts([]); // Clear any old data
    } finally {
      setLoading(false);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchProducts();
  }, []); // Empty dependency array ensures it runs once

  const Header: React.FC = () => (
    <div className='flex items-center justify-between p-4 bg-white shadow-lg rounded-xl mb-6'>
      <div className='flex items-center'>
        <ShoppingCart className='w-8 h-8 text-indigo-600 mr-3' />
        <h1 className='text-3xl font-extrabold text-gray-900'>
          Bun-Powered Store Frontend
        </h1>
      </div>
      <button
        onClick={fetchProducts}
        className='flex items-center px-4 py-2 bg-indigo-500 text-white font-semibold rounded-full shadow-md hover:bg-indigo-600 transition duration-150 ease-in-out'
        disabled={loading}
        aria-label='Refresh products'
      >
        <RefreshCcw
          className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`}
        />
        {loading ? 'Loading...' : 'Refresh'}
      </button>
    </div>
  );

  // 3. Define component props using the Product interface
  const ProductCard: React.FC<{ product: Product }> = ({ product }) => (
    <div className='product-card bg-white p-5 rounded-xl shadow-xl hover:shadow-2xl transition duration-300 flex flex-col'>
      {/* Product Image */}
      <div className='h-48 flex items-center justify-center overflow-hidden mb-4'>
        <img
          src={product.image}
          alt={product.title}
          className='max-h-full max-w-full object-contain'
          // Fallback image in case the URL is broken
          onError={(e) => {
            // e.target is implicitly HTMLImageElement
            const target = e.target as HTMLImageElement;
            target.onerror = null;
            target.src =
              'https://placehold.co/150x150/e0e7ff/3730a3?text=No+Image';
          }}
        />
      </div>

      {/* Product Details */}
      <h2
        className='text-lg font-bold text-gray-800 mb-1 line-clamp-2'
        title={product.title}
      >
        {product.title}
      </h2>
      <p className='text-sm text-indigo-600 font-medium mb-3'>
        {product.category}
      </p>

      {/* Price and Rating */}
      <div className='mt-auto pt-3 border-t border-gray-100 flex justify-between items-center'>
        <span className='text-2xl font-extrabold text-green-600'>
          ${product.price.toFixed(2)}
        </span>
        <div className='flex items-center text-sm text-yellow-500'>
          {/* Simple Star Rating display */}
          <span className='mr-1'>★ {product.rating.rate.toFixed(1)}</span>
          <span className='text-gray-500'>({product.rating.count})</span>
        </div>
      </div>
    </div>
  );

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 font-['Inter',_sans-serif]">
        <Header />
        <div className='max-w-4xl mx-auto p-6 bg-red-50 border border-red-300 rounded-xl shadow-lg flex items-start space-x-4'>
          <AlertTriangle className='w-6 h-6 text-red-500 flex-shrink-0 mt-1' />
          <div>
            <h2 className='text-xl font-bold text-red-700 mb-2'>
              Connection Error
            </h2>
            <p className='text-red-600'>{error}</p>
            <p className='text-sm mt-3 text-red-500'>
              Please check your console for details and ensure your Bun/Express
              server is running on port 3000.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (loading && products.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 font-['Inter',_sans-serif]">
        <Header />
        <div className='flex justify-center items-center h-64'>
          <div className='text-center'>
            <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4'></div>
            <p className='text-gray-600 text-lg'>
              Fetching data from Bun server...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8 font-['Inter',_sans-serif]">
      <div className='max-w-6xl mx-auto'>
        <Header />

        {products.length === 0 && !loading ? (
          <div className='text-center p-10 bg-white rounded-xl shadow-lg'>
            <p className='text-xl text-gray-500'>No products found.</p>
          </div>
        ) : (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
            {products.map((product) => (
              // TypeScript ensures that 'product' matches the required interface
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
      <style>{`
        /* Load Inter font (best practice for Tailwind) */
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');
      `}</style>
    </div>
  );
};

export default App;
