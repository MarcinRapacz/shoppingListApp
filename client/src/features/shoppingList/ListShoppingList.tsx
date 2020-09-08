import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faShoppingBasket } from "@fortawesome/free-solid-svg-icons";
import "./ShoppingList.scss";

// Actions
import * as loaderActions from "../loader/loaderSlice";

// Api
import * as ShoppingListAPI from "../../api/shoppingList";

// Components
import FormShoppingList from "./FormShoppingList";
import Status from "../../components/Status/Status";

// Interfaces
import { IShoppingList } from "./IShoppingList";
import Logout from "../auth/Logout";

const ListShoppingList: React.FC = () => {
  const dispatch = useDispatch();
  const [list, setList] = React.useState([] as IShoppingList[]);

  React.useEffect(() => {
    const getAllShopingList = async () => {
      try {
        dispatch(loaderActions.set({ active: true }));
        const response = await ShoppingListAPI.list();
        setList(response.data.list);
      } catch (error) {
        // TODO: Show alert
        console.log(error);
      } finally {
        dispatch(loaderActions.set({ active: false }));
      }
    };

    getAllShopingList();
  }, [dispatch]);

  return (
    <Container className="ListShoppingList my-5">
      <Row className="justify-content-md-center">
        <Col xs md="4">
          <h6>Twoje listy</h6>
          {list.map((item) => (
            <Card
              as={Link}
              to={`/shoppingList/${item._id}`}
              key={item._id}
              className="px-2 py-3 my-1"
              border="primary"
            >
              <p className="name m-0">{item.name}</p>
              <div className="info">
                <Status status={item.status} />
                <p className="members my-0 mx-3">
                  <FontAwesomeIcon icon={faShoppingBasket} />
                  <span className="text mx-1">{item.products.length}</span>
                </p>
                <p className="members my-0 mr-2">
                  <FontAwesomeIcon icon={faUser} />
                  <span className="text mx-1">{item.members.length}</span>
                </p>
              </div>
            </Card>
          ))}
        </Col>
      </Row>
      <Row className="justify-content-md-center mt-3">
        <Col xs md="4">
          <FormShoppingList title="Dodaj nową liste" />
        </Col>
      </Row>
      <Row className="justify-content-md-center mt-3">
        <Col xs md="4">
          <Logout />
        </Col>
      </Row>
    </Container>
  );
};

export default ListShoppingList;
