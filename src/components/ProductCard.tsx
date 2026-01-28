import type { Product } from '../types/types';

type ProductCardProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => (
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

export default ProductCard;
