import { ShoppingCart, RefreshCcw } from 'lucide-react';

type HeaderProps = {
  fetchProducts: () => Promise<void>;
  loading: boolean;
};

const Header = ({ fetchProducts, loading }: HeaderProps) => (
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
      <RefreshCcw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
      {loading ? 'Loading...' : 'Refresh'}
    </button>
  </div>
);

export default Header;
