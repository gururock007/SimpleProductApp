import {
  Image,
  Input,
  Button,
  Form,
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import ToastComponet from "../components/Toast.Componet";
import CardComponet from "../components/Card.Componet";
import useProductStore from "../hooks/store";


const EditProductPage = () => {
  const [modalProduct, SetModelProduct] = useState(null);
  const [ name, setName ] = useState("");
  const [ price, setPrice ] = useState("");
  const [ imgUrl, setImgUrl ] = useState("");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { fetchProducts, updateProducts, products } = useProductStore();

  const handleOpenModal = (product) => {
    SetModelProduct(product);
    setName(product.name);
    setPrice(product.price);
    setImgUrl(product.url);
    onOpen();
  };

  const handleSubmit = async () => {
    try {
      const newProduct = { ...modalProduct, name :name, price : price, url: imgUrl }
      const response = await updateProducts(newProduct);
      if( response.success == true ){
        setName("");
        setPrice("");
        setImgUrl("");
      }
    } catch (error) {
      alert(error.message);

    }
  }

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <div className=" container mx-auto max-w-5xl mt-24">
      {products.length > 0 ? (
        <div className=" grid grid-cols-4 gap-4">
          {products.map((item) => (
            <div onClick={() => handleOpenModal(item)} key={item._id}>
              <CardComponet item={item} />
            </div>
          ))}
        </div>
      ) : (
        <ToastComponet
          visibility={true}
          success={false}
          alertMessage={"No data Found"}
        />
      )}
      <Modal
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {" "}
                Modal Title
              </ModalHeader>
              <ModalBody>
                <Image
                  className="object-cover"
                  height={200}
                  src={modalProduct.url}
                  width={200}
                />
                <Form className="w-full">
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
                  </div>
                </Form>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="warning"
                  variant="light"
                  onPress={() => {
                    handleSubmit();
                    onClose();
                  }}
                >
                  Update Product
                </Button>
                <Button color="primary" onPress={onClose}>
                  close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default EditProductPage;
