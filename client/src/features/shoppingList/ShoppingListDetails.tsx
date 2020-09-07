import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useParams, useHistory, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackspace, faEdit } from "@fortawesome/free-solid-svg-icons";
import "./ShoppingList.scss";

// Interfaces
import { IShoppingList } from "./IShoppingList";

// Api
import * as shoppingListAPI from "../../api/shoppingList";

// Components
import Status from "../../components/Status/Status";
import FormShoppingList from "./FormShoppingList";

// Actions
import * as alertActions from "../alert/alertSlice";
import * as loaderActions from "../loader/loaderSlice";
import ProductContainer from "../product/ProductContainer";
import { IProduct } from "../product/IProduct";

interface Params {
  id: string;
}

const ShoppingListDetails: React.FC = () => {
  const params = useParams<Params>();
  const history = useHistory();
  const dispatch = useDispatch();
  const [shoppingList, setShoppingList] = React.useState<IShoppingList>(
    {} as IShoppingList
  );
  const [isEditMode, setIsEditMode] = React.useState(false);
  const { name, status, _id, products } = shoppingList;

  const handleUpdateProductList = (products: IProduct[]) => {
    setShoppingList({ ...shoppingList, products });
  };

  const getShoppingList = React.useCallback(
    async (id: string) => {
      try {
        dispatch(loaderActions.set({ active: true }));
        const response = await shoppingListAPI.get(id);
        setShoppingList(response.data.shoppingList);
        dispatch(loaderActions.set({ active: false }));
      } catch (error) {
        dispatch(
          alertActions.show({
            message: error.response.data.message,
            status: "danger",
          })
        );

        dispatch(loaderActions.set({ active: false }));
        history.push(shoppingListAPI.URL);
      }
    },
    [dispatch, history]
  );

  const handleClick = async (status: string) => {
    try {
      const response = await shoppingListAPI.update(_id, { status });
      setShoppingList(response.data.shoppingList);
    } catch (error) {
      console.log(error);
      // TODO: Show alert
    }
  };

  const handleCallback = () => {
    setIsEditMode(false);
    getShoppingList(params.id);
  };

  const escFunction = React.useCallback(
    (e: any) => {
      if (e.keyCode === 27) {
        if (isEditMode) {
          setIsEditMode(false);
        } else {
          history.push(shoppingListAPI.URL);
        }
      }
    },
    [history, isEditMode]
  );

  React.useEffect(() => {
    getShoppingList(params.id);
  }, [getShoppingList, params.id]);

  React.useEffect(() => {
    document.addEventListener("keydown", escFunction);

    return () => {
      document.removeEventListener("keydown", escFunction);
    };
  }, [escFunction]);

  return (
    <Container className="ShoppingListDetails">
      <Row className="justify-content-md-center mb-4">
        <Col xs md="3" className="d-flex justify-content-md-center">
          <Button as={Link} to={shoppingListAPI.URL} variant="outline-info">
            <FontAwesomeIcon icon={faBackspace} /> ESC
          </Button>
        </Col>
      </Row>
      <Row className="justify-content-md-center">
        <Col xs md="4">
          {isEditMode ? (
            <FormShoppingList id={_id} value={name} callback={handleCallback} />
          ) : (
            <h4 className="title" onClick={() => setIsEditMode(true)}>
              {name}
              <FontAwesomeIcon icon={faEdit} className="icon text-warning" />
            </h4>
          )}
          <Status onClick={handleClick} status={status} />
          <ProductContainer
            products={products}
            upadateProductList={handleUpdateProductList}
            shoppingListStatus={status}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default ShoppingListDetails;
