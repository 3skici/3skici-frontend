import React from 'react';

const ProductDetails = () => {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Product Image */}
        <div>
          <img src="/path/to/product.jpg" alt="Product Name" className="w-full h-96 object-cover rounded-lg" />
        </div>
        
        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold mb-4">Vintage Lamp</h1>
          <p className="text-gray-700 mb-4">Condition: sold</p>
          <p className="text-xl text-gray-700 mb-2">$200</p>
          <p className="mb-6">A beautiful vintage lamp in perfect condition. Add a touch of retro style to your living room.</p>

          <button className="w-full py-3 px-6 bg-blue-600 text-white rounded hover:bg-blue-700">Buy Now</button>
        </div>
      </div>
      <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <img src="{product.image}" alt="{product.name}" className="w-full h-auto" />
        <div>
          <h1 className="text-3xl font-bold mb-4">name</h1>
          <p className="text-gray-700 mb-4">Condition: good</p>
          <p className="text-lg font-semibold mb-4">$166</p>
          <p className="mb-6">description</p>
          <button className="bg-indigo-600 text-white rounded-lg px-6 py-2">
            Buy Now
          </button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default ProductDetails;
