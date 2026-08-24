# How to Add Your Profile Image

## Step 1: Save the Image

You sent me a black and white profile photo. To add it to your portfolio:

1. **Right-click** on the image in your browser
2. Select **"Save image as..."**
3. Navigate to this location:
   ```
   c:\Users\Lenovo\Desktop\Portfolio\portfolio\public\images\
   ```
4. Save it as **`profile.jpg`** (exactly this name)

## Step 2: Update the Component

Once the image is saved, update the About.tsx component to display it:

Replace the placeholder code in `components/sections/About.tsx` with:

```tsx
{/* Image container */}
<div className="relative rounded-2xl overflow-hidden border-4 border-accent/30">
  <div className="aspect-square relative">
    <img
      src="/images/profile.jpg"
      alt="Nushant Ghimire"
      className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
    />
  </div>
</div>
```

## Step 3: Refresh Browser

After saving the image file, refresh your browser at http://localhost:3000 to see your photo!

## Current Status

For now, I've added a placeholder with your initial "N" so the website looks complete while you add the actual image.

## Alternative: Use Next.js Image Component

If you want better image optimization, you can also use:

```tsx
import Image from "next/image";

// Then in the component:
<Image
  src="/images/profile.jpg"
  alt="Nushant Ghimire"
  width={800}
  height={800}
  className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
  priority
/>
```

This provides automatic image optimization, lazy loading, and better performance.
