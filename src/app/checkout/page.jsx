"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import * as z from "zod";
import toast from "react-hot-toast";

// Dynamic Map Import (IMPORTANT)
const CheckoutMap = dynamic(
  () => import("../../components/CheckOutMap"),
  { ssr: false }
);

// ---------------- VALIDATION ----------------
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
    console.log("Order Data:", { ...data, coordinates: position });
    toast.success("Order placed successfully!");
  };




  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-black py-16 px-4 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">

        {/* STEP INDICATOR */}
        <div className="flex items-center justify-center mb-14 text-gray-700 dark:text-gray-300">
          <div className="flex items-center gap-6">
            <Step number={1} label="Shipping" active={currentStep === 1} />
            <div className="w-16 h-[2px] bg-gray-300 dark:bg-gray-700"></div>
            <Step number={2} label="Payment" active={currentStep === 2} />
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="grid lg:grid-cols-12 gap-12">

          {/* LEFT SIDE */}
          <div className="lg:col-span-7 space-y-10">

            {currentStep === 1 && (
              <>
                <Card title="Contact Information">
                  <div className="grid md:grid-cols-2 gap-6">
                    <InputField register={register} name="email" placeholder="Email Address" error={errors.email} />
                    <InputField register={register} name="phone" placeholder="Phone Number" error={errors.phone} />
                  </div>
                </Card>

                <Card title="Shipping Address">

                  <div className="h-80 z-0 relative rounded-2xl overflow-hidden shadow-md border border-gray-200 dark:border-gray-700">
                    <CheckoutMap
                      position={position}
                      setPosition={setPosition}
                      fetchAddress={fetchAddress}
                    />
                  </div>

                  <textarea
                    {...register("address")}
                    value={addressValue}
                    onChange={(e) =>
                      setValue("address", e.target.value, { shouldValidate: true })
                    }
                    placeholder="Street address, apartment, etc."
                    className={inputStyle}
                  />
                  {addressLoading && (
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Fetching address...
                    </p>
                  )}
                  {errors.address && <ErrorText message={errors.address.message} />}

                  <div className="grid md:grid-cols-2 gap-6">
                    <InputField register={register} name="firstName" placeholder="First Name" error={errors.firstName} />
                    <InputField register={register} name="lastName" placeholder="Last Name" error={errors.lastName} />
                  </div>

                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="w-full bg-black dark:bg-white text-white dark:text-black py-4 rounded-full font-semibold hover:scale-[1.02] active:scale-95 transition"
                  >
                    Continue to Payment
                  </button>
                </Card>
              </>
            )}

            {currentStep === 2 && (
              <Card title="Payment Method">

                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition"
                >
                  ← Back to Shipping
                </button>

                <label className="flex items-center justify-between p-6 border-2 border-gray-200 dark:border-gray-700 rounded-2xl cursor-pointer hover:border-black dark:hover:border-white transition text-black dark:text-white">
                  <div className="flex items-center gap-3">
                    <input type="radio" {...register("paymentMethod")} value="cod" />
                    <span>Cash on Delivery</span>
                  </div>
                </label>

              </Card>
            )}

          </div>

          {/* RIGHT SUMMARY */}
          <div className="lg:col-span-5">
            <div className="bg-white dark:bg-gray-900 p-10 rounded-3xl shadow-2xl dark:shadow-black/50 border border-gray-100 dark:border-gray-800 sticky top-20 space-y-6">

              <h2 className="text-2xl font-bold border-b border-gray-200 dark:border-gray-700 pb-4 text-black dark:text-white">
                Order Summary
              </h2>

              <SummaryRow label="Subtotal" value={subtotal} />
              <SummaryRow label="Discount" value={`-৳${discount}`} red />
              <SummaryRow label="Delivery" value={delivery} />

              <div className="flex justify-between text-3xl font-bold border-t border-gray-200 dark:border-gray-700 pt-6 text-black dark:text-white">
                <span>Total</span>
                <span>৳{total}</span>
              </div>

              {currentStep === 2 && (
                <button type="submit"
                  className="w-full bg-black dark:bg-white text-white dark:text-black py-5 rounded-full font-semibold hover:scale-[1.02] active:scale-95 transition"
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

/* ---------------- REUSABLE COMPONENTS ---------------- */

const inputStyle = `
w-full px-5 py-4 rounded-xl 
border border-gray-300 dark:border-gray-700 
bg-white dark:bg-gray-800 
text-black dark:text-white 
placeholder-gray-400 dark:placeholder-gray-500 
focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white
transition-all duration-300
`;

function Card({ title, children }) {
  return (
    <div className="bg-white dark:bg-gray-900 p-10 rounded-3xl shadow-xl dark:shadow-black/40 border border-gray-100 dark:border-gray-800 space-y-6 transition">
      <h2 className="text-2xl font-bold text-black dark:text-white">
        {title}
      </h2>
      {children}
    </div>
  );
}

function InputField({ register, name, placeholder, error }) {
  return (
    <div>
      <input {...register(name)} placeholder={placeholder} className={inputStyle} />
      {error && <ErrorText message={error.message} />}
    </div>
  );
}

function ErrorText({ message }) {
  return <p className="text-red-500 dark:text-red-400 text-sm mt-2">{message}</p>;
}

function Step({ number, label, active }) {
  return (
    <div className={`flex items-center gap-3 ${active ? "opacity-100" : "opacity-40"}`}>
      <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold 
      ${active 
        ? "bg-black text-white dark:bg-white dark:text-black" 
        : "border-2 border-black dark:border-white text-black dark:text-white"}`}>
        {number}
      </div>
      <span className="font-semibold">{label}</span>
    </div>
  );
}

function SummaryRow({ label, value, red }) {
  return (
    <div className={`flex justify-between text-gray-600 dark:text-gray-400 ${red ? "text-red-500 dark:text-red-400" : ""}`}>
      <span>{label}</span>
      <span className="font-semibold text-black dark:text-white">
        {red ? value : `৳${value}`}
      </span>
    </div>
  );
}
