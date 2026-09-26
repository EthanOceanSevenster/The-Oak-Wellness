import Image from "next/image";
import motherDaughter from "@/assets/photos/mother-daughter.jpg";
import youthGroup from "@/assets/photos/youth-group.jpg";

const photos = [
  {
    src: motherDaughter,
    alt: "A mother and daughter smiling together over a school book",
  },
  {
    src: youthGroup,
    alt: "A woman talking with a group of young people in a lounge",
  },
];

export function ServicePhotos() {
  return (
    <div className="mx-auto grid max-w-6xl gap-6 px-5 pt-16 sm:px-8 md:grid-cols-2 md:pt-20">
      {photos.map((photo) => (
        <Image
          key={photo.alt}
          src={photo.src}
          alt={photo.alt}
          placeholder="blur"
          sizes="(min-width: 768px) 560px, 100vw"
          className="aspect-[16/9] w-full rounded-3xl object-cover shadow-lg shadow-indigo/10"
        />
      ))}
    </div>
  );
}
