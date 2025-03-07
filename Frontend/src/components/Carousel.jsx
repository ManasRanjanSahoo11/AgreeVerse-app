import { useState, useEffect } from 'react';

const Carousel = () => {
  const [activeIndex, setActiveIndex] = useState(1);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  
  const slides = [
    {
      id: 0,
      image: "https://images.unsplash.com/photo-1560493676-04071c5f467b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "First slide"
    },
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Third slide"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1483871788521-4f224a86e166?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Fourth slide"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1554973653-c9071bd14011?q=80&w=2015&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Fifth slide"
    }
  ];

  const nextSlide = () => {
    setActiveIndex((prevIndex) => 
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setActiveIndex((prevIndex) => 
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  // Auto-play functionality
  useEffect(() => {
    let interval;
    
    if (isAutoPlaying) {
      interval = setInterval(() => {
        nextSlide();
      }, 3000);
    }
    
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isAutoPlaying, activeIndex]);

  return (
    <div id="controls-carousel" className="relative w-[93vw] mx-auto my-6" data-carousel="static">
      <div className="relative h-56 overflow-hidden rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl md:h-72">
        {slides.map((slide, index) => (
          <div 
            key={slide.id}
            className={`${activeIndex === index ? 'block' : 'hidden'} duration-700 ease-in-out`} 
            data-carousel-item={activeIndex === index ? 'active' : ''}
          >
            <img 
              src={slide.image} 
              className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" 
              alt={slide.alt} 
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;