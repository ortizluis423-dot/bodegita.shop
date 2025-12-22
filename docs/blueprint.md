# **App Name**: Bodega Express

## Core Features:

- Product Display: Display products with image, name, short description, USD price, and dynamically calculated Bs. price.
- Add to Cart: Add products to a shopping cart with quantity adjustments.
- Shopping Cart: Display cart items, quantities, prices (USD and Bs.), and total price with options to increase/decrease quantity or remove items.  Also features an option to clear cart.
- Exchange Rate Management: Admin interface for setting the USD to Bs. exchange rate, with real-time updates across the application via React Context.
- Admin Authentication: Secure admin routes (/admin) using Firebase Authentication, redirecting unauthenticated users to /login.
- Inventory Management: Admin panel to view the inventory of products.
- Image Verification Page: Simple page at /images to display placeholder images used in the application for easy verification.

## Style Guidelines:

- Primary color: Deep burgundy (#800020), evocative of rich wine, providing a luxurious and sophisticated feel, without being literal. This color will contrast well with the light background.
- Background color: Light, desaturated rose (#F8E8E8). Offers a soft, complementary backdrop to the deep burgundy, enhancing readability.
- Accent color: Muted lavender (#B69FC7), adding a touch of elegance and distinction, drawing the eye to interactive elements and call-to-actions.
- Headline font: 'Playfair', a modern sans-serif with an elegant and high-end feel, is ideal for headlines.
- Body font: 'PT Sans', a humanist sans-serif, ensuring readability and complementing the Playfair headline font; pairs well with Playfair.
- Simple and elegant line icons from the library Lucide to represent product categories and actions, maintaining a clean and modern aesthetic.
- Clean, grid-based layout using Tailwind CSS to present products clearly and accessibly.
- Subtle transitions and hover effects using react-transition-group to enhance user interaction without being distracting.