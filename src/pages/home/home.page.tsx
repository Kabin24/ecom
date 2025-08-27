import React from "react";
import {
  Carousel,
  Card,
  Button,
  Row,
  Col,
  Space,
  Dropdown,
  MenuProps,
  Input,
} from "antd";
import {
  SearchOutlined,
  UserOutlined,
  ShoppingCartOutlined,
  HeartOutlined,
} from "@ant-design/icons";
import { AiOutlineAmazon } from "react-icons/ai";
import { Link } from "react-router";

const { Meta } = Card;

const HomePage: React.FC = () => {
  const categories = [
    {
      id: 1,
      name: "Electronics",
      image:
        "https://img.drz.lazcdn.com/static/np/p/39e254d1521887742f7ecf5f8627ee5f.jpg_200x200q90.avif",
    },
    {
      id: 2,
      name: "Fashion",
      image: "https://via.placeholder.com/80x80?text=Fashion",
    },
    {
      id: 3,
      name: "Home & Living",
      image: "https://via.placeholder.com/80x80?text=Home",
    },
    {
      id: 4,
      name: "Beauty",
      image: "https://via.placeholder.com/80x80?text=Beauty",
    },
    {
      id: 5,
      name: "Mobiles",
      image: "https://via.placeholder.com/80x80?text=Mobiles",
    },
    {
      id: 6,
      name: "Appliances",
      image: "https://via.placeholder.com/80x80?text=Appliances",
    },
  ];

  // Sample data for products on sale
  const saleProducts = [
    {
      id: 1,
      name: "Wireless Headphones",
      price: "$59.99",
      discount: "30% OFF",
      image: "https://via.placeholder.com/200x200?text=Headphones",
    },
    {
      id: 2,
      name: "Smart Watch",
      price: "$129.99",
      discount: "25% OFF",
      image: "https://via.placeholder.com/200x200?text=Smart+Watch",
    },
    {
      id: 3,
      name: "Bluetooth Speaker",
      price: "$45.99",
      discount: "15% OFF",
      image: "https://via.placeholder.com/200x200?text=Speaker",
    },
    {
      id: 4,
      name: "Power Bank",
      price: "$29.99",
      discount: "20% OFF",
      image: "https://via.placeholder.com/200x200?text=Power+Bank",
    },
  ];

  // Banner images
  const bannerImages = [
    "https://img.lazcdn.com/us/domino/98d6ce56-25f6-415b-a6a5-994fe6ac1da1_NP-1976-688.jpg_2200x2200q80.jpg_.webp",
    "https://img.lazcdn.com/us/domino/50b532d0-18b6-4d25-a6a4-9d97fb0b0e89_NP-1976-688.jpg_2200x2200q80.jpg_.webp",
    "https://img.lazcdn.com/us/domino/a7791b4e-9324-49c7-ae0a-f80ccd68a5e6_NP-1976-688.png_2200x2200q80.png_.webp",
  ];

  const items: MenuProps["items"] = [
    { key: "1", label: "Electronics" },
    { key: "2", label: "Fashion" },
    { key: "3", label: "Home & Living" },
    { key: "4", label: "Beauty" },
    { key: "5", label: "Mobiles" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <nav className="bg-teal-800 text-white p-7">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-xl font-bold font-serif">Online Bazar</div>
          <div className="flex-1 max-w-xl mx-4">
            <Input
              size="large"
              placeholder="Search for products..."
              prefix={<SearchOutlined />}
              className="rounded-full"
            />
          </div>
          <Space size="small">
            <Dropdown menu={{ items }} placement="bottomRight">
              <Button type="text" className="text-white!  ">
                Categories
              </Button>
            </Dropdown>
            <Button
              type="text"
              icon={<UserOutlined />}
              className="text-white! "
            >
              <Link to="/login">Login</Link>
            </Button>
            <Button type="text" className="text-white! ">
              <Link to="/register">Sign Up</Link>
            </Button>
            <Button
              type="text"
              icon={<ShoppingCartOutlined />}
              className="text-white! "
            >
              Cart
            </Button>
          </Space>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        {/* Banner Carousel */}
        <div className="mb-8">
          <Carousel
            autoplay
            effect="fade"
            className="rounded-lg overflow-hidden"
          >
            {bannerImages.map((img, index) => (
              <div key={index}>
                <img
                  src={img}
                  alt={`Banner ${index + 1}`}
                  className="w-full h-64 md:h-96 object-cover"
                />
              </div>
            ))}
          </Carousel>
        </div>

        {/* Categories Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            Shop by Categories
          </h2>
          <Row gutter={[16, 16]}>
            {categories.map((category) => (
              <Col xs={12} sm={8} md={6} lg={4} xl={4} key={category.id}>
                <Card
                  hoverable
                  cover={
                    <img
                      alt={category.name}
                      src={category.image}
                      className="h-40 object-cover"
                    />
                  }
                  className="text-center shadow-sm hover:shadow-md transition-shadow"
                >
                  <Meta title={category.name} className="font-medium" />
                </Card>
              </Col>
            ))}
          </Row>
        </div>

        {/* Flash Sale Section */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Flash Sale</h2>
            <Button type="primary" danger>
              View All
            </Button>
          </div>
          <Row gutter={[16, 16]}>
            {saleProducts.map((product) => (
              <Col xs={12} sm={8} md={6} lg={6} xl={6} key={product.id}>
                <Card
                  hoverable
                  cover={
                    <img
                      alt={product.name}
                      src={product.image}
                      className="h-48 object-contain p-4"
                    />
                  }
                  actions={[
                    <Button
                      type="primary"
                      block
                      icon={<ShoppingCartOutlined />}
                    >
                      Add to Cart
                    </Button>,
                  ]}
                  className="shadow-sm hover:shadow-md transition-shadow"
                >
                  <Meta
                    title={product.name}
                    description={
                      <div>
                        <div className="text-red-500 font-bold">
                          {product.price}
                        </div>
                        <div className="text-green-600">{product.discount}</div>
                      </div>
                    }
                  />
                </Card>
              </Col>
            ))}
          </Row>
        </div>

        {/* Featured Products */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Featured Products
            </h2>
            <Button type="primary">View All</Button>
          </div>
          <Row gutter={[16, 16]}>
            {saleProducts.map((product) => (
              <Col xs={12} sm={8} md={6} lg={6} xl={6} key={product.id}>
                <Card
                  hoverable
                  cover={
                    <img
                      alt={product.name}
                      src={product.image}
                      className="h-48 object-contain p-4"
                    />
                  }
                  actions={[
                    <HeartOutlined key="wishlist" />,
                    <Button type="link" icon={<ShoppingCartOutlined />}>
                      Add to Cart
                    </Button>,
                  ]}
                  className="shadow-sm hover:shadow-md transition-shadow"
                >
                  <Meta
                    title={product.name}
                    description={
                      <div>
                        <div className="text-red-500 font-bold">
                          {product.price}
                        </div>
                        <div className="text-green-600">{product.discount}</div>
                      </div>
                    }
                  />
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <Row gutter={[24, 24]}>
            <Col xs={24} sm={12} md={6}>
              <h3 className="text-lg font-bold mb-4">Customer Service</h3>
              <ul className="space-y-2">
                <li>Help Center</li>
                <li>How to Buy</li>
                <li>Returns & Refunds</li>
                <li>Contact Us</li>
              </ul>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <h3 className="text-lg font-bold mb-4">About Us</h3>
              <ul className="space-y-2">
                <li>About ShopEase</li>
                <li>Terms & Conditions</li>
                <li>Privacy Policy</li>
                <li>Careers</li>
              </ul>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <h3 className="text-lg font-bold mb-4">Payment Methods</h3>
              <div className="flex flex-wrap gap-2">
                <div className="bg-white p-2 rounded">Visa</div>
                <div className="bg-white p-2 rounded">MasterCard</div>
                <div className="bg-white p-2 rounded">PayPal</div>
              </div>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <h3 className="text-lg font-bold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <div className="p-2  size-4">
                  <AiOutlineAmazon className="size-5"></AiOutlineAmazon>
                </div>
                <div className="bg-pink-600 p-2 rounded-full"></div>
                <div className="bg-blue-400 p-2 rounded-full">TW</div>
              </div>
            </Col>
          </Row>
          <div className="mt-8 pt-4 border-t border-gray-700 text-center">
            © 2023 ShopEase. All Rights Reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
