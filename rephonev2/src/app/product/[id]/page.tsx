import { notFound } from "next/navigation";
import ProductDetailClient from "@/components/ProductDetailClient";
import { product_data } from "@/lib/data";
// Mock product data - in a real app, this would come from a database
// const products= [
//   {
//     id: "1",
//     name: "iPhone 13 Pro",
//     brand: "Apple",
//     price: 699,
//     originalPrice: 999,
//     rating: 4.8,
//     reviews: 124,
//     images: [
//       "/images/phone/i14promax.jpg",
//       "/images/phone/i14promax1.jpg",
//       "/images/phone/i14promax2.jpg",
//       "/images/phone/i14promax3.jpg",
//       "/images/phone/i14promax4.jpg",
//     ],
//     condition: "Excellent",
//     storage: "128GB",
//     color: "Graphite",
//     category: "iPhone",
//     description:
//       "The iPhone 13 Pro delivers exceptional performance with the A15 Bionic chip, ProRAW photography capabilities, and a stunning Super Retina XDR display with ProMotion technology.",
//     specifications: {
//       display: {
//         size: "6.1 inches",
//         type: "Super Retina XDR OLED",
//         resolution: "2532 x 1170 pixels",
//         features: ["ProMotion 120Hz", "HDR10", "Dolby Vision"],
//       },
//       performance: {
//         processor: "A15 Bionic chip",
//         ram: "6GB",
//         storage: "128GB",
//         os: "iOS 15 (upgradable)",
//       },
//       camera: {
//         rear: "Triple 12MP (Main, Ultra Wide, Telephoto)",
//         front: "12MP TrueDepth",
//         features: ["ProRAW", "ProRes video", "Cinematic mode", "Night mode"],
//       },
//       battery: {
//         capacity: "3095 mAh",
//         charging: "20W wired, 15W MagSafe wireless",
//         life: "Up to 22 hours video playback",
//       },
//       connectivity: {
//         network: "5G, 4G LTE",
//         wifi: "Wi-Fi 6",
//         bluetooth: "Bluetooth 5.0",
//         other: ["Lightning port", "Face ID", "MagSafe"],
//       },
//       physical: {
//         dimensions: "146.7 x 71.5 x 7.65 mm",
//         weight: "203g",
//         materials: "Stainless steel frame, Ceramic Shield front",
//         colors: ["Graphite", "Gold", "Silver", "Sierra Blue", "Alpine Green"],
//       },
//     },
//     warranty: "12 months",
//     inStock: true,
//     stockCount: 15,
//     features: [
//       "ProMotion 120Hz display",
//       "A15 Bionic chip",
//       "Pro camera system",
//       "5G connectivity",
//       "Face ID",
//       "MagSafe compatible",
//     ],
//   },
//   {
//     id: "2",
//     name: "Galaxy S22 Ultra",
//     brand: "Samsung",
//     price: 599,
//     originalPrice: 899,
//     rating: 4.7,
//     reviews: 89,
//     images: [
//       "/placeholder.svg?height=600&width=600",
//       "/placeholder.svg?height=600&width=600",
//       "/placeholder.svg?height=600&width=600",
//       "/placeholder.svg?height=600&width=600",
//     ],
//     condition: "Very Good",
//     storage: "256GB",
//     color: "Phantom Black",
//     category: "Samsung",
//     description:
//       "The Galaxy S22 Ultra combines the best of Galaxy Note and Galaxy S series, featuring the built-in S Pen, advanced camera system, and powerful performance.",
//     specifications: {
//       display: {
//         size: "6.8 inches",
//         type: "Dynamic AMOLED 2X",
//         resolution: "3088 x 1440 pixels",
//         features: ["120Hz adaptive refresh rate", "HDR10+", "Always-on display"],
//       },
//       performance: {
//         processor: "Snapdragon 8 Gen 1",
//         ram: "8GB",
//         storage: "256GB",
//         os: "Android 12 (One UI 4.1)",
//       },
//       camera: {
//         rear: "Quad camera: 108MP main, 12MP ultra-wide, 10MP telephoto (3x), 10MP periscope (10x)",
//         front: "40MP",
//         features: ["100x Space Zoom", "8K video recording", "Night mode", "Pro mode"],
//       },
//       battery: {
//         capacity: "5000 mAh",
//         charging: "45W wired, 15W wireless, 4.5W reverse wireless",
//         life: "Up to 26 hours video playback",
//       },
//       connectivity: {
//         network: "5G, 4G LTE",
//         wifi: "Wi-Fi 6E",
//         bluetooth: "Bluetooth 5.2",
//         other: ["USB-C", "Fingerprint (ultrasonic)", "S Pen"],
//       },
//       physical: {
//         dimensions: "163.3 x 77.9 x 8.9 mm",
//         weight: "228g",
//         materials: "Aluminum frame, Gorilla Glass Victus+",
//         colors: ["Phantom Black", "Phantom White", "Burgundy", "Green"],
//       },
//     },
//     warranty: "12 months",
//     inStock: true,
//     stockCount: 8,
//     features: ["Built-in S Pen", "108MP camera", "100x Space Zoom", "5000mAh battery", "120Hz display", "5G ready"],
//   },
// ]
const products = product_data;

interface ProductPageProps {
  params: {
    id: string;
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = products.find((p) => p.id === params.id);

  if (!product) {
    notFound();
  }

  return <ProductDetailClient product={product} />;
}

export function generateStaticParams() {
  return products.map((product) => ({
    id: product.id,
  }));
}
