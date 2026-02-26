"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import * as z from "zod";
import { useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// Dynamic imports (NO hooks here)
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);

// ---------------- ZOD VALIDATION ----------------
const checkoutSchema = z.object({
  email: z.string().email("Enter valid email"),
  phone: z
    .string()
    .regex(/^(?:\+88|88)?(01[3-9]\d{8})$/, "Valid BD phone required"),
  firstName: z.string().min(2, "Min 2 characters"),
  lastName: z.string().min(2, "Min 2 characters"),
  address: z.string().min(10, "Enter full address"),
  paymentMethod: z.enum(["cod"]),
});

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const [currentStep, setCurrentStep] = useState(1);
  const [position, setPosition] = useState([23.8103, 90.4125]);
  const [addressLoading, setAddressLoading] = useState(false);

  const subtotal = searchParams.get("subtotal") || "0.00";
  const discount = searchParams.get("discount") || "0.00";
  const delivery = searchParams.get("delivery") || "0.00";
  const total = searchParams.get("total") || "0.00";

  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(checkoutSchema),
    defaultValues: { paymentMethod: "cod", address: "" },
  });

  const addressValue = watch("address");

  // Fix Leaflet icon issue
  useEffect(() => {
    if (typeof window !== "undefined") {
      const L = require("leaflet");
      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
        iconUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
        shadowUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
      });
    }
  }, []);

  // Reverse Geocode
  const fetchAddress = async (lat, lng) => {
    setAddressLoading(true);
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
      );
      const data = await res.json();
      setValue("address", data.display_name || "", {
        shouldValidate: true,
      });
    } catch (err) {
      console.error(err);
    } finally {
      setAddressLoading(false);
    }
  };

  // Map Click Handler
  function LocationMarker() {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setPosition([lat, lng]);
        fetchAddress(lat, lng);
      },
    });

    return <Marker position={position} />;
  }

  const handleNextStep = async () => {
    const isValid = await trigger([
      "email",
      "phone",
      "firstName",
      "lastName",
      "address",
    ]);
    if (isValid) setCurrentStep(2);
  };

  const onSubmit = (data) => {
    console.log("Order Data:", {
      ...data,
      coordinates: position,
    });
    alert("Order placed successfully!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-16 px-4">
      <div className="max-w-7xl mx-auto">

        {/* STEP INDICATOR */}
        <div className="flex items-center justify-center mb-14">
          <div className="flex items-center gap-6">
            <div className={`flex items-center gap-3 ${currentStep === 1 ? "opacity-100" : "opacity-40"}`}>
              <div className="w-12 h-12 rounded-full flex items-center justify-center bg-black text-white font-bold text-lg">
                1
              </div>
              <span className="font-semibold">Shipping</span>
            </div>

            <div className="w-16 h-[2px] bg-gray-300"></div>

            <div className={`flex items-center gap-3 ${currentStep === 2 ? "opacity-100" : "opacity-40"}`}>
              <div className="w-12 h-12 rounded-full flex items-center justify-center border-2 border-black font-bold text-lg">
                2
              </div>
              <span className="font-semibold">Payment</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="grid lg:grid-cols-12 gap-12">

          {/* LEFT SIDE */}
          <div className="lg:col-span-7 space-y-10">

            {currentStep === 1 && (
              <>
                <div className="bg-white p-10 rounded-3xl shadow-xl border border-gray-100 space-y-6">

                  <h2 className="text-2xl font-bold">Contact Information</h2>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <input {...register("email")} placeholder="Email Address" className="premium-input" />
                      {errors.email && <p className="error-text">{errors.email.message}</p>}
                    </div>

                    <div>
                      <input {...register("phone")} placeholder="Phone Number" className="premium-input" />
                      {errors.phone && <p className="error-text">{errors.phone.message}</p>}
                    </div>
                  </div>
                </div>

                <div className="bg-white p-10 rounded-3xl shadow-xl border border-gray-100 space-y-6">

                  <h2 className="text-2xl font-bold">Shipping Address</h2>

                  <div className="h-80 rounded-2xl overflow-hidden shadow-md">
                    <MapContainer
                      center={position}
                      zoom={13}
                      style={{ height: "100%", width: "100%" }}
                    >
                      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                      <LocationMarker />
                    </MapContainer>
                  </div>

                  <textarea
                    {...register("address")}
                    value={addressValue}
                    onChange={(e) =>
                      setValue("address", e.target.value, { shouldValidate: true })
                    }
                    placeholder="Street address, apartment, etc."
                    className="premium-input min-h-[120px]"
                  />
                  {addressLoading && <p className="text-sm text-gray-500">Fetching address...</p>}
                  {errors.address && <p className="error-text">{errors.address.message}</p>}

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <input {...register("firstName")} placeholder="First Name" className="premium-input" />
                      {errors.firstName && <p className="error-text">{errors.firstName.message}</p>}
                    </div>

                    <div>
                      <input {...register("lastName")} placeholder="Last Name" className="premium-input" />
                      {errors.lastName && <p className="error-text">{errors.lastName.message}</p>}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="w-full bg-black text-white py-4 rounded-full font-semibold hover:scale-[1.02] active:scale-95 transition-all"
                  >
                    Continue to Payment
                  </button>
                </div>
              </>
            )}

            {currentStep === 2 && (
              <div className="bg-white p-10 rounded-3xl shadow-xl border border-gray-100 space-y-6">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="text-gray-500 hover:text-black"
                >
                  ← Back to Shipping
                </button>

                <h2 className="text-2xl font-bold">Payment Method</h2>

                <label className="flex items-center justify-between p-6 border-2 rounded-2xl cursor-pointer hover:border-black transition-all">
                  <div className="flex items-center gap-3">
                    <input type="radio" {...register("paymentMethod")} value="cod" />
                    <span className="font-medium">Cash on Delivery</span>
                  </div>
                </label>
              </div>
            )}
          </div>

          {/* RIGHT SUMMARY */}
          <div className="lg:col-span-5">
            <div className="bg-white p-10 rounded-3xl shadow-2xl border border-gray-100 sticky top-20 space-y-6">

              <h2 className="text-2xl font-bold border-b pb-4">Order Summary</h2>

              <div className="space-y-4 text-gray-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-black">৳{subtotal}</span>
                </div>

                <div className="flex justify-between text-red-500">
                  <span>Discount</span>
                  <span>-৳{discount}</span>
                </div>

                <div className="flex justify-between">
                  <span>Delivery</span>
                  <span className="font-semibold text-black">৳{delivery}</span>
                </div>
              </div>

              <div className="flex justify-between text-3xl font-bold border-t pt-6">
                <span>Total</span>
                <span>৳{total}</span>
              </div>

              {currentStep === 2 && (
                <button
                  type="submit"
                  className="w-full bg-black text-white py-5 rounded-full font-semibold hover:scale-[1.02] active:scale-95 transition-all"
                >
                  Place Order
                </button>
              )}
            </div>
          </div>

        </form>
      </div>
    </div>
  );
}
