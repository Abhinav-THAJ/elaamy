"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  UploadCloud,
  ChevronRight,
  ChevronLeft,
  X,
  CheckCircle2,
  AlertCircle,
  Image as ImageIcon,
  Send,
  Loader2,
} from "lucide-react";
import Image from "next/image";

// WhatsApp formatting configuration
const BUSINESS_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919876543210"; // Placeholder, can be changed via env

// ---- Schemas ----
const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

const formSchema = z.object({
  brideName: z.string().min(1, "Bride Name is required"),
  groomName: z.string().min(1, "Groom Name is required"),
  contactPerson: z.string().min(1, "Contact Person is required"),
  mobileNumber: z.string().min(10, "Valid mobile number is required"),
  whatsappNumber: z.string().optional(),
  email: z.string().email("Invalid email address"),
  
  weddingDate: z.string().optional(),
  weddingTime: z.string().optional(),
  venue: z.string().optional(),
  receptionDate: z.string().optional(),
  receptionVenue: z.string().optional(),

  cardStyle: z.string().optional(),
  theme: z.string().optional(),
  colorPalette: z.string().optional(),
  language: z.string().optional(),
  cardOrientation: z.string().optional(),
  cardSize: z.string().optional(),

  additionalRequirements: z.string().optional(),
  
  referenceImage: z.any().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const STEPS = [
  { id: "customer", title: "Your Details" },
  { id: "wedding", title: "Wedding Details" },
  { id: "preferences", title: "Card Preferences" },
];

export default function CustomizeCardPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<{ type: "success" | "error"; message: string } | null>(null);
  
  // Image handling
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    trigger,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: "onTouched",
  });

  const watchImage = watch("referenceImage");

  // Clean up object URL
  useEffect(() => {
    return () => {
      if (previewUrl && previewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleNext = async () => {
    let fieldsToValidate: (keyof FormValues)[] = [];
    if (currentStep === 0) {
      fieldsToValidate = ["brideName", "groomName", "contactPerson", "mobileNumber", "email"];
    } else if (currentStep === 1) {
      fieldsToValidate = ["weddingDate", "weddingTime", "venue", "receptionDate", "receptionVenue"];
    }

    const isStepValid = await trigger(fieldsToValidate);
    if (isStepValid) {
      setCurrentStep((prev) => Math.min(prev + 1, STEPS.length - 1));
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Drag and Drop
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
      setToast({ type: "error", message: "Only JPG, JPEG, and PNG formats are allowed." });
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      setToast({ type: "error", message: "File size must be less than 10MB." });
      return;
    }
    
    setValue("referenceImage", file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const removeImage = () => {
    setValue("referenceImage", undefined);
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const showToast = (type: "success" | "error", message: string, duration = 5000) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), duration);
  };

  // Upload states for better UX feedback
  const [uploadState, setUploadState] = useState<"idle" | "uploading" | "done" | "error">("idle");

  const onSubmit = async (data: FormValues) => {
    // Guard: only allow submission from the final step (step 3)
    if (currentStep !== STEPS.length - 1) return;

    setIsSubmitting(true);
    setUploadProgress(0);
    setUploadState("idle");
    
    try {
      let uploadedImageUrl = "";
      
      // Step 1: Upload image first, block until we have the URL
      if (data.referenceImage) {
        setUploadState("uploading");
        setUploadProgress(20);
        showToast("success", "Uploading your image to our server...", 30000);

        const formData = new FormData();
        formData.append("file", data.referenceImage);
        
        const uploadRes = await fetch("/api/upload-media", {
          method: "POST",
          body: formData,
        });
        
        setUploadProgress(80);
        const uploadData = await uploadRes.json();
        
        if (!uploadRes.ok) {
          setUploadState("error");
          // Show the helpful hint from the server if available
          throw new Error(
            uploadData.hint
              ? `Upload failed: ${uploadData.error}\n\n${uploadData.hint}`
              : uploadData.error || "Failed to upload image. Please try again."
          );
        }
        
        uploadedImageUrl = uploadData.url;
        setUploadProgress(100);
        setUploadState("done");
      }

      // Step 2: Only build & open WhatsApp AFTER upload is confirmed complete
      setToast(null); // Clear the uploading toast
      
      // Build the WhatsApp message
      // The image URL is sent as a plain URL — WhatsApp will render it as a clickable
      // link. The recipient (you) can open it to view the full image.
      const imageSection = uploadedImageUrl
        ? `\n*📎 Reference Image (tap to view):*\n${uploadedImageUrl}`
        : "";

      const message = [
        `✨ *New Wedding Card Customization Request* ✨`,
        ``,
        `*👰 Customer Details*`,
        `Bride Name: ${data.brideName}`,
        `Groom Name: ${data.groomName}`,
        `Contact Person: ${data.contactPerson}`,
        `Mobile Number: ${data.mobileNumber}`,
        `WhatsApp Number: ${data.whatsappNumber || "-"}`,
        `Email: ${data.email}`,
        ``,
        `*💍 Wedding Details*`,
        `Wedding Date: ${data.weddingDate || "-"}`,
        `Wedding Time: ${data.weddingTime || "-"}`,
        `Venue: ${data.venue || "-"}`,
        ``,
        `*🎊 Reception Details*`,
        `Reception Date: ${data.receptionDate || "-"}`,
        `Reception Venue: ${data.receptionVenue || "-"}`,
        ``,
        `*🎨 Card Preferences*`,
        `Card Style: ${data.cardStyle || "-"}`,
        `Theme: ${data.theme || "-"}`,
        `Color Palette: ${data.colorPalette || "-"}`,
        `Language: ${data.language || "-"}`,
        `Card Orientation: ${data.cardOrientation || "-"}`,
        `Card Size: ${data.cardSize || "-"}`,
        ``,
        `*📝 Additional Requirements*`,
        `${data.additionalRequirements || "-"}`,
        imageSection,
      ].join("\n");

      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/${BUSINESS_NUMBER}?text=${encodedMessage}`;
      
      showToast("success", uploadedImageUrl ? "Image uploaded! Opening WhatsApp..." : "Opening WhatsApp...");
      
      // Wait a beat so the user sees the success state, then redirect
      setTimeout(() => {
        window.open(whatsappUrl, "_blank");
        setIsSubmitting(false);
        setUploadProgress(0);
        setUploadState("idle");
      }, 1200);

    } catch (error: any) {
      console.error(error);
      setToast(null);
      showToast("error", error.message || "Something went wrong. Please try again.");
      setIsSubmitting(false);
      setUploadProgress(0);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-slate-800 font-sans selection:bg-[#F2D7D5] selection:text-slate-900 pb-20">
      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className={`fixed top-5 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-6 py-4 rounded-2xl shadow-xl backdrop-blur-md border ${
              toast.type === "success" 
                ? "bg-green-50/90 border-green-200 text-green-800" 
                : "bg-red-50/90 border-red-200 text-red-800"
            }`}
          >
            {toast.type === "success" ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
            <span className="font-medium text-sm">{toast.message}</span>
            <button onClick={() => setToast(null)} className="ml-2 hover:opacity-70 transition-opacity">
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <div className="relative w-full h-[40vh] min-h-[350px] flex items-center justify-center overflow-hidden">
        {/* Soft pastel background gradients */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#FFF5F3] via-[#FDFBF7] to-[#F8F0E5] -z-10" />
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 opacity-40">
          <div className="absolute -top-20 -right-20 w-96 h-96 bg-[#F2D7D5] rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob" />
          <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-[#E8E1D9] rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000" />
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center px-4 max-w-3xl z-10"
        >
          <span className="uppercase tracking-widest text-xs font-semibold text-[#C4A484] mb-4 block">Bespoke Design</span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#4A4036] mb-6 leading-tight">
            Customize Your <br/><span className="italic font-light text-[#D4AF37]">Wedding Card</span>
          </h1>
          <p className="text-slate-600 md:text-lg max-w-xl mx-auto font-light">
            Upload your inspiration and tell us your requirements. We'll create a unique, luxurious wedding invitation just for you.
          </p>
        </motion.div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        <div className="bg-white/70 backdrop-blur-xl border border-white/40 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] rounded-[2rem] p-6 sm:p-10 md:p-12">
          
          {/* Stepper */}
          <div className="flex justify-between items-center mb-12 relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[2px] bg-slate-100 -z-10" />
            <div 
              className="absolute left-0 top-1/2 -translate-y-1/2 h-[2px] bg-gradient-to-r from-[#D4AF37] to-[#F2D7D5] -z-10 transition-all duration-500 ease-in-out" 
              style={{ width: `${(currentStep / (STEPS.length - 1)) * 100}%` }}
            />
            {STEPS.map((step, idx) => (
              <div key={step.id} className="flex flex-col items-center gap-2">
                <div 
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 shadow-sm ${
                    currentStep >= idx 
                      ? "bg-white border-2 border-[#D4AF37] text-[#4A4036]" 
                      : "bg-slate-50 border border-slate-200 text-slate-400"
                  }`}
                >
                  {currentStep > idx ? <CheckCircle2 className="w-5 h-5 text-[#D4AF37]" /> : idx + 1}
                </div>
                <span className={`text-xs font-medium hidden sm:block absolute mt-12 ${currentStep >= idx ? "text-[#4A4036]" : "text-slate-400"}`}>
                  {step.title}
                </span>
              </div>
            ))}
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            onKeyDown={(e) => {
              // Prevent Enter key from submitting the form on steps 1 and 2
              if (e.key === "Enter" && currentStep !== STEPS.length - 1) {
                e.preventDefault();
                handleNext();
              }
            }}
            className="space-y-8 sm:mt-16"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                {/* Step 1: Customer Details */}
                {currentStep === 0 && (
                  <div className="space-y-8">
                    <div className="text-center mb-8">
                      <h2 className="text-2xl font-serif text-[#4A4036]">Customer Information</h2>
                      <div className="flex items-center justify-center gap-4 mt-4">
                        <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#D4AF37]" />
                        <span className="text-[#D4AF37]">✦</span>
                        <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#D4AF37]" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FloatingInput label="Bride Name *" error={errors.brideName?.message} {...register("brideName")} />
                      <FloatingInput label="Groom Name *" error={errors.groomName?.message} {...register("groomName")} />
                      <FloatingInput label="Contact Person *" error={errors.contactPerson?.message} {...register("contactPerson")} />
                      <FloatingInput label="Email Address *" type="email" error={errors.email?.message} {...register("email")} />
                      <FloatingInput label="Mobile Number *" type="tel" error={errors.mobileNumber?.message} {...register("mobileNumber")} />
                      <FloatingInput label="WhatsApp Number" type="tel" error={errors.whatsappNumber?.message} {...register("whatsappNumber")} />
                    </div>
                  </div>
                )}

                {/* Step 2: Wedding Details */}
                {currentStep === 1 && (
                  <div className="space-y-8">
                    <div className="text-center mb-8">
                      <h2 className="text-2xl font-serif text-[#4A4036]">Wedding Details</h2>
                      <div className="flex items-center justify-center gap-4 mt-4">
                        <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#D4AF37]" />
                        <span className="text-[#D4AF37]">✦</span>
                        <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#D4AF37]" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FloatingInput label="Wedding Date" type="date" error={errors.weddingDate?.message} {...register("weddingDate")} />
                      <FloatingInput label="Wedding Time" type="time" error={errors.weddingTime?.message} {...register("weddingTime")} />
                      <div className="md:col-span-2">
                        <FloatingInput label="Wedding Venue" error={errors.venue?.message} {...register("venue")} />
                      </div>
                    </div>

                    <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-slate-200 to-transparent my-8" />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FloatingInput label="Reception Date" type="date" error={errors.receptionDate?.message} {...register("receptionDate")} />
                      <div className="md:col-span-2">
                        <FloatingInput label="Reception Venue" error={errors.receptionVenue?.message} {...register("receptionVenue")} />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: Preferences & Upload */}
                {currentStep === 2 && (
                  <div className="space-y-10">
                    <div className="text-center mb-8">
                      <h2 className="text-2xl font-serif text-[#4A4036]">Card Preferences</h2>
                      <div className="flex items-center justify-center gap-4 mt-4">
                        <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#D4AF37]" />
                        <span className="text-[#D4AF37]">✦</span>
                        <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#D4AF37]" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <SelectInput label="Card Style" options={["Traditional", "Modern", "Minimalist", "Floral", "Royal", "Rustic", "Vintage"]} {...register("cardStyle")} />
                      <SelectInput label="Theme" options={["Elegant", "Boho", "Classic", "Luxurious", "Whimsical"]} {...register("theme")} />
                      <FloatingInput label="Color Palette (e.g. Ivory & Gold)" {...register("colorPalette")} />
                      <FloatingInput label="Language" {...register("language")} />
                      <SelectInput label="Card Orientation" options={["Portrait", "Landscape", "Square"]} {...register("cardOrientation")} />
                      <FloatingInput label="Card Size (e.g. 5x7 inches)" {...register("cardSize")} />
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-sm font-semibold text-[#4A4036] uppercase tracking-wider">Additional Requirements</h3>
                      <div className="relative group">
                        <textarea
                          {...register("additionalRequirements")}
                          placeholder="Tell us exactly how you want your wedding card..."
                          className="w-full min-h-[120px] p-5 rounded-xl border border-slate-200 bg-white/50 backdrop-blur-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/30 focus:border-[#D4AF37] resize-none text-slate-700 placeholder:text-slate-400"
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-sm font-semibold text-[#4A4036] uppercase tracking-wider">Upload Reference Image</h3>
                      
                      <div 
                        className={`relative w-full rounded-2xl border-2 border-dashed transition-all duration-300 overflow-hidden ${
                          dragActive ? "border-[#D4AF37] bg-[#D4AF37]/5" : "border-slate-200 bg-white/50 hover:border-[#D4AF37]/50"
                        }`}
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                      >
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept={ACCEPTED_IMAGE_TYPES.join(",")}
                          onChange={handleChange}
                          className="hidden"
                          id="file-upload"
                        />
                        
                        {!previewUrl ? (
                          <label htmlFor="file-upload" className="flex flex-col items-center justify-center w-full h-48 cursor-pointer p-6 text-center">
                            <div className="w-14 h-14 bg-slate-50 rounded-full flex items-center justify-center mb-4 text-slate-400 group-hover:text-[#D4AF37] transition-colors">
                              <UploadCloud className="w-7 h-7" />
                            </div>
                            <p className="text-slate-600 font-medium mb-1">Drag & Drop your inspiration here</p>
                            <p className="text-xs text-slate-400 mb-4">JPG, JPEG, PNG up to 10MB</p>
                            <span className="px-5 py-2 rounded-full bg-slate-100 text-slate-600 text-sm font-medium hover:bg-slate-200 transition-colors">
                              Browse Files
                            </span>
                          </label>
                        ) : (
                          <div className="relative w-full p-4 flex flex-col sm:flex-row items-center gap-6">
                            <div className="relative w-full sm:w-40 h-40 rounded-xl overflow-hidden shadow-sm border border-slate-100 group">
                              <img src={previewUrl} alt="Reference Preview" className="w-full h-full object-cover" />
                              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <ImageIcon className="text-white w-8 h-8" />
                              </div>
                            </div>
                            <div className="flex-1 text-center sm:text-left">
                              <p className="text-sm font-medium text-slate-700 truncate max-w-[200px] mb-1">
                                {watchImage?.name}
                              </p>
                              <p className="text-xs text-slate-400 mb-4">
                                {(watchImage?.size / (1024 * 1024)).toFixed(2)} MB
                              </p>
                              <div className="flex items-center justify-center sm:justify-start gap-3">
                                <label htmlFor="file-upload" className="px-4 py-2 rounded-full border border-slate-200 text-slate-600 text-sm font-medium hover:bg-slate-50 transition-colors cursor-pointer">
                                  Replace
                                </label>
                                <button type="button" onClick={removeImage} className="px-4 py-2 rounded-full border border-red-100 text-red-600 bg-red-50 text-sm font-medium hover:bg-red-100 transition-colors">
                                  Remove
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between pt-8 border-t border-slate-100 mt-10">
              <button
                type="button"
                onClick={handlePrev}
                className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all ${
                  currentStep === 0 
                    ? "opacity-0 pointer-events-none" 
                    : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
                }`}
              >
                <ChevronLeft className="w-4 h-4" /> Back
              </button>
              
              {currentStep < STEPS.length - 1 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="flex items-center gap-2 px-8 py-3 rounded-full bg-[#4A4036] text-white text-sm font-medium hover:bg-[#352D26] hover:shadow-lg hover:shadow-[#4A4036]/20 transition-all active:scale-95"
                >
                  Continue <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="relative overflow-hidden group flex items-center gap-3 px-8 py-3 rounded-full bg-gradient-to-r from-[#C4A484] to-[#D4AF37] text-white text-sm font-medium shadow-lg shadow-[#D4AF37]/25 hover:shadow-xl hover:shadow-[#D4AF37]/40 transition-all active:scale-95 disabled:opacity-80 disabled:pointer-events-none min-w-[200px] justify-center"
                >
                  <div className="absolute inset-0 w-full h-full bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
                  {uploadState === "uploading" ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Uploading Image... {uploadProgress > 0 ? `${uploadProgress}%` : ""}
                    </>
                  ) : uploadState === "done" || (isSubmitting && uploadProgress === 100) ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Opening WhatsApp...
                    </>
                  ) : (
                    <>
                      Send on WhatsApp <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              )}
            </div>
          </form>

        </div>
      </div>
    </div>
  );
}

// ---- Subcomponents ----

const FloatingInput = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement> & { label: string; error?: string }>(
  ({ label, error, type = "text", ...props }, ref) => {
    return (
      <div className="relative group">
        <input
          ref={ref}
          type={type}
          placeholder=" "
          className={`block w-full px-5 pb-3 pt-6 rounded-xl border bg-white/50 backdrop-blur-sm text-slate-800 transition-all duration-300 focus:outline-none focus:ring-2 appearance-none peer ${
            error 
              ? "border-red-300 focus:border-red-400 focus:ring-red-200" 
              : "border-slate-200 focus:border-[#D4AF37] focus:ring-[#D4AF37]/30 hover:border-slate-300"
          }`}
          {...props}
        />
        <label
          className={`absolute text-sm duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 ${
            error ? "text-red-500" : "text-slate-400 peer-focus:text-[#C4A484]"
          }`}
        >
          {label}
        </label>
        {error && (
          <span className="absolute -bottom-5 left-2 text-[10px] font-medium text-red-500">{error}</span>
        )}
      </div>
    );
  }
);
FloatingInput.displayName = "FloatingInput";

const SelectInput = React.forwardRef<HTMLSelectElement, React.SelectHTMLAttributes<HTMLSelectElement> & { label: string; options: string[]; error?: string }>(
  ({ label, options, error, ...props }, ref) => {
    return (
      <div className="relative group">
        <select
          ref={ref}
          className={`block w-full px-5 pb-3 pt-6 rounded-xl border bg-white/50 backdrop-blur-sm text-slate-800 transition-all duration-300 focus:outline-none focus:ring-2 appearance-none peer ${
            error 
              ? "border-red-300 focus:border-red-400 focus:ring-red-200" 
              : "border-slate-200 focus:border-[#D4AF37] focus:ring-[#D4AF37]/30 hover:border-slate-300"
          }`}
          {...props}
        >
          <option value="" disabled hidden></option>
          {options.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
        </div>
        <label
          className={`absolute text-sm duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-5 ${
            error ? "text-red-500" : "text-[#C4A484]"
          }`}
        >
          {label}
        </label>
        {error && (
          <span className="absolute -bottom-5 left-2 text-[10px] font-medium text-red-500">{error}</span>
        )}
      </div>
    );
  }
);
SelectInput.displayName = "SelectInput";
