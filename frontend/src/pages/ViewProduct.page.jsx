import {
  Image,
  Button,
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

const ViewProductPage = () => {
  const [modalProduct, SetModelProduct] = useState(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { fetchProducts, deleteProducts, products } = useProductStore();

  const handleOpenModal = (product) =>{
    SetModelProduct(product)
    onOpen();
  }

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <div className=" container mx-auto max-w-5xl mt-24">
      {products.length > 0 ? (
        <div className=" grid grid-cols-4 gap-4">
          {products.map((item) => (
            <div onClick={() => handleOpenModal(item)}  key={item._id}>
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
                    <p>{modalProduct.name}</p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={() => {deleteProducts(modalProduct._id); onClose()}}>
                  Delete Product
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

export default ViewProductPage;
