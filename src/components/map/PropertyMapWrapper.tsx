"use client";

import dynamic from "next/dynamic";
import Skeleton from "@/components/ui/Skeleton";
import MapErrorBoundary from "./MapErrorBoundary";
import type { TravelioProperty } from "@/types";

/**
 * Client Component wrapper that dynamically imports LeafletMap with ssr:false.
 *
 * This is the correct Next.js 16 pattern for Leaflet integration:
 * Server Components never import Leaflet directly.
 * The dynamic import with ssr:false lives inside a Client Component,
 * so no `next/dynamic` call ever appears in a Server Component.
 */

const LeafletMap = dynamic(() => import("./LeafletMap"), {
  ssr: false,
  loading: () => <Skeleton variant="map" />,
});

interface PropertyMapWrapperProps {
  properties: TravelioProperty[];
  center?: [number, number];
  zoom?: number;
  height?: string;
  singleMode?: boolean;
  className?: string;
}

export default function PropertyMapWrapper(props: PropertyMapWrapperProps) {
  return (
    <MapErrorBoundary>
      <LeafletMap {...props} />
    </MapErrorBoundary>
  );
}
