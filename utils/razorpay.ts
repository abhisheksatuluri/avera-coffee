// Loads the Razorpay Standard Checkout script on demand.
// Resolves true once window.Razorpay is available.

let loadingPromise: Promise<boolean> | null = null;

export function loadRazorpay(): Promise<boolean> {
  if ((window as any).Razorpay) return Promise.resolve(true);
  if (loadingPromise) return loadingPromise;

  loadingPromise = new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => {
      loadingPromise = null;
      resolve(false);
    };
    document.body.appendChild(script);
  });

  return loadingPromise;
}
