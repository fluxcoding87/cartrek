/* eslint-disable react/prop-types */
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function ImageGallery({ imagesList }) {
  return (
    <div className="w-[95%]">
      {imagesList ? (
        <Carousel>
          <CarouselPrevious />
          <CarouselContent>
            {imagesList?.map((image, idx) => (
              <CarouselItem key={idx}>
                <img
                  src={image.imageUrl}
                  alt=""
                  className="w-full h-[500px] object-cover rounded-xl"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselNext />
        </Carousel>
      ) : (
        <div className="h-full w-full bg-slate-300 animate-pulse"></div>
      )}
    </div>
  );
}
