export const predictVehiclePrice = async (formData) => {
  // Simulate API request

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        estimatedPrice: "1,850,000 EGP",
        minPrice: "1,720,000 EGP",
        maxPrice: "1,980,000 EGP",
        confidence: "98%",
      });
    }, 2000);
  });
};
