import React from "react";
import { IProduct } from "./IProduct";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbsUp,
  faThumbsDown,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import * as ProductAPI from "../../api/product";
import "./Product.scss";

interface Props {
  products: IProduct[];
  shoppingListStatus: string;
  upadateProductList: (products: IProduct[]) => void;
}

const ProductList: React.FC<Props> = (props: Props) => {
  const handleRemoveProduct = async (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    id: string
  ) => {
    try {
      const response = await ProductAPI.remove(id);
      props.upadateProductList(
        props.products.filter((product) => product._id !== id)
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleProductStatus = async (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    id: string,
    status: string
  ) => {
    try {
      e.preventDefault();

      const response = await ProductAPI.update(id, { status });

      props.upadateProductList(
        props.products.map((product) => {
          if (product._id === response.data.product._id) {
            product.status = response.data.product.status;
          }
          return product;
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className={`ProductList`}>
      {props.products.map((product) => (
        <div className={"item my-2"} key={product._id}>
          <h4 className={`name`}>{product.name}</h4>
          <div className="actionButton">
            {props.shoppingListStatus === "active" && (
              <Button
                variant={`${
                  product.status === "in" ? "success" : "outline-success"
                }`}
                className={`mx-1`}
                onClick={(e) => handleProductStatus(e, product._id, "in")}
              >
                <FontAwesomeIcon icon={faThumbsUp} />
              </Button>
            )}
            {props.shoppingListStatus === "active" && (
              <Button
                variant={`${
                  product.status === "missing" ? "danger" : "outline-danger"
                }`}
                className={`mx-1`}
                onClick={(e) => handleProductStatus(e, product._id, "missing")}
              >
                <FontAwesomeIcon icon={faThumbsDown} />
              </Button>
            )}
            {props.shoppingListStatus === "awaiting" && (
              <Button
                variant={`outline-danger`}
                className={`mx-1`}
                onClick={(e) => handleRemoveProduct(e, product._id)}
              >
                <FontAwesomeIcon icon={faTrashAlt} />
              </Button>
            )}
          </div>
        </div>
      ))}
    </section>
  );
};

ProductList.defaultProps = {
  products: [],
};

export default ProductList;
