import { Form, Input, Button } from "@nextui-org/react";
import { useEffect, useRef, useState } from "react";
import ToastComponet from "./Toast.Componet";
import useProductStore from "../hooks/store";

const FormsComponent = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [success, setSuccess] = useState("");
  const [alertMessage, setAlertMessage ] = useState("");
  const [visibility, setVisibility] = useState(false);
  const formRef = useRef(null);

  const { createProducts } = useProductStore();
  
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const newProduct = { name:name, price:price, url: imgUrl }
      const response = createProducts(newProduct);
      setAlertMessage(response.message);
      setSuccess(response.success);
      if( response.success == true ){
        setName("");
        setPrice("");
        setImgUrl("");
      }
    } catch (error) {
      setAlertMessage(error.message);
      setSuccess(false);
    }
    setVisibility(true);
  };

  useEffect(() => {
    setTimeout(() => {
      setVisibility(false);
    },3000);
  },[visibility]);

  return (
    <>
      <div className="bg-gray-200 bg-opacity-10 container mx-auto p-20 rounded-2xl w-1/2">
        <Form onSubmit={submitHandler} className="w-full" ref={formRef}>
          <div className="flex flex-col gap-4 w-full">
            <Input
              isRequired
              label="Name"
              labelPlacement="outside"
              name="name"
              placeholder="Enter Product Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              isRequired
              label="Price"
              labelPlacement="outside"
              name="price"
              placeholder="Enter Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <Input
              isRequired
              label="Image URL"
              labelPlacement="outside"
              name="imgUrl"
              placeholder="Enter Image URL"
              value={imgUrl}
              onChange={(e) => setImgUrl(e.target.value)}
            />
            <Button color="primary" variant="flat" type="submit">
              Submit
            </Button>
          </div>
        </Form>
      </div>
      <ToastComponet visibility = {visibility} alertMessage = {alertMessage} success = {success} />
    </>
  );
};

export default FormsComponent;
