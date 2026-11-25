const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const products = [
  { name: "Laptop Asus Vivobook 14", sku: "ELK-001", category: "Elektronik", price: 7500000, stock: 10 },
  { name: "Mouse Wireless Logitech", sku: "ELK-002", category: "Elektronik", price: 150000, stock: 50 },
  { name: "Keyboard Mekanik", sku: "ELK-003", category: "Elektronik", price: 450000, stock: 25 },
  { name: "Kemeja Flanel Pria", sku: "FSH-001", category: "Fashion", price: 175000, stock: 30 },
  { name: "Sepatu Sneakers", sku: "FSH-002", category: "Fashion", price: 320000, stock: 15 },
  { name: "Tas Ransel Kanvas", sku: "FSH-003", category: "Fashion", price: 210000, stock: 20 },
  { name: "Kopi Arabika 250g", sku: "MKN-001", category: "Makanan", price: 65000, stock: 40 },
  { name: "Teh Hijau Premium", sku: "MKN-002", category: "Makanan", price: 45000, stock: 60 },
  { name: "Buku Pemrograman Web", sku: "BKU-001", category: "Buku", price: 95000, stock: 12 },
  { name: "Buku Basis Data", sku: "BKU-002", category: "Buku", price: 110000, stock: 8 },
];

async function main() {
  for (const p of products) {
    await prisma.product.upsert({
      where: { sku: p.sku },
      update: {},
      create: p,
    });
  }
  console.log(`Seed selesai: ${products.length} produk diproses.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });