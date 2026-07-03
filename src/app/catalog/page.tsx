"use client";
import { Suspense } from "react";
import CatalogContent from "@/components/CatalogContent/CatalogContent";
import Loader from "@/components/Loader/Loader";

export default function CatalogPage() {
  return (
    <Suspense fallback={<Loader />}>
      <CatalogContent />
    </Suspense>
  );
}