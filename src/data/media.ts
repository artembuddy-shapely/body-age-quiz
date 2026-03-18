// Media registry — swap any path to update images site-wide.
// Place files in /public/media/ and update the paths below.

export const MEDIA = {
  // Before/after body silhouettes on payment screen
  bodyBefore: "/media/body-before.png",
  bodyAfter: "/media/body-after.png",

  // Featured testimonial (Results that make us proud)
  testimonialFeatured: "/media/testimonials/marta.jpg",

  // Carousel testimonials
  testimonials: {
    janine: "/media/testimonials/janine.jpg",
    angela: "/media/testimonials/angela.jpg",
    karu: "/media/testimonials/karu.jpg",
  },

  // Payment logos
  paymentVisa: "/media/payment/visa.svg",
  paymentMastercard: "/media/payment/mastercard.svg",
  paymentPaypal: "/media/payment/paypal.svg",
  paymentStripe: "/media/payment/stripe.svg",
} as const;
