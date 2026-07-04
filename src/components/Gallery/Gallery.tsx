"use client";
import { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";
import Image from "next/image";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import styles from "./Gallery.module.css";

export default function Gallery({
  images,
}: {
  images: { original: string }[];
}) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const mainSwiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className={styles.wrapper}>
      <Swiper
        modules={[Navigation, Thumbs]}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        thumbs={{ swiper: thumbsSwiper }}
        navigation
        loop={false}
        onSwiper={(swiper) => (mainSwiperRef.current = swiper)}
        className={styles.mainSwiper}
      >
        {images.map((item, index) => (
          <SwiperSlide key={index}>
            <div className={styles.mainImageContainer}>
              <Image
                src={item.original}
                alt="Camper"
                fill
                style={{ objectFit: "cover" }}
                unoptimized
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <Swiper
        onSwiper={setThumbsSwiper}
        modules={[Thumbs]}
        spaceBetween={16}
        slidesPerView={4}
        watchSlidesProgress={true}
        className={styles.thumbsSwiper}
      >
        {images.map((item, index) => (
          <SwiperSlide
            key={index}
            className={`${styles.thumbSlide} ${index === activeIndex ? styles.activeThumb : ""}`}
            onClick={() => mainSwiperRef.current?.slideTo(index)}
          >
            <div className={styles.thumbnailContainer}>
              <Image
                src={item.original}
                alt="Thumb"
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
