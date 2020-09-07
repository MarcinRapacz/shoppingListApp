import React from "react";
import { IProduct } from "./IProduct";
import ProductForm from "./ProductForm";
import ProductList from "./ProductList";

interface Props {
  products: IProduct[];
  shoppingListStatus: string;
  upadateProductList: (produsts: IProduct[]) => void;
}

const ProductContainer: React.FC<Props> = ({
  products,
  shoppingListStatus,
  upadateProductList,
}: Props) => {
  const handleAddProduct = (product: IProduct) => {
    products.unshift(product);
  };

  return (
    <section className={`ProductContainer`}>
      {shoppingListStatus === "awaiting" && (
        <ProductForm addProduct={handleAddProduct} />
      )}
      <ProductList
        products={products}
        shoppingListStatus={shoppingListStatus}
        upadateProductList={upadateProductList}
      />
    </section>
  );
};

export default ProductContainer;
