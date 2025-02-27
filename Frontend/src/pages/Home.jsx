import React from 'react'
import Navbar from '../components/Navbar'
import Carousel from '../components/Carousel'
import ProductCard from '../components/ProductCard'
import Footer from '../components/Footer'

function Home() {
  return (
    <div className='w-full bg-[#181a20]'>
      <Navbar />
      <main className='mx-auto w-[97vw]'>
        <Carousel />

        <div className='text-white py-10'>
          <h2 className='text-3xl my-3'>Elevate Yourself</h2>

          <div className="py-3 px-0.5 flex items-center justify-between flex-wrap">
            <ProductCard
              imageUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Tomato_je.jpg/1024px-Tomato_je.jpg"
              productName="Tomoto"
              category="fresh!"
              price= "599"
            />
            <ProductCard
              imageUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Tomato_je.jpg/1024px-Tomato_je.jpg"
              productName="Tomoto"
              category="fresh!"
              price= "599"
            />
            <ProductCard
              imageUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Tomato_je.jpg/1024px-Tomato_je.jpg"
              productName="Tomoto"
              category="fresh!"
              price= "599"
            />
            <ProductCard
              imageUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Tomato_je.jpg/1024px-Tomato_je.jpg"
              productName="Tomoto"
              category="fresh!"
              price= "599"
            />
          </div>
        </div>
      </main>
      <Footer/>
    </div>
  )
}

export default Home
