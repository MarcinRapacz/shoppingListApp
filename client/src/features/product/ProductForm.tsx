import React from "react";
import { useDispatch } from "react-redux";
import { Form, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers";
import * as yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import * as ProductAPI from "../../api/product";
import * as LoaderActions from "../loader/loaderSlice";
import * as AlertActions from "../alert/alertSlice";
import { IProduct } from "./IProduct";

interface Params {
  id: string;
}

interface Props {
  value?: string;
  addProduct: (product: IProduct) => void;
}

const schema: yup.ObjectSchema<ProductAPI.Request> = yup
  .object()
  .shape({
    name: yup
      .string()
      .required("To pole jest wymagane")
      .min(2, "Nazwa powinna miec przynajmniej 2 znaki"),
  })
  .defined();

const ProductForm: React.FC<Props> = (props: Props) => {
  const params = useParams<Params>();
  const dispatch = useDispatch();
  const { register, handleSubmit, errors, reset } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: ProductAPI.Request) => {
    try {
      dispatch(LoaderActions.set({ active: true }));
      data.shoppingListId = params.id;
      const response = await ProductAPI.create(data);
      dispatch(
        AlertActions.show({ message: response.data.message, status: "success" })
      );
      props.addProduct(response.data.product);
      reset();
    } catch (error) {
      dispatch(
        AlertActions.show({
          message: error.response.data.message,
          status: "danger",
        })
      );
    } finally {
      dispatch(LoaderActions.set({ active: false }));
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group controlId="formBasicName" className="input-group">
        <Form.Control
          type="input"
          placeholder="Podaj nazwę produktu"
          name="name"
          defaultValue={props.value}
          isInvalid={!!errors.name}
          ref={register()}
          autoFocus={true}
        />
        <div className="input-group-append">
          <Button variant="primary" className="btn-block" type="submit">
            <FontAwesomeIcon icon={faPaperPlane} />
          </Button>
        </div>

        <Form.Control.Feedback type="invalid">
          {errors.name?.message}
        </Form.Control.Feedback>
      </Form.Group>
    </Form>
  );
};

export default ProductForm;
