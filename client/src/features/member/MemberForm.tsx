import React from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers";
import * as yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import * as AlertActions from "../alert/alertSlice";
import * as MemberAPI from "../../api/member";

interface Props {
  handleVisibility: (isVisible: boolean) => void;
}

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Podaj poprawny adres email")
    .required("To pole jest wymagane"),
});

const MemberForm: React.FC<Props> = (props: Props) => {
  const params = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const { register, handleSubmit, errors, reset } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: MemberAPI.Request) => {
    try {
      const response = await MemberAPI.toggle(params.id, data);
      props.handleVisibility(false);
      dispatch(
        AlertActions.show({ message: response.data.message, status: "success" })
      );
      reset();
    } catch (error) {
      dispatch(
        AlertActions.show({
          message: error.response.data.message,
          status: "danger",
        })
      );
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Form.Group controlId="formBasicName" className="input-group">
        <Form.Control
          type="email"
          placeholder="Podaj nazwę produktu"
          name="email"
          isInvalid={!!errors.email}
          ref={register()}
          autoFocus={true}
        />
        <div className="input-group-append">
          <Button variant="primary" className="btn-block" type="submit">
            <FontAwesomeIcon icon={faPaperPlane} />
          </Button>
        </div>

        <Form.Control.Feedback type="invalid">
          {errors.email?.message}
        </Form.Control.Feedback>
      </Form.Group>
    </Form>
  );
};

export default MemberForm;
