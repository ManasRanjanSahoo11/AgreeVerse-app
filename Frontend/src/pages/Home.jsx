import React from 'react'
import Navbar from '../components/Navbar'
import Carousel from '../components/Carousel'
import Card from '../components/Card'
import ProductCard from '../components/ProductCard'
import Footer from '../components/Footer'
import AllProducts from '../components/AllProducts'

function Home() {

  return (
    <div className='w-full bg-[#181a20]'>
      <Navbar />
      <main className='mx-auto w-[97vw]'>
        <Carousel />

        <div className='flex justify-between items-center px-16'>
          <Card bgColor = {"bg-orange-400"}  title ={"Vegitables"} description={"i am manas"} cropImage={"http://static.vecteezy.com/system/resources/previews/000/303/561/non_2x/various-vegetables-in-a-basket-vector.jpg"} />
          <Card bgColor = {"bg-orange-400"}  title ={"Vegitables"} description={"i am manas"} cropImage={"http://static.vecteezy.com/system/resources/previews/000/303/561/non_2x/various-vegetables-in-a-basket-vector.jpg"} />
          <Card bgColor = {"bg-orange-400"}  title ={"Vegitables"} description={"i am manas"} cropImage={"http://static.vecteezy.com/system/resources/previews/000/303/561/non_2x/various-vegetables-in-a-basket-vector.jpg"} />
        </div>

        <div className='text-white py-10'>
          <h2 className='text-3xl my-3'>Elevate Yourself</h2>

          <div className="py-3 px-0.5 flex items-center justify-between flex-wrap">
            <ProductCard
              imageUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Tomato_je.jpg/1024px-Tomato_je.jpg"
              productName="Tomoto"
              category="fresh!"
              price= "599"
            />
          </div>
        </div>


        <div>
          <AllProducts />
        </div>
      </main>
      <Footer/>
    </div>
  )
}

export default Home
