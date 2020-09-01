import React from "react";
import { Form, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers";
import * as yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import * as ShoppingListAPI from "../../api/shoppingList";

interface Props {
  id?: string;
  title?: string;
  value?: string;
  callback?: () => void;
}

const schema: yup.ObjectSchema<ShoppingListAPI.Request> = yup
  .object()
  .shape({
    name: yup
      .string()
      .required("To pole jest wymagane")
      .min(2, "Nazwa powinna miec przynajmniej 2 znaki"),
  })
  .defined();

const FormShoppingList: React.FC<Props> = (props: Props) => {
  const history = useHistory();
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: ShoppingListAPI.Request) => {
    try {
      if (props.id) {
        await ShoppingListAPI.update(props.id, data);
        props.callback?.();
      } else {
        const response = await ShoppingListAPI.create(data);
        history.push(
          `${ShoppingListAPI.URL}/${response.data.shoppingList._id}`
        );
      }
    } catch (error) {
      console.log(error);
      // TODO: Show alert
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <h6>{props.title}</h6>
      <Form.Group controlId="formBasicName" className="input-group">
        <Form.Control
          type="input"
          placeholder="Podaj nazwę"
          name="name"
          defaultValue={props.value}
          isInvalid={!!errors.name}
          ref={register()}
          autoFocus={!!props.id}
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

export default FormShoppingList;
