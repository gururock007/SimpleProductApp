/* eslint-disable react/prop-types */
import { Card, Image, CardFooter, Button  } from "@nextui-org/react";

const CardComponet = ({item}) => {
  return (
    <Card isFooterBlurred className="border-none" radius="lg">
      <Image
        alt="Woman listing to music"
        className="object-cover"
        height={200}
        src={item.url}
        width={200}
      />
      <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
        <p className="text-tiny text-white/80">{item.name}</p>
        <Button
          className="text-tiny text-white bg-black/20"
          color="default"
          radius="lg"
          size="sm"
          variant="flat"
        >
          {item.price}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CardComponet;
