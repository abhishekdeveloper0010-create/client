import kurta from "../assets/ShopProducts/kurta.png";
import saree from "../assets/ShopProducts/saree.png";
import tasrika from "../assets/ShopProducts/tasrika.png";
import campus from "../assets/ShopProducts/campus.png";
import hoodie from "../assets/BestSeller/hoodie.png";
import bag from "../assets/ShopLook/bag.png";
import shoes from "../assets/ShopLook/shoes.png";
import men from "../assets/BestSeller/men.png";

const products = [
  {
    id: 1,
    title: "Cotton Kurta",
    image: kurta,
    images: [kurta, saree, tasrika, campus],
    price: 499,
    oldPrice: 999,
    offer: "40% OFF",
    description: "Premium Cotton Kurta for Women",
  },
  {
    id: 2,
    title: "Sarees",
    image: saree,
    images: [saree, kurta, tasrika, campus],
    price: 999,
    oldPrice: 1499,
    offer: "35% OFF",
    description: "Beautiful Saree Collection",
  },
  {
    id: 3,
    title: "Tasrika",
    image: tasrika,
    images: [tasrika, kurta, saree, campus],
    price: 799,
    oldPrice: 1299,
    offer: "50% OFF",
    description: "Latest Tasrika Collection",
  },
  {
    id: 4,
    title: "Shirt",
    image: campus,
    images: [campus, kurta, saree, tasrika],
    price: 699,
    oldPrice: 1199,
    offer: "70% OFF",
    description: "Men's Long Sleeve Cotton Shirt",
  },
  {
    id: 5,
    title: "Denim Hoodie",
    image: hoodie,
    images: [hoodie, campus, bag, shoes],
    price: 899,
    oldPrice: 1499,
    offer: "40% OFF",
    description: "Cozy denim hoodie for everyday wear",
  },
  {
    id: 6,
    title: "Leather Bag",
    image: bag,
    images: [bag, shoes, hoodie, men],
    price: 1299,
    oldPrice: 1999,
    offer: "35% OFF",
    description: "Premium leather bag for travel and work",
  },
  {
    id: 7,
    title: "Running Shoes",
    image: shoes,
    images: [shoes, bag, hoodie, men],
    price: 749,
    oldPrice: 1199,
    offer: "30% OFF",
    description: "Lightweight running shoes for daily training",
  },
  {
    id: 8,
    title: "Formal Shirt",
    image: men,
    images: [men, shoes, hoodie, bag],
    price: 829,
    oldPrice: 1399,
    offer: "40% OFF",
    description: "Sharp formal shirt for office and events",
  },
];

export default products;
