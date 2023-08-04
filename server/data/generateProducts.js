const fs = require('fs');
const Chance = require('chance');
const chance = new Chance();

const dataCategories = [
    {
        id: 1,
        name: "Snacks",
        categoryName: "Snacks",
        image: "https://example.com/snacks.jpg"
    },
    {
        id: 2,
        name: "Beverages",
        categoryName: "Beverages",
        image: "https://example.com/beverages.jpg"
    },
    {
        id: 3,
        name: "Instant Noodles",
        categoryName: "Instant Noodles",
        image: "https://example.com/snack-foods.jpg"
    },
    {
        id: 4,
        name: "Household Appliances",
        categoryName: "Household Appliances",
        image: "https://example.com/household-appliances.jpg"
    },
    // {
    //     id: 5,
    //     name: "Desserts",
    //     categoryName: "Desserts",
    //     image: "https://example.com/desserts.jpg"
    // },
    // {
    //     id: 6,
    //     name: "Personal Care",
    //     categoryName: "Personal Care",
    //     image: "https://example.com/personal-care.jpg"
    // },
];

const descriptionAdjectives = [
    "Delicious",
    "Refreshing",
    "Tasty",
    "Exquisite",
    "Delectable",
    "Handpicked",
    "Ultimate",
    "Satisfying",
    "Unique",
    "Exquisite",
    "Symphony of Flavors",
    "Culinary Gem",
    "Carefully Curated",
    "Gourmet",
    "Premium",
    "Mouthwatering",
    "Irresistible",
    "Scrumptious",
    "Divine",
    "Flavorful"
];

const descriptionTemplates = [
    "${adjective} ${name} - A must-have for any ${categoryName} lover. Savor the flavor today!",
    "Indulge in the ${adjective} taste of ${name} from the ${categoryName} section. Limited stock available!",
    "Introducing ${adjective} ${name}, the ultimate delicacy in the world of ${categoryName}. Order now and experience the delight!",
    "${adjective} ${name} - Your go-to snack for any occasion. Discover the joy of ${categoryName} like never before.",
    "Experience pure bliss with ${adjective} ${name}, handpicked from the finest ${categoryName} collection.",
    "Treat yourself with ${adjective} ${name}, the finest offering in our ${categoryName} range. Satisfaction guaranteed!",
    "${adjective} ${name} - A delightful blend of flavors from the world of ${categoryName}. Don't miss out on this unique experience.",
    "${adjective} ${name}, a delightful surprise for fans of ${categoryName}. Order now and elevate your snacking game!",
    "Celebrate every moment with ${adjective} ${name} from the ${categoryName} category. Exquisite taste awaits you!",
    "Discover the magic of ${adjective} ${name} - a true masterpiece from the ${categoryName} selection.",
    "Enhance your day with ${adjective} ${name}, the perfect companion for every ${categoryName} enthusiast.",
    "Unleash your taste buds with ${adjective} ${name}, a culinary gem crafted for ${categoryName} aficionados.",
    "Satisfy your cravings with ${adjective} ${name}, a delectable treat carefully curated from the ${categoryName} range.",
    "${adjective} ${name} - A symphony of flavors that will transport you to the heart of ${categoryName}.",
    "Elevate your snacking experience with ${adjective} ${name}, an exquisite offering from the world of ${categoryName}.",
    "${adjective} ${name} - Perfect for any ${categoryName} enthusiast. Elevate your snacking game now!",
    "Indulge in the ${adjective} taste of ${name}, a delightful ${categoryName} that will satisfy your cravings.",
    "Discover the unique flavors of ${name}, a must-try ${categoryName} that promises an exceptional taste.",
    "Treat yourself to the ${adjective} goodness of ${name}, an exquisite offering from the ${categoryName} collection.",
    "Unwind with the delightful taste of ${name}, a perfect companion for your ${categoryName} moments.",
    "Experience the symphony of flavors with ${name}, a ${categoryName} that will leave you craving for more.",
    "Don't miss out on the ${adjective} taste of ${name}, an extraordinary ${categoryName} that delivers satisfaction.",
    "Celebrate life with the irresistible charm of ${name}, a ${categoryName} that promises a divine experience.",
    "Savor the goodness of ${name}, a ${categoryName} that will captivate your taste buds.",
    "Elevate your snacking experience with the unique flavors of ${name}, a delightful ${categoryName} for connoisseurs."
];


const products = [];
for (let i = 1; i <= 100; i++) {
    const randomCategory = chance.pickone(dataCategories);
    const productName = chance.pickone(dataCategories.filter(category => category.id !== randomCategory.id));
    const adjective = chance.pickone(descriptionAdjectives);
    const descriptionTemplate = chance.pickone(descriptionTemplates);

    const description = descriptionTemplate
        .replace("${adjective}", adjective)
        .replace("${name}", productName.name)
        .replace("${categoryName}", randomCategory.categoryName);

    const product = {
        id: i,
        categoryId: randomCategory.id,
        categoryName: randomCategory.categoryName,
        sku: generateSKU(),
        name: productName.name,
        description: description,
        weight: generateWeight(randomCategory.categoryName),
        width: generateDimension(),
        length: generateDimension(),
        height: generateDimension(),
        image: randomCategory.image,
        price: calculatePrice(productName.name, randomCategory.categoryName)
    };
    products.push(product);
}

fs.writeFile('products.json', JSON.stringify(products, null, 2), (err) => {
    if (err) throw err;
    console.log('Product data generated and saved to products.json');
});

function generateSKU() {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let sku = "MH";
    for (let i = 0; i < 4; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        sku += chars[randomIndex];
    }
    return sku;
}

function generateWeight(categoryName) {
    let minWeight, maxWeight;
    if (categoryName === "Snacks") {
        minWeight = 50;
        maxWeight = 150;
    } else if (categoryName === "Beverages") {
        minWeight = 200;
        maxWeight = 500;
    } else if (categoryName === "Instant Noodles") {
        minWeight = 100;
        maxWeight = 200;
    } else {
        minWeight = 100;
        maxWeight = 300;
    }
    return chance.integer({ min: minWeight, max: maxWeight });
}

function generateDimension() {
    return chance.floating({ min: 1, max: 10, fixed: 2 });
}

function calculatePrice(name, categoryName) {
    const pricePerCharacter = 100;
    const pricePerCategory = {
        "Snacks": 30000,
        "Beverages": 25000,
        "Instant Noodles": 20000,
        "Household Appliances": 50000
    };
    const namePrice = name.length * pricePerCharacter;
    const categoryPrice = pricePerCategory[categoryName];
    return namePrice + categoryPrice;
}
