import React from 'react'
import Navbar from '../components/Navbar'
import Carousel from '../components/Carousel'
import Card from '../components/Card'
import ProductCard from '../components/ProductCard'
import Footer from '../components/Footer'
import { useContext } from 'react'
import { ProductContext } from '../useContext/productContext'

function Home() {
  const [products] = useContext(ProductContext)
  console.log(products);

  return (
    <div className='w-full bg-[#181a20]'>
      <Navbar />
      <main className='mx-auto w-[97vw]'>
        <Carousel />

        <div className='flex justify-between items-center px-16'>
          <Card bgColor={"bg-orange-400"} title={"Vegitables"} description={"i am manas"} cropImage={"http://static.vecteezy.com/system/resources/previews/000/303/561/non_2x/various-vegetables-in-a-basket-vector.jpg"} />
          <Card bgColor={"bg-orange-400"} title={"Vegitables"} description={"i am manas"} cropImage={"http://static.vecteezy.com/system/resources/previews/000/303/561/non_2x/various-vegetables-in-a-basket-vector.jpg"} />
          <Card bgColor={"bg-orange-400"} title={"Vegitables"} description={"i am manas"} cropImage={"http://static.vecteezy.com/system/resources/previews/000/303/561/non_2x/various-vegetables-in-a-basket-vector.jpg"} />
        </div>

        <div>
          <h2>All Our Products </h2>

          <div>
            <button className='px-10 py-1.5 bg-green-400 capitalize font-semibold text-white mr-3 rounded-full hover:bg-green-500 cursor-pointer transition'>All</button>
            <button className='px-10 py-1.5 bg-green-400 capitalize font-semibold text-white mr-3 rounded-full hover:bg-green-500 cursor-pointer transition'>vegetable </button>
            <button className='px-10 py-1.5 bg-green-400 capitalize font-semibold text-white mr-3 rounded-full hover:bg-green-500 cursor-pointer transition'>fruit</button>
            <button className='px-10 py-1.5 bg-green-400 capitalize font-semibold text-white mr-3 rounded-full hover:bg-green-500 cursor-pointer transition'>grain</button>
          </div>

          <div className='flex items-center justify-between py-5 flex-wrap'>
            {
              products.map((item, index)=>(
                <ProductCard product={item} key={index}/>
              ))
            }
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default Home
